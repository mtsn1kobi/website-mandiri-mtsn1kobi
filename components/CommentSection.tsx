import React, { useState, useEffect, useCallback } from "react";
import { DataComments } from "../lib/tables/comments";
import { pb } from "../lib/db";
import {
  CommentsResponse,
  CommentsEntityTypeOptions,
} from "../lib/pocketbase-types";

interface CommentWithReplies extends CommentsResponse {
  replies?: CommentWithReplies[];
}

interface CommentSectionProps {
  entityType: CommentsEntityTypeOptions;
  entityId: string;
}

const PER_PAGE = 10;
const STORAGE_KEY = "comment_reactions";

type ReactionMap = Record<string, "like" | "dislike">;

function getReactions(): ReactionMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveReactions(reactions: ReactionMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
}

function validateWA(value: string) {
  if (!value.trim()) return "Nomor WA is required";
  if (!/^\d+$/.test(value)) return "Nomor WA must contain only numbers";
  if (!value.startsWith("62")) return "Nomor WA must begin with 62";
  return "";
}

export default function CommentSection({
  entityType,
  entityId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDepth, setReplyDepth] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [reactions, setReactions] = useState<ReactionMap>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    author_website: "",
    content: "",
  });

  const [replyData, setReplyData] = useState<
    Record<
      string,
      {
        author_name: string;
        author_email: string;
        author_website: string;
        content: string;
      }
    >
  >({});

  useEffect(() => {
    setReactions(getReactions());
    if (pb.authStore.isValid) {
      setIsAdmin(true);
      const model = pb.authStore.model as any;
      if (model?.name) {
        setAdminName(model.name);
      }
    }
  }, []);

  const loadComments = useCallback(
    async (pageNum: number, append: boolean = false) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      try {
        const result = await DataComments.fetchTopLevel(
          entityType,
          entityId,
          pageNum,
          PER_PAGE,
        );
        const commentsWithReplies: CommentWithReplies[] = [];

        for (const comment of result.items) {
          const replies = await DataComments.fetchReplies(comment.id);
          const commentWithReplies: CommentWithReplies = {
            ...comment,
            replies: [],
          };

          for (const reply of replies) {
            const nestedReplies = await DataComments.fetchReplies(reply.id);
            commentWithReplies.replies!.push({
              ...reply,
              replies: nestedReplies,
            });
          }

          commentsWithReplies.push(commentWithReplies);
        }

        if (append) {
          setComments((prev) => [...prev, ...commentsWithReplies]);
        } else {
          setComments(commentsWithReplies);
        }

        setHasMore(result.items.length === PER_PAGE);
        setPage(pageNum);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [entityType, entityId],
  );

  const loadTotal = useCallback(async () => {
    const count = await DataComments.countByEntity(entityType, entityId);
    setTotalComments(count);
  }, [entityType, entityId]);

  useEffect(() => {
    loadComments(1);
    loadTotal();
  }, [loadComments, loadTotal]);

  const handleLoadMore = () => {
    loadComments(page + 1, true);
  };

  const validateForm = (data: {
    author_name: string;
    author_email: string;
    content: string;
  }) => {
    if (!isAdmin) {
      if (!data.author_name.trim()) return "Name is required";
      const waError = validateWA(data.author_email);
      if (waError) return waError;
    }
    if (!data.content.trim()) return "Comment content is required";
    if (data.content.trim().length < 3)
      return "Comment too short (min 3 characters)";
    return "";
  };

  const handleMainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    const error = validateForm(formData);
    if (error) {
      setFormError(error);
      return;
    }

    setSubmitting(true);
    try {
      await DataComments.create({
        author_name: isAdmin ? adminName : formData.author_name,
        author_email: isAdmin ? "admin" : formData.author_email,
        author_website: isAdmin ? "" : formData.author_website,
        content: formData.content,
        entity_id: entityId,
        entity_type: entityType,
      });
      setFormData({
        author_name: "",
        author_email: "",
        author_website: "",
        content: "",
      });
      setSuccessMsg("Comment submitted successfully!");
      loadComments(1);
      loadTotal();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to submit comment:", err);
      setFormError("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string, depth: number) => {
    const data = replyData[parentId] || {
      author_name: "",
      author_email: "",
      author_website: "",
      content: "",
    };
    setFormError("");

    const error = validateForm(data);
    if (error) {
      setFormError(error);
      return;
    }

    setSubmitting(true);
    try {
      await DataComments.create({
        author_name: isAdmin ? adminName : data.author_name,
        author_email: isAdmin ? "admin" : data.author_email,
        author_website: isAdmin ? "" : data.author_website,
        content: data.content,
        entity_id: entityId,
        entity_type: entityType,
        parent_id: parentId,
      });
      setReplyData((prev) => ({
        ...prev,
        [parentId]: {
          author_name: "",
          author_email: "",
          author_website: "",
          content: "",
        },
      }));
      setReplyingTo(null);
      loadComments(1);
      loadTotal();
    } catch (err) {
      console.error("Failed to submit reply:", err);
      setFormError("Failed to submit reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateCommentScore = (
    commentsList: CommentWithReplies[],
    commentId: string,
    delta: number,
  ): CommentWithReplies[] => {
    return commentsList.map((c) => {
      if (c.id === commentId) {
        return { ...c, flags_count: Math.max(0, (c.flags_count || 0) + delta) };
      }
      if (c.replies) {
        return {
          ...c,
          replies: c.replies.map((r) => {
            if (r.id === commentId) {
              return {
                ...r,
                flags_count: Math.max(0, (r.flags_count || 0) + delta),
              };
            }
            if (r.replies) {
              return {
                ...r,
                replies: r.replies.map((nr) =>
                  nr.id === commentId
                    ? {
                        ...nr,
                        flags_count: Math.max(
                          0,
                          (nr.flags_count || 0) + delta,
                        ),
                      }
                    : nr,
                ),
              };
            }
            return r;
          }),
        };
      }
      return c;
    });
  };

  const handleReaction = async (
    commentId: string,
    type: "like" | "dislike",
  ) => {
    const current = reactions[commentId];

    if (current === type) {
      const newReactions = { ...reactions };
      delete newReactions[commentId];
      setReactions(newReactions);
      saveReactions(newReactions);

      const delta = type === "like" ? -1 : 1;
      setComments((prev) => updateCommentScore(prev, commentId, delta));

      try {
        const comment = await DataComments.getById(commentId);
        if (type === "like") {
          await DataComments.updateScore(
            commentId,
            Math.max(0, (comment.flags_count || 0) - 1),
          );
        } else {
          await DataComments.updateScore(
            commentId,
            (comment.flags_count || 0) + 1,
          );
        }
      } catch (err) {
        console.error("Failed to sync reaction:", err);
      }
      return;
    }

    const newReactions = { ...reactions, [commentId]: type };
    setReactions(newReactions);
    saveReactions(newReactions);

    let delta = 0;
    if (!current) {
      delta = type === "like" ? 1 : -1;
    } else if (current === "like" && type === "dislike") {
      delta = -2;
    } else if (current === "dislike" && type === "like") {
      delta = 2;
    }

    setComments((prev) => updateCommentScore(prev, commentId, delta));

    try {
      const comment = await DataComments.getById(commentId);
      const newScore = Math.max(0, (comment.flags_count || 0) + delta);
      await DataComments.updateScore(commentId, newScore);
    } catch (err) {
      console.error("Failed to sync reaction:", err);
    }
  };

  const removeCommentFromTree = (
    commentsList: CommentWithReplies[],
    commentId: string,
  ): CommentWithReplies[] => {
    return commentsList
      .filter((c) => c.id !== commentId)
      .map((c) => ({
        ...c,
        replies: c.replies
          ? removeCommentFromTree(c.replies, commentId)
          : [],
      }));
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Delete this comment and all its replies?")) return;
    try {
      await DataComments.deleteWithChildren(commentId);
      setComments((prev) => removeCommentFromTree(prev, commentId));
      loadTotal();
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const toggleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const updateReplyData = (commentId: string, field: string, value: string) => {
    setReplyData((prev) => ({
      ...prev,
      [commentId]: {
        ...(prev[commentId] || {
          author_name: "",
          author_email: "",
          author_website: "",
          content: "",
        }),
        [field]: value,
      },
    }));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCommentByAdmin = (comment: CommentWithReplies) => {
    if (!isAdmin) return false;
    return comment.author_name === adminName || comment.author_email === "admin";
  };

  const renderReplyForm = (commentId: string) => {
    const data = replyData[commentId] || {
      author_name: "",
      author_email: "",
      author_website: "",
      content: "",
    };
    return (
      <div className="cs-reply-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const depth = replyDepth[commentId] || 1;
            handleReplySubmit(commentId, depth);
          }}
        >
          {!isAdmin && (
            <>
              <div className="cs-form-row">
                <input
                  type="text"
                  placeholder="Your name"
                  value={data.author_name}
                  onChange={(e) =>
                    updateReplyData(commentId, "author_name", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Nomor WA (e.g. 628123456789)"
                  value={data.author_email}
                  onChange={(e) =>
                    updateReplyData(commentId, "author_email", e.target.value)
                  }
                  required
                />
              </div>
              <div className="cs-form-row">
                <input
                  type="url"
                  placeholder="Website (optional)"
                  value={data.author_website}
                  onChange={(e) =>
                    updateReplyData(
                      commentId,
                      "author_website",
                      e.target.value,
                    )
                  }
                />
              </div>
            </>
          )}
          <textarea
            style={{ padding: 15, marginBottom: 10, borderRadius: 5 }}
            placeholder="Write your reply..."
            value={data.content}
            onChange={(e) =>
              updateReplyData(commentId, "content", e.target.value)
            }
            required
            rows={3}
          />
          <div className="cs-form-actions">
            <button
              type="submit"
              className="cs-btn cs-btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Reply"}
            </button>
            <button
              type="button"
              className="cs-btn cs-btn-secondary"
              onClick={() => setReplyingTo(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderComment = (comment: CommentWithReplies, depth: number = 0) => {
    const maxDepth = 2;
    const canReply = depth < maxDepth;
    const userReaction = reactions[comment.id];
    const byAdmin = isCommentByAdmin(comment);

    return (
      <div
        key={comment.id}
        className={`cs-comment ${depth > 0 ? `cs-comment-depth-${depth}` : ""}`}
      >
        <div className="cs-comment-header">
          <span
            className={`cs-comment-author ${byAdmin ? "cs-admin-author" : ""}`}
          >
            {byAdmin ? (
              <>
                <span className="cs-admin-name">{adminName}</span>
                <span className="cs-badge" title="Admin">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
              </>
            ) : comment.author_website ? (
              <a
                href={comment.author_website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {comment.author_name}
              </a>
            ) : (
              comment.author_name
            )}
          </span>
          <span className="cs-comment-date">{formatDate(comment.created)}</span>
        </div>
        <div
          className="cs-comment-content"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        <div className="cs-comment-actions">
          {isAdmin && (
            <button
              className="cs-btn-link cs-delete-btn"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          )}
          {canReply && (
            <button
              className="cs-btn-link"
              onClick={() => toggleReply(comment.id)}
            >
              {replyingTo === comment.id ? "Cancel" : "Reply"}
            </button>
          )}
          <button
            className={`cs-btn-link cs-reaction-btn ${userReaction === "like" ? "cs-liked" : ""}`}
            onClick={() => handleReaction(comment.id, "like")}
          >
            Like ({Math.max(0, comment.flags_count || 0)})
          </button>
          <button
            className={`cs-btn-link cs-reaction-btn ${userReaction === "dislike" ? "cs-disliked" : ""}`}
            onClick={() => handleReaction(comment.id, "dislike")}
          >
            Dislike
          </button>
        </div>
        {replyingTo === comment.id && renderReplyForm(comment.id)}
        {comment.replies && comment.replies.length > 0 && (
          <div className="cs-replies">
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cs-container">
      <style>{`
        .cs-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .cs-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #1a1a1a;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 12px;
        }
        .cs-count {
          color: #6b7280;
          font-weight: 400;
          font-size: 1rem;
        }
        .cs-form {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 32px;
        }
        .cs-form-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #374151;
        }
        .cs-form-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .cs-form-row input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.9rem;
          transition: border-color 0.2s;
        }
        .cs-form-row input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .cs-form textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.9rem;
          resize: vertical;
          min-height: 80px;
          margin-bottom: 12px;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .cs-form textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .cs-form-actions {
          display: flex;
          gap: 8px;
        }
        .cs-btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .cs-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cs-btn-primary {
          background: #3b82f6;
          color: white;
        }
        .cs-btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }
        .cs-btn-secondary {
          background: #e5e7eb;
          color: #374151;
        }
        .cs-btn-secondary:hover {
          background: #d1d5db;
        }
        .cs-btn-link {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .cs-btn-link:hover {
          background: #eff6ff;
        }
        .cs-reaction-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .cs-liked {
          color: #16a34a;
          background: #f0fdf4;
          font-weight: 600;
        }
        .cs-liked:hover {
          background: #dcfce7;
        }
        .cs-disliked {
          color: #dc2626;
          background: #fef2f2;
          font-weight: 600;
        }
        .cs-disliked:hover {
          background: #fee2e2;
        }
        .cs-delete-btn {
          color: #dc2626;
        }
        .cs-delete-btn:hover {
          background: #fef2f2;
          color: #b91c1c;
        }
        .cs-comment {
          border-bottom: 1px solid #f3f4f6;
          padding: 16px 0;
        }
        .cs-comment:last-child {
          border-bottom: none;
        }
        .cs-comment-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .cs-comment-author {
          font-weight: 600;
          color: #1f2937;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .cs-comment-author a {
          color: #3b82f6;
          text-decoration: none;
        }
        .cs-comment-author a:hover {
          text-decoration: underline;
        }
        .cs-admin-author {
          color: #3b82f6;
          font-weight: 700;
        }
        .cs-admin-name {
          font-style: italic;
        }
        .cs-badge {
          display: inline-flex;
          align-items: center;
          color: #3b82f6;
          margin-left: 2px;
        }
        .cs-badge svg {
          display: block;
        }
        .cs-comment-date {
          color: #9ca3af;
          font-size: 0.85rem;
        }
        .cs-comment-content {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .cs-comment-content p {
          margin: 0;
        }
        .cs-comment-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .cs-replies {
          margin-left: 24px;
          border-left: 2px solid #e5e7eb;
          padding-left: 16px;
        }
        .cs-comment-depth-1 {
          margin-left: 24px;
          border-left: 2px solid #e5e7eb;
          padding-left: 16px;
        }
        .cs-comment-depth-2 {
          margin-left: 24px;
          border-left: 2px solid #e5e7eb;
          padding-left: 16px;
        }
        .cs-reply-form {
          margin-top: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 6px;
        }
        .cs-reply-form .cs-form-row {
          flex-direction: column;
        }
        .cs-reply-form textarea {
          min-height: 60px;
        }
        .cs-load-more {
          text-align: center;
          margin-top: 24px;
        }
        .cs-loading {
          text-align: center;
          padding: 40px 0;
          color: #6b7280;
        }
        .cs-empty {
          text-align: center;
          padding: 40px 0;
          color: #6b7280;
        }
        .cs-error {
          background: #fef2f2;
          color: #dc2626;
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }
        .cs-success {
          background: #f0fdf4;
          color: #16a34a;
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }
        @media (max-width: 640px) {
          .cs-form-row {
            flex-direction: column;
          }
          .cs-replies {
            margin-left: 12px;
            padding-left: 12px;
          }
          .cs-comment-depth-1,
          .cs-comment-depth-2 {
            margin-left: 12px;
            padding-left: 12px;
          }
        }
      `}</style>

      <h3 className="cs-title">
        Comments <span className="cs-count">({totalComments})</span>
      </h3>

      <div className="cs-form">
        <div className="cs-form-title">
          {isAdmin ? `Reply as ${adminName}` : "Leave a Comment"}
        </div>
        {formError && <div className="cs-error">{formError}</div>}
        {successMsg && <div className="cs-success">{successMsg}</div>}
        <form onSubmit={handleMainSubmit}>
          {!isAdmin && (
            <>
              <div className="cs-form-row">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.author_name}
                  onChange={(e) =>
                    setFormData({ ...formData, author_name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Nomor WA (e.g. 628123456789)"
                  value={formData.author_email}
                  onChange={(e) =>
                    setFormData({ ...formData, author_email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="cs-form-row">
                <input
                  type="url"
                  placeholder="Website (optional)"
                  value={formData.author_website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author_website: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}
          <textarea
            placeholder={isAdmin ? "Write your comment..." : "Write your comment..."}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            rows={4}
          />
          <button
            type="submit"
            className="cs-btn cs-btn-primary"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="cs-loading">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="cs-empty">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <>
          <div className="cs-comments-list">
            {comments.map((comment) => renderComment(comment))}
          </div>
          {hasMore && (
            <div className="cs-load-more">
              <button
                className="cs-btn cs-btn-primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More Comments"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, CommentsRecord, CommentsEntityTypeOptions } from "../pocketbase-types";

export const DataComments = {
  create: async (data: {
    author_name: string;
    author_email: string;
    author_website?: string;
    content: string;
    entity_id: string;
    entity_type: CommentsEntityTypeOptions;
    parent_id?: string;
  }) => {
    const record: Partial<CommentsRecord> = {
      author_name: data.author_name,
      author_email: data.author_email,
      author_website: data.author_website || "",
      content: data.content,
      entity_id: data.entity_id,
      entity_type: data.entity_type,
      parent_id: data.parent_id || "",
      is_approved: true,
      tenant: getTenantId(),
    };
    const r = await pb.collection(Collections.Comments).create(record);
    return r;
  },

  fetchTopLevel: async (
    entityType: CommentsEntityTypeOptions,
    entityId: string,
    page: number = 1,
    perPage: number = 10
  ) => {
    const r = await pb.collection(Collections.Comments).getList(page, perPage, {
      filter: `${TENANT_FILTER} && entity_type="${entityType}" && entity_id="${entityId}" && is_approved=true && parent_id=""`,
      sort: "-created",
    });
    return r;
  },

  fetchReplies: async (parentId: string) => {
    const r = await pb.collection(Collections.Comments).getFullList({
      filter: `${TENANT_FILTER} && parent_id="${parentId}" && is_approved=true`,
      sort: "+created",
    });
    return r;
  },

  flag: async (commentId: string) => {
    const comment = await pb.collection(Collections.Comments).getOne(commentId);
    const currentFlags = comment.flags_count || 0;
    const r = await pb.collection(Collections.Comments).update(commentId, {
      flags_count: currentFlags + 1,
      is_flagged: true,
    });
    return r;
  },

  getById: async (commentId: string) => {
    const r = await pb.collection(Collections.Comments).getOne(commentId);
    return r;
  },

  updateScore: async (commentId: string, score: number) => {
    const r = await pb.collection(Collections.Comments).update(commentId, {
      flags_count: score,
    });
    return r;
  },

  countByEntity: async (
    entityType: CommentsEntityTypeOptions,
    entityId: string
  ) => {
    try {
      const resp = await pb.collection(Collections.Comments).getList(1, 1, {
        filter: `${TENANT_FILTER} && entity_type="${entityType}" && entity_id="${entityId}" && is_approved=true && parent_id=""`,
      });
      return resp.totalItems;
    } catch {
      return 0;
    }
  },

  readAll: async (
    page: number = 1,
    perPage: number = 50,
    filter: string = "",
    sort: string = "-created",
  ) => {
    const fullFilter = filter
      ? `${TENANT_FILTER} && (${filter})`
      : TENANT_FILTER;
    const r = await pb.collection(Collections.Comments).getList(page, perPage, {
      filter: fullFilter,
      sort,
    });
    return r;
  },

  deleteWithChildren: async (commentId: string) => {
    const children = await pb.collection(Collections.Comments).getFullList({
      filter: `parent_id="${commentId}"`,
    });
    for (const child of children) {
      await DataComments.deleteWithChildren(child.id);
    }
    await pb.collection(Collections.Comments).delete(commentId);
  },
};

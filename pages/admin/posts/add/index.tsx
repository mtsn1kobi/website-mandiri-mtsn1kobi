import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../../components/adminlayout";
import { adminSidebar } from "../../../../lib/admin-sidebar";
import { DataPosts } from "../../../../lib/tables/posts";

export default function AddPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      await customElements.whenDefined("cs-input");

      // Set default date to today
      setVal("post-date", new Date().toISOString().split("T")[0]);
      setVal("post-author", "Admin"); // Default author
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const title = getVal("post-title");
      const excerpt = getVal("post-excerpt");
      const author = getVal("post-author");
      const date = getVal("post-date");
      const cover = getVal("post-cover");
      let slug = "";

      // Get RTF content
      const content = getVal("post-content");

      // Auto-generate slug from title if empty
      if (title) {
        slug = title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }

      await DataPosts.create({
        title: title || "Untitled",
        slug: slug || "untitled-" + Date.now(),
        content,
        excerpt,
        cover_image: cover,
        author_name: author,
        date: date || new Date().toISOString().split("T")[0],
      });

      (window as any).toast?.success?.("Post created!");
      router.push("/admin/posts");
    } catch (err: any) {
      (window as any).toast?.error?.(err?.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Posts", "Add Post"]}
      sidebar={adminSidebar}
      activePath="/admin/posts"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Add New Post</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => router.push("/admin/posts")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #e4e4e7",
              background: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#18181b",
              color: "#fafafa",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "800px",
        }}
      >
        <cs-input id="post-title" type="text" label="Judul"></cs-input>
        <cs-input id="post-excerpt" type="text" label="Ringkasan"></cs-input>
        <cs-rtf id="post-content" label="Isi" rows={12}></cs-rtf>
        <cs-upload id="post-cover" label="Foto Cover"></cs-upload>
        <cs-input id="post-author" type="text" label="Penulis"></cs-input>
        <cs-input id="post-date" type="date" label="Tanggal"></cs-input>
      </div>
    </AdminLayout>
  );
}

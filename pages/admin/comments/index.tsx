import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataComments } from "../../../lib/tables/comments";

export default function CommentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await DataComments.readAll(1, 500, "", "-created");
        const items = result.items.map((item: any) => ({
          ...item,
          _author: item.author_name || "Anonymous",
          _entity: `${item.entity_type || ""} / ${item.entity_id || ""}`,
          _content_short: (item.content || "").replace(/<[^>]*>/g, "").substring(0, 80),
          _parent: item.parent_id ? "Reply" : "Top-level",
        }));
        setData(items);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const refreshData = async () => {
    const result = await DataComments.readAll(1, 500, "", "-created");
    const items = result.items.map((item: any) => ({
      ...item,
      _author: item.author_name || "Anonymous",
      _entity: `${item.entity_type || ""} / ${item.entity_id || ""}`,
      _content_short: (item.content || "").replace(/<[^>]*>/g, "").substring(0, 80),
      _parent: item.parent_id ? "Reply" : "Top-level",
    }));
    setData(items);
  };

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("comments-table") as any;
      if (!table) return;

      table.columns = [
        {
          key: "_author",
          title: "Author",
          type: "text",
        },
        {
          key: "_content_short",
          title: "Content",
          type: "text",
        },
        {
          key: "_entity",
          title: "Entity",
          type: "text",
        },
        {
          key: "flags_count",
          title: "Score",
          type: "text",
          renderer: (value: number) => value || 0,
        },
        {
          key: "created",
          title: "Date",
          type: "text",
          renderer: (value: string) => value ? new Date(value).toLocaleString() : "—",
        },
        { key: "id", title: "ID", hidden: true },
        { key: "entity_type", title: "Entity Type", hidden: true },
        { key: "entity_id", title: "Entity ID", hidden: true },
        { key: "parent_id", title: "Parent ID", hidden: true },
        { key: "_parent", title: "Type", hidden: true },
        { key: "content", title: "Full Content", hidden: true },
        { key: "author_email", title: "Author Email/WA", hidden: true },
        { key: "author_website", title: "Author Website", hidden: true },
        { key: "is_approved", title: "Approved", hidden: true },
        { key: "is_flagged", title: "Flagged", hidden: true },
      ];

      table.data = data;

      table.onDelete = async (row: any) => {
        try {
          await DataComments.deleteWithChildren(row.id);
          await refreshData();
          (window as any).toast?.success?.("Comment deleted!");
          return true;
        } catch (err: any) {
          (window as any).toast?.error?.(err?.message || "Failed to delete comment");
          return false;
        }
      };
    };
    setupTable();
  }, [loading, data]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Comments"]}
        sidebar={adminSidebar}
        activePath="/admin/comments"
      >
        <p>Loading comments...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Comments"]}
      sidebar={adminSidebar}
      activePath="/admin/comments"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>Comments Management</h1>
        <span style={{ color: "#71717a", fontSize: "0.875rem" }}>
          {data.length} total comment{data.length !== 1 ? "s" : ""}
        </span>
      </div>
      <cs-data-table
        id="comments-table"
        title="All Comments"
        page-size="20"
        page-size-options="10,20,50,100"
      ></cs-data-table>
    </AdminLayout>
  );
}

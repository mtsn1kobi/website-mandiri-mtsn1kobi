import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataPages } from "../../../lib/tables/pages";

export default function PagesAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await DataPages.read(1, 200, "", "-updated", "id,title,slug,updated");
        setData(result.items || []);
      } catch (err) {
        console.error("Failed to load pages:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const refreshData = async () => {
    const result = await DataPages.read(1, 200, "", "-updated", "id,title,slug,updated");
    setData(result.items || []);
  };

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("pages-table") as any;
      if (!table) return;

      table.columns = [
        {
          key: "title",
          title: "Title",
          type: "text",
          renderer: (value: string, row: any) =>
            `<a href="/admin/pages/edit?id=${row.id}" style="color:inherit;text-decoration:none;font-weight:500;">${value || "Untitled"}</a>`,
        },
        {
          key: "updated",
          title: "Updated",
          type: "text",
          renderer: (value: string) => value ? new Date(value).toLocaleString() : "—",
        },
        { key: "id", title: "ID", hidden: true },
        { key: "slug", title: "Slug", hidden: true },
      ];

      table.data = data;

      table.onDelete = async (row: any) => {
        try {
          await DataPages.delete(row.id);
          await refreshData();
          (window as any).toast?.success?.("Page deleted!");
          return true;
        } catch (err: any) {
          (window as any).toast?.error?.(err?.message || "Failed to delete page");
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
        breadcrumb={["Dashboard", "Pages"]}
        sidebar={adminSidebar}
        activePath="/admin/pages"
      >
        <p>Loading pages...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Pages"]}
      sidebar={adminSidebar}
      activePath="/admin/pages"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>Pages Management</h1>
        <a
          href="/admin/pages/add"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.5rem 1rem",
            background: "#18181b",
            color: "#fafafa",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          + Add Page
        </a>
      </div>
      <cs-data-table
        id="pages-table"
        title="All Pages"
        page-size="20"
        page-size-options="10,20,50,100"
      ></cs-data-table>
    </AdminLayout>
  );
}

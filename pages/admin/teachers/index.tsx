import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataTeachers } from "../../../lib/tables/teachers";

export default function TeachersPage() {
  const [teachersData, setTeachersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const records = await DataTeachers.all();
    setTeachersData(records as any[]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("teachers-table") as any;
      if (!table) return;

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        { key: "nama", title: "Name", type: "text", placeholder: "Teacher name" },
        {
          key: "foto",
          title: "Photo URL",
          type: "upload",
          renderer: (value: string) =>
            value ? `<a href="${value}" target="_blank" rel="noopener noreferrer">Photo</a>` : "",
        },
        { key: "mapel", title: "Subject", type: "text", placeholder: "Subject taught" },
        { key: "facebook", title: "Facebook", type: "text", placeholder: "Facebook URL" },
        { key: "twitter", title: "Twitter", type: "text", placeholder: "Twitter URL" },
        { key: "instagram", title: "Instagram", type: "text", placeholder: "Instagram URL" },
      ];

      table.data = teachersData;

      table.onAdd = async (p: any) => {
        try {
          const r = await DataTeachers.create(p);
          await loadData();
          (window as any).toast?.success?.("Teacher added");
          return { ...p, id: r.id };
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onEdit = async (p: any, prev: any) => {
        try {
          await DataTeachers.update(prev.id, p);
          await loadData();
          (window as any).toast?.success?.("Teacher updated");
          return p;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onDelete = async (row: any) => {
        try {
          await DataTeachers.delete(row.id);
          await loadData();
          (window as any).toast?.success?.("Teacher deleted");
          return true;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };
    };

    setupTable();
  }, [loading, teachersData]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Teachers"]}
        sidebar={adminSidebar}
        activePath="/admin/teachers"
      >
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Teachers"]}
      sidebar={adminSidebar}
      activePath="/admin/teachers"
    >
      <h1>Teachers Management</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Manage teachers and staff
      </p>
      <cs-data-table
        id="teachers-table"
        title="Teachers & Staff"
        page-size="20"
        download="true"
      ></cs-data-table>
    </AdminLayout>
  );
}
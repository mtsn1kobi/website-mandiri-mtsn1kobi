import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataEvents } from "../../../lib/tables/events";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const records = await DataEvents.all();
    setEventsData(records as any[]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("events-table") as any;
      if (!table) return;

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        { key: "title", title: "Title", type: "text", placeholder: "Event title" },
        { key: "text", title: "Description", type: "text", placeholder: "Brief description" },
        {
          key: "image",
          title: "Image URL",
          type: "upload",
          renderer: (value: string) =>
            value ? `<a href="${value}" target="_blank" rel="noopener noreferrer">Link</a>` : "",
        },
        {
          key: "content",
          title: "Content",
          type: "rtf",
          rows: 6,
        },
      ];

      table.data = eventsData;

      table.onAdd = async (p: any) => {
        try {
          const r = await DataEvents.create(p);
          await loadData();
          (window as any).toast?.success?.("Event added");
          return { ...p, id: r.id };
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onEdit = async (p: any, prev: any) => {
        try {
          await DataEvents.update(prev.id, p);
          await loadData();
          (window as any).toast?.success?.("Event updated");
          return p;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onDelete = async (row: any) => {
        try {
          await DataEvents.delete(row.id);
          await loadData();
          (window as any).toast?.success?.("Event deleted");
          return true;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };
    };

    setupTable();
  }, [loading, eventsData]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Events"]}
        sidebar={adminSidebar}
        activePath="/admin/events"
      >
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Events"]}
      sidebar={adminSidebar}
      activePath="/admin/events"
    >
      <h1>Events Management</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Manage events and activities
      </p>
      <cs-data-table
        id="events-table"
        title="Events"
        page-size="20"
      ></cs-data-table>
    </AdminLayout>
  );
}
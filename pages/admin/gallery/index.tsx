import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataGallery } from "../../../lib/tables/gallery";

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const records = await DataGallery.all();
    setGalleryData(records as any[]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("gallery-table") as any;
      if (!table) return;

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        {
          key: "title",
          title: "Title",
          type: "text",
          placeholder: "Gallery title",
        },
        {
          key: "description",
          title: "Description",
          type: "text",
          placeholder: "Brief description",
        },
        {
          key: "image",
          title: "Image URL",
          type: "upload",
          renderer: (value: string) =>
            value ? `<a href="${value}" target="_blank" rel="noopener noreferrer">Link</a>` : "",
        },
      ];

      table.data = galleryData;

      table.onAdd = async (p: any) => {
        try {
          const r = await DataGallery.create(p);
          await loadData();
          (window as any).toast?.success?.("Gallery item added");
          return { ...p, id: r.id };
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onEdit = async (p: any, prev: any) => {
        try {
          await DataGallery.update(prev.id, p);
          await loadData();
          (window as any).toast?.success?.("Gallery item updated");
          return p;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onDelete = async (row: any) => {
        try {
          await DataGallery.delete(row.id);
          await loadData();
          (window as any).toast?.success?.("Gallery item deleted");
          return true;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };
    };

    setupTable();
  }, [loading, galleryData]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Gallery"]}
        sidebar={adminSidebar}
        activePath="/admin/gallery"
      >
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Gallery"]}
      sidebar={adminSidebar}
      activePath="/admin/gallery"
    >
      <h1>Gallery Management</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Manage photo gallery
      </p>
      <cs-data-table
        id="gallery-table"
        title="Gallery Items"
        page-size="20"
      ></cs-data-table>
    </AdminLayout>
  );
}
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataSliderItems } from "../../../lib/tables/slider_items";

export default function SliderPage() {
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const record = await DataSliderItems.getByTenant();
    setSliderData((record?.items as any[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const setupTable = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById("slider-table") as any;
      if (!table) return;

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        {
          key: "image",
          title: "Image URL",
          type: "upload",
          renderer: (value: string) =>
            value
              ? `<a href="${value}" target="_blank" rel="noopener noreferrer">Link</a>`
              : "",
        },
        {
          key: "text",
          title: "Text",
          type: "text",
          placeholder: "Slide caption",
        },
      ];

      table.data = sliderData;

      table.onAdd = async (p: any) => {
        try {
          const newData = [...sliderData, p];
          await DataSliderItems.upsert(newData);
          (window as any).toast?.success?.("Slider item added");
          return { ...p, id: Math.random().toString(36).substr(2, 9) };
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onEdit = async (p: any, prev: any) => {
        try {
          const newData = sliderData.map((item: any) =>
            item.id === prev.id ? { ...p, id: prev.id } : item,
          );
          await DataSliderItems.upsert(newData);
          (window as any).toast?.success?.("Slider item updated");
          return p;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };

      table.onDelete = async (row: any) => {
        try {
          const newData = sliderData.filter((item: any) => item.id !== row.id);
          await DataSliderItems.upsert(newData);
          (window as any).toast?.success?.("Slider item deleted");
          return true;
        } catch (e: any) {
          (window as any).toast?.error?.(e.message);
          return false;
        }
      };
    };

    setupTable();
  }, [loading, sliderData]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Slider"]}
        sidebar={adminSidebar}
        activePath="/admin/slider"
      >
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Slider"]}
      sidebar={adminSidebar}
      activePath="/admin/slider"
    >
      <h1>Slider Management</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Halaman ini digunakan untuk mengelola slider di halaman utama. Yang
        wajib diperhatikan adalah slider harus memiliki{" "}
        <span style={{ fontWeight: "bold", color: "#b91c1c" }}>
          PALING SEDIKIT 2 ITEM
        </span>
        . Jika kurang dari 2 item, maka slider tidak akan muncul di halaman
        utama.
      </p>
      <cs-data-table
        id="slider-table"
        title="Homepage Slider"
        page-size="10"
      ></cs-data-table>
    </AdminLayout>
  );
}

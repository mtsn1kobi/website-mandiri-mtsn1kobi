import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataPages } from "../../../lib/tables/pages";
import { DataKeunggulan } from "../../../lib/tables/keunggulan";
import { DataMenus } from "../../../lib/tables/menus";
import { DataQuickPopularLinks } from "../../../lib/tables/quick_popular_links";
import { DataSchoolSettings } from "../../../lib/tables/school_settings";
import { DataVisiMisi } from "../../../lib/tables/visi_misi";
import {
  Collections,
  KeunggulanRecord,
  MenusRecord,
} from "../../../lib/pocketbase-types";
import { DataEvents } from "../../../lib/tables/events";
import { DataPosts } from "../../../lib/tables/posts";
import { DataTeachers } from "../../../lib/tables/teachers";
import { DataSliderItems } from "../../../lib/tables/slider_items";
import { DataGallery } from "../../../lib/tables/gallery";
import { getTenantId, pb } from "../../../lib/db";
import { defaultSettings } from "../../../lib/defaultSettings";

interface LinkItem {
  id: string;
  name: string;
  url: string;
  type: "quick" | "popular";
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [keunggulanData, setKeunggulanData] = useState<KeunggulanRecord[]>([]);
  const [menusData, setMenusData] = useState<MenusRecord[]>([]);
  const [linksData, setLinksData] = useState<LinkItem[]>([]);
  const [pagesData, setPagesData] = useState<{ slug: string }[]>([]);
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState<string[]>([]);
  const [savingVisi, setSavingVisi] = useState(false);
  const [schoolSettings, setSchoolSettings] = useState<{
    id: string;
    nama_sekolah?: string;
    alamat?: string;
    telepon?: string;
    email?: string;
    jam_kerja?: string;
    sekilas_info?: string;
    tentang_kepsek?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    video?: string;
    popup?: string;
    logo?: string;
    title?: string;
    about_image?: string;
    home_background?: string;
  } | null>(null);
  const settingsInited = useRef(false);

  const loadAll = async () => {
    const [keunggulan, menus, linksRecords, pages, school] = await Promise.all([
      DataKeunggulan.all(),
      DataMenus.all(),
      DataQuickPopularLinks.all(),
      DataPages.all(),
      DataSchoolSettings.read(),
    ]);
    setKeunggulanData(keunggulan);
    setMenusData(menus);

    const quickLinks: LinkItem[] = [];
    const popularLinks: LinkItem[] = [];
    for (const record of linksRecords) {
      if (record.item && Array.isArray(record.item)) {
        for (const link of record.item as Array<{
          name: string;
          url: string;
        }>) {
          if (record.type === "quick") {
            quickLinks.push({
              name: link.name,
              url: link.url,
              type: "quick",
              id: `${record.id}-quick-${link.name}`,
            });
          } else if (record.type === "popular") {
            popularLinks.push({
              name: link.name,
              url: link.url,
              type: "popular",
              id: `${record.id}-popular-${link.name}`,
            });
          }
        }
      }
    }
    setLinksData([...quickLinks, ...popularLinks]);
    setPagesData(pages as { slug: string }[]);
    setSchoolSettings(school.items[0]);

    const visiRecords = await DataVisiMisi.read();
    if (visiRecords.length > 0) {
      const item = (visiRecords[0] as any).item;
      if (item) {
        setVisi(item.Visi || "");
        setMisi(Array.isArray(item.Misi) ? item.Misi : []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!schoolSettings || settingsInited.current) return;
    settingsInited.current = true;
    const fields: Record<string, string> = {
      "ss-nama_sekolah": schoolSettings.nama_sekolah || "",
      "ss-alamat": schoolSettings.alamat || "",
      "ss-telepon": schoolSettings.telepon || "",
      "ss-email": schoolSettings.email || "",
      "ss-jam_kerja": schoolSettings.jam_kerja || "",
      "ss-sekilas_info": schoolSettings.sekilas_info || "",
      "ss-tentang_kepsek": schoolSettings.tentang_kepsek || "",
      "ss-facebook": schoolSettings.facebook || "",
      "ss-instagram": schoolSettings.instagram || "",
      "ss-twitter": schoolSettings.twitter || "",
      "ss-youtube": schoolSettings.youtube || "",
      "ss-video": schoolSettings.video || "",
      "ss-popup": schoolSettings.popup || "",
      "ss-logo": schoolSettings.logo || "",
      "ss-title": schoolSettings.title || "",
      "ss-about_image": schoolSettings.about_image || "",
      "ss-home_background": schoolSettings.home_background || "",
    };
    setTimeout(() => {
      Object.entries(fields).forEach(([id, val]) => {
        setVal(id, val);
      });
    }, 1000);
  }, [schoolSettings]);

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await DataSchoolSettings.update(schoolSettings!.id, {
        nama_sekolah: getVal("ss-nama_sekolah"),
        alamat: getVal("ss-alamat"),
        telepon: getVal("ss-telepon"),
        email: getVal("ss-email"),
        jam_kerja: getVal("ss-jam_kerja"),
        sekilas_info: getVal("ss-sekilas_info"),
        tentang_kepsek: getVal("ss-tentang_kepsek"),
        facebook: getVal("ss-facebook"),
        instagram: getVal("ss-instagram"),
        twitter: getVal("ss-twitter"),
        youtube: getVal("ss-youtube"),
        video: getVal("ss-video"),
        popup: getVal("ss-popup"),
        logo: getVal("ss-logo"),
        title: getVal("ss-title"),
        about_image: getVal("ss-about_image"),
        home_background: getVal("ss-home_background"),
      });
      window.toast?.success?.("School settings saved!");
      const school = await DataSchoolSettings.read();
      setSchoolSettings(school.items[0]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save settings";
      window.toast?.error?.(message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveVisiMisi = async () => {
    setSavingVisi(true);
    try {
      const misiLines = (
        document.getElementById("vm-misi") as HTMLTextAreaElement
      )?.value
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      await DataVisiMisi.upsert({ Visi: visi, Misi: misiLines });
      window.toast?.success?.("Visi & Misi saved!");
      const records = await DataVisiMisi.read();
      if (records.length > 0) {
        const item = (records[0] as any).item;
        if (item) {
          setVisi(item.Visi || "");
          setMisi(Array.isArray(item.Misi) ? item.Misi : []);
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save Visi & Misi";
      window.toast?.error?.(message);
    } finally {
      setSavingVisi(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const iconLabels = [
      "🎓 Graduation Cap",
      "🏫 School Building",
      "📚 Books",
      "🏆 Trophy",
      "⭐ Star",
      "💡 Light Bulb",
      "🔬 Microscope",
      "💻 Laptop",
      "🎨 Palette",
      "⚽ Soccer Ball",
      "🎵 Music",
      "🏅 Medal",
      "📝 Clipboard",
      "👨 Teacher",
      "🎒 Backpack",
      "📖 Open Book",
      "🧪 Flask",
      "🔭 Telescope",
      "🖥 Desktop",
      "🌐 Globe",
      "🏛 University",
      "📐 Ruler",
      "✏ Pencil",
      "🎯 Target",
      "🤝 Handshake",
      "❤ Heart",
      "🛡 Shield",
      "📊 Chart",
      "🔔 Bell",
      "🏠 Home",
      "👥 Users",
      "📅 Calendar",
      "🏢 Building",
      "🔧 Tools",
      "💪 Strength",
      "🎭 Theater",
      "📷 Camera",
      "🖼 Image",
      "🎪 Circus",
      "🌟 Sparkle",
      "🚀 Rocket",
      "🌱 Seedling",
      "📡 Satellite",
      "🔑 Key",
      "📌 Pin",
      "⚙ Settings",
      "📧 Email",
      "📞 Phone",
      "🔗 Link",
      "📁 Folder",
      "📄 Document",
      "🗂 Archive",
      "📊 Presentation",
      "🎓 Cap",
      "🏃 Sports",
      "🎨 Art",
      "🧮 Calculator",
      "🗺 Map",
      "📚 Library",
      "🔒 Lock",
      "☀ Sun",
      "🌙 Moon",
      "💬 Comment",
      "📢 Megaphone",
      "🏗 Construction",
      "🎮 Gaming",
      "🧩 Puzzle",
      "🎤 Microphone",
      "🎬 Film",
      "✈ Travel",
      "🚗 Car",
      "🚌 Bus",
      "🍎 Apple",
      "🌍 Earth",
      "💧 Water",
      "🔥 Fire",
      "❄ Snowflake",
      "🌈 Rainbow",
      "🎁 Gift",
      "🕐 Clock",
      "📦 Box",
      "🔍 Search",
      "✅ Check",
      "! Warning",
      "i Info",
      "❓ Question",
      "🔻 Caret Down",
      "🔺 Caret Up",
      "🔹 Diamond",
      "🏅 Award",
      "🎖 Ribbon",
      "📏 Ruler Combined",
      "🧠 Brain",
      "👁 Eye",
      "🤲 Hands",
      "🌿 Leaf",
      "🎓 Mortar Board",
      "🏫 School",
      "📖 Bible",
      "🕌 Mosque",
      "⛪ Church",
      "🙏 Prayer",
      "📿 Prayer Beads",
    ];
    const iconValues = [
      "fas fa-graduation-cap",
      "fas fa-school",
      "fas fa-book-open",
      "fas fa-trophy",
      "fas fa-star",
      "fas fa-lightbulb",
      "fas fa-microscope",
      "fas fa-laptop",
      "fas fa-palette",
      "fas fa-futbol",
      "fas fa-music",
      "fas fa-medal",
      "fas fa-clipboard",
      "fas fa-chalkboard-teacher",
      "fas fa-backpack",
      "fas fa-book-reader",
      "fas fa-flask",
      "fas fa-microscope",
      "fas fa-desktop",
      "fas fa-globe",
      "fas fa-university",
      "fas fa-ruler",
      "fas fa-pencil-alt",
      "fas fa-bullseye",
      "fas fa-hands-helping",
      "fas fa-heart",
      "fas fa-shield-alt",
      "fas fa-chart-line",
      "fas fa-bell",
      "fas fa-home",
      "fas fa-users",
      "fas fa-calendar-alt",
      "fas fa-building",
      "fas fa-tools",
      "fas fa-dumbbell",
      "fas fa-theater-masks",
      "fas fa-camera",
      "fas fa-image",
      "fas fa-campground",
      "fas fa-sparkles",
      "fas fa-rocket",
      "fas fa-seedling",
      "fas fa-satellite-dish",
      "fas fa-key",
      "fas fa-map-marker-alt",
      "fas fa-cogs",
      "fas fa-envelope",
      "fas fa-phone",
      "fas fa-link",
      "fas fa-folder",
      "fas fa-file-alt",
      "fas fa-archive",
      "fas fa-presentation",
      "fas fa-user-graduate",
      "fas fa-running",
      "fas fa-paint-brush",
      "fas fa-calculator",
      "fas fa-map",
      "fas fa-book",
      "fas fa-lock",
      "fas fa-sun",
      "fas fa-moon",
      "fas fa-comment",
      "fas fa-bullhorn",
      "fas fa-hard-hat",
      "fas fa-gamepad",
      "fas fa-puzzle-piece",
      "fas fa-microphone",
      "fas fa-film",
      "fas fa-plane",
      "fas fa-car",
      "fas fa-bus",
      "fas fa-apple-alt",
      "fas fa-globe-americas",
      "fas fa-tint",
      "fas fa-fire",
      "fas fa-snowflake",
      "fas fa-rainbow",
      "fas fa-gift",
      "fas fa-clock",
      "fas fa-box",
      "fas fa-search",
      "fas fa-check-circle",
      "fas fa-exclamation-triangle",
      "fas fa-info-circle",
      "fas fa-question-circle",
      "fas fa-caret-down",
      "fas fa-caret-up",
      "fas fa-gem",
      "fas fa-award",
      "fas fa-ribbon",
      "fas fa-ruler-combined",
      "fas fa-brain",
      "fas fa-eye",
      "fas fa-hands",
      "fas fa-leaf",
      "fas fa-graduation-cap",
      "fas fa-school",
      "fas fa-quran",
      "fas fa-mosque",
      "fas fa-church",
      "fas fa-pray",
      "fas fa-pray",
    ];

    const setupKeunggulan = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById(
        "keunggulan-table",
      ) as unknown as CSElement<KeunggulanRecord>["cs-data-table"];
      if (!table) return;

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        {
          key: "icon",
          title: "Icon",
          type: "select",
          data: iconLabels.join(";"),
          dataValue: iconValues.join(";"),
          renderer: (value: string) =>
            `<i class="${value}" style="font-size:1.2rem;color:#3b82f6;"></i> <code style="font-size:0.75rem;color:#71717a;margin-left:0.5rem;">${value}</code>`,
        },
        { key: "judul", title: "Title", type: "text" },
        { key: "deskripsi", title: "Description", type: "text" },
      ];
      table.data = keunggulanData;
      table.onAdd = async (p: KeunggulanRecord) => {
        try {
          const r = await DataKeunggulan.create(p);
          toast?.success?.("Keunggulan added");
          return { ...r };
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onEdit = async (
        p: KeunggulanRecord,
        prev: KeunggulanRecord,
        _rowIndex: number,
      ) => {
        try {
          const r = await DataKeunggulan.update(prev.id, p);
          toast?.success?.("Keunggulan updated");
          return r;
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onDelete = async (row: KeunggulanRecord, _rowIndex: number) => {
        try {
          await DataKeunggulan.delete(row.id);
          await loadAll();
          toast?.success?.("Keunggulan deleted");
          return true;
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
    };

    const setupMenus = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById(
        "menus-table",
      ) as unknown as CSElement<MenusRecord>["cs-data-table"];
      if (!table) return;

      const newRoutes = [
        { label: "Home", value: "/" },
        { label: "/guru/", value: "/guru/" },
        { label: "/berita/", value: "/berita/" },
        { label: "/gallery/", value: "/gallery/" },
        { label: "/events/", value: "/events/" },
        { label: "/pages/", value: "/pages/" },
      ];
      const pageUrlOptions = pagesData.map((p) => ({
        label: `/pages/?slug=${p.slug}`,
        value: `/pages/?slug=${p.slug}`,
      }));
      const allUrlOptions = [...newRoutes, ...pageUrlOptions];

      const parentOptions = menusData.map((m) => ({
        label: m.name || "Unnamed",
        value: m.id,
      }));
      const allParentOptions = [
        { label: "No parent (top-level)", value: "" },
        ...parentOptions,
      ];

      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        { key: "name", title: "Name", type: "text" },
        {
          key: "url",
          title: "URL",
          type: "select",
          data: allUrlOptions.map((o) => o.label).join(";"),
          dataValue: allUrlOptions.map((o) => o.value).join(";"),
          renderer: (value: string) =>
            value || '<em style="color:#888">No URL</em>',
          note: "Choose a route or page URL for this menu item.",
        },
        {
          key: "parent",
          title: "Parent",
          type: "select",
          data: allParentOptions.map((o) => o.label).join(";"),
          dataValue: allParentOptions.map((o) => o.value).join(";"),
          renderer: (value: string) => {
            if (!value || value === "")
              return '<em style="color:#888">Top-level</em>';
            const parent = parentOptions.find((o) => o.value === value);
            return parent?.label || value;
          },
          note: "Choose a parent menu for this item.",
        },
      ];
      table.data = menusData;
      table.onAdd = async (p: MenusRecord) => {
        try {
          const r = await DataMenus.create({
            name: p.name,
            url: p.url || undefined,
            parent: p.parent === "" ? undefined : p.parent,
          });
          toast?.success?.("Menu added");
          return { ...r, parent: r.parent || "" };
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onEdit = async (
        p: MenusRecord,
        _prev: MenusRecord,
        _rowIndex: number,
      ) => {
        try {
          const r = await DataMenus.update(_prev.id, p);
          return { ...r, parent: r.parent || "" };
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onDelete = async (row: MenusRecord, _rowIndex: number) => {
        try {
          await DataMenus.delete(row.id);
          toast?.success?.("Menu deleted");
          return true;
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
    };

    const setupLinks = async () => {
      await customElements.whenDefined("cs-data-table");
      const table = document.getElementById(
        "links-table",
      ) as unknown as CSElement<LinkItem>["cs-data-table"];
      if (!table) return;
      table.columns = [
        { key: "id", title: "ID", readonly: true, hidden: true },
        { key: "name", title: "Name", type: "text" },
        {
          key: "url",
          title: "URL",
          type: "text",
          renderer: (value: string) =>
            value
              ? `<a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>`
              : "",
        },
        {
          key: "type",
          title: "Type",
          type: "select",
          data: "Quick Link;Popular Link",
          dataValue: "quick;popular",
        },
      ];
      table.data = linksData;
      table.onAdd = async (p: LinkItem) => {
        try {
          const quickLinks = linksData
            .filter((l) => l.type === "quick")
            .map((l) => ({ name: l.name, url: l.url }));
          const popularLinks = linksData
            .filter((l) => l.type === "popular")
            .map((l) => ({ name: l.name, url: l.url }));
          if (p.type === "quick") {
            quickLinks.push({ name: p.name, url: p.url });
          } else {
            popularLinks.push({ name: p.name, url: p.url });
          }
          await DataQuickPopularLinks.upsert("quick", quickLinks);
          await DataQuickPopularLinks.upsert("popular", popularLinks);
          toast?.success?.("Link added");
          return { ...p };
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onEdit = async (
        p: LinkItem,
        _prev: LinkItem,
        _rowIndex: number,
      ) => {
        try {
          const quickLinks = linksData
            .filter((l) => l.type === "quick")
            .map((l) => ({ name: l.name, url: l.url }));
          const popularLinks = linksData
            .filter((l) => l.type === "popular")
            .map((l) => ({ name: l.name, url: l.url }));
          const updatedQuick =
            _prev.type === "quick"
              ? quickLinks.map((l) =>
                  l.name === _prev.name && l.url === _prev.url
                    ? { name: p.name, url: p.url }
                    : l,
                )
              : quickLinks;
          const updatedPopular =
            _prev.type === "popular"
              ? popularLinks.map((l) =>
                  l.name === _prev.name && l.url === _prev.url
                    ? { name: p.name, url: p.url }
                    : l,
                )
              : popularLinks;
          await DataQuickPopularLinks.upsert("quick", updatedQuick);
          await DataQuickPopularLinks.upsert("popular", updatedPopular);
          toast?.success?.("Link updated");
          return p;
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
      table.onDelete = async (row: LinkItem, _rowIndex: number) => {
        try {
          const quickLinks = linksData
            .filter(
              (l) =>
                l.type === "quick" &&
                !(l.name === row.name && l.url === row.url),
            )
            .map((l) => ({ name: l.name, url: l.url }));
          const popularLinks = linksData
            .filter(
              (l) =>
                l.type === "popular" &&
                !(l.name === row.name && l.url === row.url),
            )
            .map((l) => ({ name: l.name, url: l.url }));
          await DataQuickPopularLinks.upsert("quick", quickLinks);
          await DataQuickPopularLinks.upsert("popular", popularLinks);
          toast?.success?.("Link deleted");
          return true;
        } catch (e: unknown) {
          toast?.error?.(e instanceof Error ? e.message : String(e));
          return false;
        }
      };
    };

    setupKeunggulan();
    setupMenus();
    setupLinks();
  }, [loading, keunggulanData, menusData, linksData, pagesData]);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Settings"]}
        sidebar={adminSidebar}
        activePath="/admin/settings"
      >
        <p>Loading settings...</p>
      </AdminLayout>
    );
  }

  function resetDatabase() {
    alertModal(
      "Reset Database",
      "Ini akan menghapus semua settings, pages, post dan pengaturan. Semua akan kembali menjadi default, yakin mau melanjutkan ?",
      async () => {
        alertModal(
          "Peringatan Terakhir",
          "Ini adalah peringatan terakhir, tidak ada lagi peringatan setelah ini. Semua data akan hilang dan tidak bisa dikembalikan lagi. Lanjut ?",
          async () => {
            toast.loading("Menghapus Semua Database ...");
            try {
              const tenantID = getTenantId();
              const defaults = defaultSettings(tenantID);

              const allEvents = await DataEvents.all();
              for (const e of allEvents) await DataEvents.delete(e.id);

              const allPages = await DataPages.all();
              for (const p of allPages) await DataPages.delete(p.id);

              const allPosts = await DataPosts.all();
              for (const p of allPosts) await DataPosts.delete(p.id);

              const allSchoolSettings = await DataSchoolSettings.all();
              for (const s of allSchoolSettings)
                await DataSchoolSettings.delete(s.id);

              const allMenus = await DataMenus.all();
              for (const m of allMenus) await DataMenus.delete(m.id);

              const allKeunggulan = await DataKeunggulan.all();
              for (const k of allKeunggulan) await DataKeunggulan.delete(k.id);

              const allTeachers = await DataTeachers.all();
              for (const t of allTeachers) await DataTeachers.delete(t.id);

              const allSliderItems = await DataSliderItems.all();
              for (const s of allSliderItems)
                await DataSliderItems.delete(s.id);

              const allQuickPopularLinks = await DataQuickPopularLinks.all();
              for (const l of allQuickPopularLinks)
                await DataQuickPopularLinks.delete(l.id);

              const allGallery = await DataGallery.all();
              for (const g of allGallery) await DataGallery.delete(g.id);

              const visiMisiRecords = await DataVisiMisi.read();
              for (const v of visiMisiRecords) {
                await pb.collection(Collections.VisiMisi).delete(v.id);
              }

              toast.loading("Memasukkan Data Default ...");

              for (const item of defaults.school_settings) {
                await DataSchoolSettings.create(item);
              }
              for (const item of defaults.menus) {
                await DataMenus.create(item);
              }
              for (const item of defaults.visi_misi) {
                await DataVisiMisi.upsert({
                  Visi: item.item.Visi,
                  Misi: item.item.Misi,
                });
              }
              for (const item of defaults.keunggulan) {
                await DataKeunggulan.create(item);
              }
              for (const item of defaults.teachers) {
                await DataTeachers.create(item);
              }
              for (const item of defaults.posts) {
                await DataPosts.create(item);
              }
              for (const item of defaults.events) {
                await DataEvents.create(item);
              }
              for (const item of defaults.gallery) {
                await DataGallery.create(item);
              }
              for (const item of defaults.slider_items) {
                await DataSliderItems.create(item);
              }
              for (const item of defaults.quick_popular_links) {
                await DataQuickPopularLinks.create(item);
              }
              for (const item of defaults.pages) {
                await DataPages.create(item);
              }

              toast.dismiss();
              toast.success(
                "Database berhasil direset, silahkan refresh halaman ini.",
              );
            } catch (e) {
              toast.dismiss();
              toast.error("Gagal mereset database: " + (e as Error).message);
            }
          },
          {
            confirmText: "YA, Hapus Saja",
          },
        );
      },
      {
        confirmText: "YA, RESET DATABASE",
      },
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Settings"]}
      sidebar={adminSidebar}
      activePath="/admin/settings"
    >
      <h1>Settings</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Manage your website content and configuration</div>
        <div>
          <button className="btn btn-danger" onClick={resetDatabase}>
            <i-c icon="delete"></i-c> RESET DATABASE
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>School Settings</h3>
        {schoolSettings ? (
          <div>
            <div style={{ margin: "2rem 0" }}>
              <cs-input
                id="ss-nama_sekolah"
                type="text"
                label="Nama Sekolah"
              ></cs-input>
            </div>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "1fr 1fr",
                marginTop: "1rem",
              }}
            >
              <cs-input id="ss-alamat" type="text" label="Alamat"></cs-input>
              <cs-input
                id="ss-telepon"
                type="text"
                label="No. Telepon"
              ></cs-input>
              <cs-input id="ss-email" type="text" label="Email"></cs-input>
              <cs-input
                id="ss-jam_kerja"
                type="text"
                label="Jam Operasional"
              ></cs-input>
              <cs-input
                id="ss-title"
                type="text"
                label="Judul Website"
              ></cs-input>
              <div></div>
              <div style={{ maxWidth: 400 }}>
                <cs-upload id="ss-logo" label="Logo URL"></cs-upload>
              </div>
              <div style={{ maxWidth: 400 }}>
                <cs-upload
                  id="ss-about_image"
                  label="About Image URL"
                ></cs-upload>
              </div>
              <div style={{ maxWidth: 400 }}>
                <cs-upload
                  id="ss-home_background"
                  label="Home Background URL"
                ></cs-upload>
              </div>
              <cs-rtf id="ss-sekilas_info" label="Sekilas Info"></cs-rtf>
              <cs-rtf
                id="ss-tentang_kepsek"
                label="Sambutan Kepala Sekolah"
              ></cs-rtf>
              <cs-rtf id="ss-popup" label="Popup Homepage"></cs-rtf>
              <cs-input
                id="ss-facebook"
                type="text"
                label="Facebook URL"
              ></cs-input>
              <cs-input
                id="ss-instagram"
                type="text"
                label="Instagram URL"
              ></cs-input>
              <cs-input
                id="ss-twitter"
                type="text"
                label="Twitter URL"
              ></cs-input>
              <cs-input
                id="ss-youtube"
                type="text"
                label="YouTube URL"
              ></cs-input>
              <cs-input id="ss-video" type="text" label="Video URL"></cs-input>
              <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    background: "#18181b",
                    color: "#fafafa",
                    cursor: savingSettings ? "not-allowed" : "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    opacity: savingSettings ? 0.7 : 1,
                  }}
                >
                  {savingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p
            style={{
              color: "#71717a",
              marginTop: "1rem",
            }}
          >
            No school settings configured.
          </p>
        )}
      </div>

      <div className="settings-section">
        <h3>Keunggulan (Advantages)</h3>
        <cs-data-table
          id="keunggulan-table"
          title="Keunggulan"
          page-size="10"
        ></cs-data-table>
      </div>

      <div className="settings-section">
        <h3>Menus</h3>
        <cs-data-table
          id="menus-table"
          title="Navigation Menus"
          page-size="10"
          sortable="true"
          sortable-col-id="order"
        ></cs-data-table>
      </div>

      <div className="settings-section">
        <h3>Quick & Popular Links</h3>
        <cs-data-table
          id="links-table"
          title="Links"
          page-size="10"
        ></cs-data-table>
      </div>

      <div className="settings-section">
        <h3>Visi & Misi</h3>
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Visi
            </label>
            <textarea
              id="vm-visi"
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              style={{
                width: "100%",
                minHeight: 80,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #d4d4d8",
                fontSize: "0.875rem",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Misi (one item per line)
            </label>
            <textarea
              id="vm-misi"
              defaultValue={misi.join("\n")}
              style={{
                width: "100%",
                minHeight: 200,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #d4d4d8",
                fontSize: "0.875rem",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleSaveVisiMisi}
              disabled={savingVisi}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "#18181b",
                color: "#fafafa",
                cursor: savingVisi ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                opacity: savingVisi ? 0.7 : 1,
              }}
            >
              {savingVisi ? "Saving..." : "Save Visi & Misi"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

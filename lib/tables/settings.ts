import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections } from "../pocketbase-types";

export type Settings = SiteSettings;

export interface SiteSettings {
  InfoSekolah: {
    Title: string;
    Logo: string;
    Gambar: string;
    Gambar2: string;
    Nama: string;
    SekilasInfo: string;
    Telepon: string;
    Email: string;
    Alamat: string;
    JamKerja: string;
    Facebook: string;
    Twitter: string;
    Instagram: string;
    Youtube: string;
  };
  Slider: Array<{ image: string; text: string }>;
  Keunggulan: Array<{ icon: string; judul: string; deskripsi: string }>;
  Guru: Array<{
    Nama: string;
    Foto: string;
    Mapel: string;
    Facebook: string;
    Twitter: string;
    Instagram: string;
  }>;
  Sambutan: string;
  Menu: Record<string, any>;
  QuickLinks: Record<string, string>;
  PopularLinks: Record<string, string>;
  HomeBackground: string;
  Popup: string;
  About: { image: string; video: string };
  Events: Array<{
    image: string;
    text: string;
    content: string;
    title: string;
  }>;
  VisiMisi: { image: string; Visi: string; Misi: string[] };
  Gallery: Array<{ title: string; description: string; image: string }>;
}

const defaults: SiteSettings = {
  InfoSekolah: {
    Title: "Website Resmi",
    Logo: "",
    Gambar: "",
    Gambar2: "",
    Nama: "Sekolah Kita",
    SekilasInfo: "",
    Telepon: "",
    Email: "",
    Alamat: "",
    JamKerja: "",
    Facebook: "",
    Twitter: "",
    Instagram: "",
    Youtube: "",
  },
  Slider: [],
  Keunggulan: [],
  Guru: [],
  Sambutan: "",
  Menu: {},
  QuickLinks: {},
  PopularLinks: {},
  HomeBackground: "",
  Popup: "",
  About: { image: "", video: "" },
  Events: [],
  VisiMisi: { image: "", Visi: "", Misi: [] },
  Gallery: [],
};

export const DataSettings = {
  /** Load all site settings from Pocketbase collections */
  loadAll: async (): Promise<SiteSettings> => {
    const s: SiteSettings = JSON.parse(JSON.stringify(defaults));

    // 1. School settings
    try {
      const records = await pb
        .collection(Collections.SchoolSettings)
        .getFullList({
          filter: TENANT_FILTER,
        });
      if (records.length > 0) {
        const r = records[0] as any;
        s.InfoSekolah.Nama = r.nama_sekolah || s.InfoSekolah.Nama;
        s.InfoSekolah.Telepon = r.telepon || "";
        s.InfoSekolah.Email = r.email || "";
        s.InfoSekolah.Alamat = r.alamat || "";
        s.InfoSekolah.JamKerja = r.jam_kerja || "";
        s.InfoSekolah.SekilasInfo = r.sekilas_info || "";
        s.InfoSekolah.Facebook = r.facebook || "";
        s.InfoSekolah.Twitter = r.twitter || "";
        s.InfoSekolah.Instagram = r.instagram || "";
        s.InfoSekolah.Youtube = r.youtube || "";
        s.InfoSekolah.Logo = r.logo || "";
        s.InfoSekolah.Gambar = r.about_image || r.home_background || "";
        s.InfoSekolah.Gambar2 = r.logo || "";
        s.About.image = r.about_image || r.home_background || "";
        s.Sambutan = r.tentang_kepsek || "";
        s.HomeBackground = r.home_background || "";
        s.Popup = r.popup || "";
        s.About.video = r.video || "";
        s.InfoSekolah.Title = r.title || `Website Resmi ${s.InfoSekolah.Nama}`;
      }
    } catch {}

    // 2. Tenant user for avatar/name
    try {
      const user = await pb.collection(Collections.Users).getOne(getTenantId());
      const u = user as any;
      s.InfoSekolah.Title = u.name
        ? `Website Resmi ${u.name}`
        : s.InfoSekolah.Title;
    } catch {}

    // 3. SliderItems
    try {
      const records = await pb.collection(Collections.SliderItems).getFullList({
        filter: TENANT_FILTER,
      });
      if (records.length > 0 && records[0].items) {
        s.Slider = records[0].items as any[];
      }
    } catch {}

    // 4. Keunggulan
    try {
      const items = await pb.collection(Collections.Keunggulan).getFullList({
        filter: TENANT_FILTER,
      });
      s.Keunggulan = (items as any[]).map((r) => ({
        icon: r.icon || "",
        judul: r.judul || "",
        deskripsi: r.deskripsi || "",
      }));
    } catch {}

    // 5. Teachers
    try {
      const items = await pb.collection(Collections.Teachers).getFullList({
        filter: TENANT_FILTER,
      });
      s.Guru = (items as any[]).map((r) => ({
        Nama: r.nama || "",
        Foto: r.foto || "",
        Mapel: r.mapel || "",
        Facebook: r.facebook || "",
        Twitter: r.twitter || "",
        Instagram: r.instagram || "",
      }));
    } catch {}

    // 6. Menus
    try {
      const items = (await pb.collection(Collections.Menus).getFullList({
        filter: TENANT_FILTER,
        sort: "order",
      })) as any[];

      // First pass: identify which items are parents (have children)
      // Exclude self-referencing parents (data integrity safeguard)
      const parentIds = new Set<string>();
      for (const r of items) {
        if (r.parent && r.parent !== r.id) parentIds.add(r.parent);
      }

      const menuMap: Record<string, any> = {};
      for (const r of items) {
        let url = r.url;

        // Skip self-referencing parents — treat as top-level instead
        const effectiveParent = r.parent && r.parent !== r.id ? r.parent : "";

        if (effectiveParent) {
          // This is a child item — find its parent
          const parentName =
            items.find((p: any) => p.id === effectiveParent)?.name || "Unknown";
          // If parent is currently a string (has its own URL), convert to object
          if (typeof menuMap[parentName] === "string") {
            menuMap[parentName] = { _url: menuMap[parentName] };
          }
          if (!menuMap[parentName]) menuMap[parentName] = {};
          menuMap[parentName][r.name] = url;
        } else {
          // Top-level item
          if (parentIds.has(r.id)) {
            // This item has children — store as object (URL stored in _url)
            menuMap[r.name] = { _url: url };
          } else {
            menuMap[r.name] = url;
          }
        }
      }
      s.Menu = menuMap;
    } catch (e) {
      console.error("[DataSettings] Error loading menus:", e);
    }

    // 7. Quick & Popular Links
    try {
      const records = (await pb
        .collection(Collections.QuickPopularLinks)
        .getFullList({
          filter: TENANT_FILTER,
        })) as any[];
      for (const r of records) {
        if (r.item && Array.isArray(r.item)) {
          for (const link of r.item) {
            if (r.type === "quick")
              s.QuickLinks[link.name || ""] = link.url || "";
            else if (r.type === "popular")
              s.PopularLinks[link.name || ""] = link.url || "";
          }
        }
      }
    } catch {}

    // 8. Events
    try {
      const items = await pb.collection(Collections.Events).getFullList({
        filter: TENANT_FILTER,
      });
      s.Events = items.map((r) => ({
        image: r.image || "",
        text: r.text || "",
        content: r.content || "",
        title: r.title || "",
      }));
    } catch {}

    // 9. Gallery
    try {
      const items = await pb.collection(Collections.Gallery).getList(1, 10, {
        filter: TENANT_FILTER,
        sort: "-created",
      });
      s.Gallery = items.items.map((r) => ({
        title: r.title || "",
        description: r.description || "",
        image: r.image || "",
      }));
    } catch {}

    // 10. VisiMisi
    try {
      const records = await pb
        .collection(Collections.VisiMisi)
        .getFullList({ filter: TENANT_FILTER });
      if (records.length > 0) {
        const item = (records[0] as any).item;
        if (item) {
          s.VisiMisi.Visi = item.Visi || "";
          s.VisiMisi.Misi = Array.isArray(item.Misi) ? item.Misi : [];
        }
      }
    } catch {}

    return s;
  },
};

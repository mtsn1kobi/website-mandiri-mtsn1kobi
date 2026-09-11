import PocketBase from "pocketbase";

const PB_URL = "https://sekolah-backend.sg2.app.web.id";
const ADMIN_EMAIL = "yokowasis@gmail.com";
const ADMIN_PASSWORD = "6BS5qXPxRH8eZf";
const TENANT_ID = "fgz40kx67pgjdkj";

const pb = new PocketBase(PB_URL);

const IMG = (
  text: string,
  w = 800,
  h = 600,
  bg = "4A90D9",
  fg = "FFFFFF"
): string =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

interface PageSeed {
  slug: string;
  title: string;
  content: string;
}

interface MenuChild {
  name: string;
  slug: string;
}

interface SliderItem {
  image: string;
  text: string;
}

interface KeunggulanSeed {
  icon: string;
  judul: string;
  deskripsi: string;
}

interface TeacherSeed {
  nama: string;
  foto: string;
  mapel: string;
}

interface EventSeed {
  title: string;
  text: string;
  content: string;
  image: string;
}

interface GallerySeed {
  title: string;
  description: string;
  image: string;
}

interface PostSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  date: string;
}

async function clearCollection(name: string, tenantId: string): Promise<void> {
  try {
    const existing = await pb.collection(name).getFullList({
      filter: `tenant="${tenantId}"`,
    });
    for (const r of existing) {
      await pb.collection(name).delete(r.id);
    }
    if (existing.length > 0)
      console.log(`  Cleared ${existing.length} records from ${name}`);
  } catch (e: any) {
    console.log(`  Warning: Could not clear ${name}:`, e.message);
  }
}

async function seed() {
  console.log("Authenticating as admin...");
  await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log("Admin authenticated.");

  console.log("\n=== Checking tenant user ===");
  const tenantUser: any = await pb.collection("users").getOne(TENANT_ID);
  console.log(
    "Tenant user found:",
    tenantUser.id,
    tenantUser.name || tenantUser.email
  );

  const tid = tenantUser.id;

  // ==========================================
  // 1. SCHOOL SETTINGS
  // ==========================================
  console.log("\n=== Seeding school_settings ===");
  await clearCollection("school_settings", tid);

  await pb.collection("school_settings").create({
    tenant: tid,
    nama_sekolah: "SMA Negeri 72 Jakarta",
    title: "Website Resmi SMA Negeri 72 Jakarta",
    alamat: "Jl. Komplek Kodam, Rt.13/Rw.02, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, DKI Jakarta 13560",
    telepon: "(021) 8401043",
    email: "info@sman72jakarta.sch.id",
    jam_kerja: "Senin - Jumat: 07.00 - 15.00 | Sabtu: 07.00 - 12.00",
    sekilas_info:
      "SMA Negeri 72 Jakarta adalah sekolah menengah atas negeri yang berlokasi di Jakarta Timur. Didirikan dengan komitmen untuk menghasilkan lulusan yang berakhlak mulia, berprestasi, dan siap menghadapi tantangan global.",
    tentang_kepsek:
      "Assalamualaikum Wr. Wb. Puji syukur kita panjatkan kehadirat Allah SWT atas limpahan rahmat dan karunia-Nya. Selamat datang di website resmi SMA Negeri 72 Jakarta. Website ini merupakan media informasi dan komunikasi antara sekolah dengan masyarakat luas. Wassalamualaikum Wr. Wb.",
    logo: IMG("Logo+SMAN+72", 200, 200, "1E3A5F", "FFFFFF"),
    about_image: IMG("About+SMAN+72", 800, 500, "2E86C1", "FFFFFF"),
    home_background: IMG("SMAN+72+Jakarta", 1920, 800, "1B4F72", "FFFFFF"),
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    popup:
      "<h3>Selamat Datang!</h3><p>Selamat datang di website resmi SMA Negeri 72 Jakarta.</p>",
    facebook: "https://facebook.com/sman72jakarta",
    twitter: "https://twitter.com/sman72jakarta",
    instagram: "https://instagram.com/sman72jakarta",
    youtube: "https://youtube.com/@sman72jakarta",
  });
  console.log("school_settings done.");

  // ==========================================
  // 2. PAGES
  // ==========================================
  console.log("\n=== Seeding pages ===");
  await clearCollection("pages", tid);

  const pages: PageSeed[] = [
    {
      slug: "profil-sekolah",
      title: "Profil Sekolah",
      content: `
<h2>Profil SMA Negeri 72 Jakarta</h2>
<p>SMA Negeri 72 Jakarta merupakan salah satu sekolah menengah atas negeri yang berada di wilayah Jakarta Timur, DKI Jakarta.</p>

<h3>Identitas Sekolah</h3>
<table>
<tr><td><strong>Nama Sekolah</strong></td><td>SMA Negeri 72 Jakarta</td></tr>
<tr><td><strong>NPSN</strong></td><td>20103469</td></tr>
<tr><td><strong>Status</strong></td><td>Negeri</td></tr>
<tr><td><strong>Alamat</strong></td><td>Jl. Komplek Kodam, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, DKI Jakarta 13560</td></tr>
<tr><td><strong>Telepon</strong></td><td>(021) 8401043</td></tr>
</table>

<h3>Akreditasi</h3>
<p>SMA Negeri 72 Jakarta terakreditasi <strong>A</strong> oleh BAN-S/M.</p>

<img src="${IMG("Profil+Sekolah", 800, 400, "5DADE2", "FFFFFF")}" alt="Profil Sekolah" style="width:100%; max-width:800px;" />
`,
    },
    {
      slug: "visi-dan-misi",
      title: "Visi dan Misi",
      content: `
<h2>Visi dan Misi SMA Negeri 72 Jakarta</h2>

<h3>Visi</h3>
<p>"Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Berakhlak Mulia, Berprestasi, Berwawasan Global, dan Berbudaya Lingkungan"</p>

<h3>Misi</h3>
<ol>
<li>Meningkatkan keimanan dan ketaqwaan melalui pembelajaran agama</li>
<li>Menciptakan lingkungan sekolah yang bersih, hijau, sehat, dan kondusif</li>
<li>Mengembangkan potensi akademik dan non-akademik peserta didik secara optimal</li>
<li>Menerapkan pembelajaran berbasis teknologi informasi dan komunikasi</li>
<li>Meningkatkan kompetensi guru dan tenaga kependidikan secara berkelanjutan</li>
<li>Membangun kerjasama yang harmonis dengan orang tua dan masyarakat</li>
<li>Mewujudkan sekolah yang berwawasan lingkungan hidup (Adiwiyata)</li>
</ol>

<img src="${IMG("Visi+Misi", 800, 400, "58D68D", "FFFFFF")}" alt="Visi Misi" style="width:100%; max-width:800px;" />
`,
    },
    {
      slug: "sambutan",
      title: "Sambutan Kepala Sekolah",
      content: `
<h2>Sambutan Kepala SMA Negeri 72 Jakarta</h2>

<p>Assalamualaikum Warahmatullahi Wabarakatuh,</p>

<p>Puji syukur kepada Allah SWT atas segala rahmat dan karunia-Nya sehingga website resmi SMA Negeri 72 Jakarta dapat hadir sebagai sarana informasi dan komunikasi.</p>

<p>SMA Negeri 72 Jakarta berkomitmen untuk terus meningkatkan kualitas pendidikan demi menghasilkan lulusan yang unggul secara akademik dan memiliki karakter yang kuat.</p>

<p>Kami menyadari bahwa pendidikan membutuhkan sinergi antara sekolah, orang tua, dan masyarakat. Kami membuka pintu bagi semua pihak yang ingin berkolaborasi.</p>

<p>Terima kasih atas perhatian dan dukungan semua pihak.</p>

<p>Wassalamualaikum Warahmatullahi Wabarakatuh.</p>

<p><strong>Kepala SMA Negeri 72 Jakarta</strong></p>

<img src="${IMG("Kepala+Sekolah", 400, 500, "AF7AC5", "FFFFFF")}" alt="Kepala Sekolah" style="width:300px;" />
`,
    },
    {
      slug: "guru-dan-tendik",
      title: "Guru dan Tenaga Kependidikan",
      content: `
<h2>Guru dan Tenaga Kependidikan</h2>
<p>SMA Negeri 72 Jakarta didukung oleh tenaga pendidik dan kependidikan yang profesional dan berpengalaman.</p>

<img src="${IMG("Guru+dan+Tendik", 800, 400, "F39C12", "FFFFFF")}" alt="Guru dan Tendik" style="width:100%; max-width:800px;" />

<h3>Tenaga Pendidik (Guru)</h3>
<p>Guru-guru kami merupakan lulusan dari perguruan tinggi terbaik dan terus mengembangkan kompetensi.</p>

<h3>Tenaga Kependidikan</h3>
<p>Staf tata usaha, laboran, pustakawan, dan tenaga pendukung lainnya bekerja secara profesional.</p>
`,
    },
    {
      slug: "fasilitas",
      title: "Fasilitas Sekolah",
      content: `
<h2>Sarana dan Prasarana</h2>
<p>SMA Negeri 72 Jakarta dilengkapi dengan berbagai fasilitas modern.</p>

<h3>Ruang Kelas</h3>
<p>Seluruh ruang kelas dilengkapi dengan AC, LCD projector, dan koneksi internet.</p>
<img src="${IMG("Ruang+Kelas", 800, 400, "3498DB", "FFFFFF")}" alt="Ruang Kelas" style="width:100%; max-width:800px;" />

<h3>Laboratorium</h3>
<ul>
<li>Laboratorium IPA (Fisika, Kimia, Biologi)</li>
<li>Laboratorium Komputer</li>
<li>Laboratorium Bahasa</li>
</ul>
<img src="${IMG("Laboratorium", 800, 400, "E74C3C", "FFFFFF")}" alt="Laboratorium" style="width:100%; max-width:800px;" />

<h3>Perpustakaan</h3>
<p>Perpustakaan dengan koleksi ribuan buku dan akses ke perpustakaan digital.</p>
<img src="${IMG("Perpustakaan", 800, 400, "27AE60", "FFFFFF")}" alt="Perpustakaan" style="width:100%; max-width:800px;" />

<h3>Fasilitas Olahraga</h3>
<ul>
<li>Lapangan Basket, Futsal, Voli</li>
<li>Area Atletik</li>
</ul>
<img src="${IMG("Lapangan+Olahraga", 800, 400, "F1C40F", "333333")}" alt="Lapangan" style="width:100%; max-width:800px;" />

<h3>Masjid</h3>
<p>Masjid sekolah yang luas dan nyaman untuk kegiatan ibadah.</p>
<img src="${IMG("Masjid", 800, 400, "8E44AD", "FFFFFF")}" alt="Masjid" style="width:100%; max-width:800px;" />
`,
    },
    {
      slug: "adiwiyata",
      title: "Program Adiwiyata",
      content: `
<h2>Program Adiwiyata</h2>
<p>SMA Negeri 72 Jakarta berkomitmen menjadi sekolah berwawasan lingkungan melalui program Adiwiyata.</p>
<img src="${IMG("Adiwiyata", 800, 400, "27AE60", "FFFFFF")}" alt="Adiwiyata" style="width:100%; max-width:800px;" />

<h3>Kegiatan Adiwiyata</h3>
<ul>
<li><strong>Penghijauan:</strong> Penanaman dan perawatan tanaman</li>
<li><strong>Pengelolaan Sampah:</strong> Program pemilahan sampah organik dan anorganik</li>
<li><strong>Bank Sampah:</strong> Mengelola sampah menjadi bernilai ekonomis</li>
<li><strong>Edukasi Lingkungan:</strong> Integrasi materi lingkungan dalam pembelajaran</li>
<li><strong>Hemat Energi:</strong> Kampanye penghematan listrik dan air</li>
</ul>

<h3>Prestasi Adiwiyata</h3>
<p>SMA Negeri 72 Jakarta telah meraih penghargaan sebagai Sekolah Adiwiyata tingkat Kota.</p>
`,
    },
    {
      slug: "ekstrakurikuler",
      title: "Ekstrakurikuler",
      content: `
<h2>Ekstrakurikuler</h2>
<p>Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa.</p>
<img src="${IMG("Ekstrakurikuler", 800, 400, "E74C3C", "FFFFFF")}" alt="Ekstrakurikuler" style="width:100%; max-width:800px;" />

<h3>Olahraga</h3>
<ul><li>Basket, Futsal, Voli, Badminton, Pencak Silat, Karate</li></ul>

<h3>Seni &amp; Budaya</h3>
<ul><li>Tari, Paduan Suara, Teater, Musik, Seni Rupa</li></ul>

<h3>Ilmu Pengetahuan &amp; Teknologi</h3>
<ul><li>Olimpiade Sains, Robotika, Coding, Jurnalistik</li></ul>

<h3>Keagamaan &amp; Sosial</h3>
<ul><li>Rohis, PMR, Pramuka, Paskibra</li></ul>
`,
    },
    {
      slug: "pengumuman",
      title: "Pengumuman",
      content: `
<h2>Pengumuman</h2>
<p>Halaman ini berisi pengumuman-pengumuman penting dari SMA Negeri 72 Jakarta.</p>
<img src="${IMG("Pengumuman", 800, 400, "E67E22", "FFFFFF")}" alt="Pengumuman" style="width:100%; max-width:800px;" />

<h3>Pengumuman Terbaru</h3>
<ul>
<li>Pengumuman PPDB Tahun Ajaran 2026/2027</li>
<li>Jadwal Ujian Akhir Semester Genap 2025/2026</li>
<li>Pengumuman Kelulusan Tahun Ajaran 2025/2026</li>
</ul>
`,
    },
    {
      slug: "prestasi",
      title: "Prestasi Siswa",
      content: `
<h2>Prestasi Siswa SMA Negeri 72 Jakarta</h2>
<p>Siswa-siswi kami telah meraih berbagai prestasi membanggakan.</p>
<img src="${IMG("Prestasi", 800, 400, "F1C40F", "333333")}" alt="Prestasi" style="width:100%; max-width:800px;" />

<h3>Tingkat Nasional</h3>
<ul>
<li>Juara 2 Olimpiade Sains Nasional (OSN) Bidang Fisika 2025</li>
<li>Finalis Lomba Karya Ilmiah Remaja Nasional 2025</li>
</ul>

<h3>Tingkat Provinsi DKI Jakarta</h3>
<ul>
<li>Juara 1 Lomba Debat Bahasa Inggris Tingkat Provinsi 2025</li>
<li>Juara 3 Kompetisi Robotika DKI Jakarta 2025</li>
<li>Juara 1 Lomba Paduan Suara FLS2N Tingkat Provinsi 2025</li>
</ul>

<h3>Tingkat Kota Jakarta Timur</h3>
<ul>
<li>Juara 1 Basket Putra Turnamen Antar SMA Se-Jakarta Timur 2025</li>
<li>Juara 2 Lomba Cerdas Cermat Tingkat Kota 2025</li>
</ul>
`,
    },
    {
      slug: "kelulusan",
      title: "Informasi Kelulusan",
      content: `
<h2>Informasi Kelulusan</h2>
<p>Informasi terkait kelulusan siswa SMA Negeri 72 Jakarta.</p>
<img src="${IMG("Kelulusan", 800, 400, "2ECC71", "FFFFFF")}" alt="Kelulusan" style="width:100%; max-width:800px;" />

<h3>Persyaratan Kelulusan</h3>
<ul>
<li>Menyelesaikan seluruh program pembelajaran</li>
<li>Memperoleh nilai minimal baik pada penilaian akhir</li>
<li>Lulus Ujian Sekolah</li>
<li>Tidak memiliki pelanggaran berat</li>
</ul>

<h3>Statistik Kelulusan</h3>
<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Tahun</th><th>Jumlah Siswa</th><th>Lulus</th><th>Persentase</th></tr>
<tr><td>2024/2025</td><td>324</td><td>324</td><td>100%</td></tr>
<tr><td>2023/2024</td><td>318</td><td>317</td><td>99.7%</td></tr>
<tr><td>2022/2023</td><td>310</td><td>310</td><td>100%</td></tr>
</table>
`,
    },
    {
      slug: "e-rapor",
      title: "E-Rapor",
      content: `
<h2>E-Rapor SMA Negeri 72 Jakarta</h2>
<p>Akses sistem E-Rapor untuk siswa, orang tua, dan guru.</p>
<img src="${IMG("E-Rapor", 800, 400, "3498DB", "FFFFFF")}" alt="E-Rapor" style="width:100%; max-width:800px;" />

<h3>Akses E-Rapor</h3>
<p>Sistem E-Rapor dapat diakses melalui tautan berikut:</p>
<p><a href="https://erapor.sman72jakarta.sch.id" target="_blank">Akses E-Rapor</a></p>

<h3>Bantuan</h3>
<p>Jika mengalami kesulitan, silakan hubungi bagian IT Sekolah: it@sman72jakarta.sch.id</p>
`,
    },
    {
      slug: "ikatan-alumni",
      title: "Ikatan Alumni",
      content: `
<h2>Ikatan Alumni SMA Negeri 72 Jakarta</h2>
<p>Wadah silaturahmi dan networking bagi seluruh alumni.</p>
<img src="${IMG("Ikatan+Alumni", 800, 400, "9B59B6", "FFFFFF")}" alt="Ikatan Alumni" style="width:100%; max-width:800px;" />

<h3>Kegiatan Alumni</h3>
<ul>
<li><strong>Reuni Akbar:</strong> Diadakan setiap 5 tahun sekali</li>
<li><strong>Sharing Session:</strong> Alumni berbagi pengalaman karir</li>
<li><strong>Beasiswa:</strong> Program beasiswa dari alumni untuk siswa berprestasi</li>
<li><strong>Mentoring:</strong> Program bimbingan karir dan studi lanjutan</li>
</ul>

<h3>Bergabung</h3>
<p>Hubungi: alumni@sman72jakarta.sch.id | Instagram: @ikatanalumnisman72</p>
`,
    },
    {
      slug: "kegiatan-sekolah",
      title: "Gallery Kegiatan Sekolah",
      content: `
<h2>Gallery Kegiatan Sekolah</h2>
<p>Dokumentasi berbagai kegiatan dan acara di SMA Negeri 72 Jakarta.</p>

<img src="${IMG("Upacara+Bendera", 600, 400, "E74C3C", "FFFFFF")}" alt="Upacara" style="width:45%; margin:5px;" />
<img src="${IMG("Class+Meeting", 600, 400, "3498DB", "FFFFFF")}" alt="Class Meeting" style="width:45%; margin:5px;" />
<img src="${IMG("Pentas+Seni", 600, 400, "F39C12", "FFFFFF")}" alt="Pentas Seni" style="width:45%; margin:5px;" />
<img src="${IMG("Study+Tour", 600, 400, "27AE60", "FFFFFF")}" alt="Study Tour" style="width:45%; margin:5px;" />
<img src="${IMG("Perkemahan", 600, 400, "9B59B6", "FFFFFF")}" alt="Perkemahan" style="width:45%; margin:5px;" />
<img src="${IMG("Workshop", 600, 400, "1ABC9C", "FFFFFF")}" alt="Workshop" style="width:45%; margin:5px;" />
`,
    },
  ];

  for (const p of pages) {
    await pb.collection("pages").create({ tenant: tid, ...p });
    console.log(`  Page: ${p.slug}`);
  }
  console.log("Pages done.");

  // ==========================================
  // 3. VISI MISI
  // ==========================================
  console.log("\n=== Seeding visi_misi ===");
  await clearCollection("visi_misi", tid);

  try {
    await pb.collection("visi_misi").create({
      tenant: tid,
      type: "visi",
      item: {
        Visi:
          "Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Berakhlak Mulia, Berprestasi, Berwawasan Global, dan Berbudaya Lingkungan",
        Misi: [
          "Meningkatkan keimanan dan ketaqwaan melalui pembelajaran agama",
          "Menciptakan lingkungan sekolah yang bersih, hijau, sehat, dan kondusif",
          "Mengembangkan potensi akademik dan non-akademik peserta didik secara optimal",
          "Menerapkan pembelajaran berbasis teknologi informasi dan komunikasi",
          "Meningkatkan kompetensi guru dan tenaga kependidikan secara berkelanjutan",
          "Membangun kerjasama yang harmonis dengan orang tua dan masyarakat",
          "Mewujudkan sekolah yang berwawasan lingkungan hidup (Adiwiyata)",
        ],
      },
    });
    console.log("  Visi Misi created");
  } catch (e: any) {
    console.log(
      "  Visi Misi error:",
      e.response?.data?.tenant?.message || e.message
    );
  }
  console.log("Visi Misi done.");

  // ==========================================
  // 4. MENUS
  // ==========================================
  console.log("\n=== Seeding menus ===");
  await clearCollection("menus", tid);

  const homeMenu: any = await pb.collection("menus").create({
    tenant: tid,
    name: "Home",
    url: "/",
    parent: "",
  });
  const profileMenu: any = await pb.collection("menus").create({
    tenant: tid,
    name: "Profile",
    url: "",
    parent: "",
  });
  const saranaMenu: any = await pb.collection("menus").create({
    tenant: tid,
    name: "Sarana dan Prasarana",
    url: "",
    parent: "",
  });
  const informasiMenu: any = await pb.collection("menus").create({
    tenant: tid,
    name: "Informasi",
    url: "",
    parent: "",
  });
  const galleryMenu: any = await pb.collection("menus").create({
    tenant: tid,
    name: "Galery",
    url: "",
    parent: "",
  });

  const profileChildren: MenuChild[] = [
    { name: "Profil Sekolah", slug: "profil-sekolah" },
    { name: "Visi dan Misi", slug: "visi-dan-misi" },
    { name: "Sambutan", slug: "sambutan" },
    { name: "Guru dan Tendik", slug: "guru-dan-tendik" },
  ];
  const saranaChildren: MenuChild[] = [
    { name: "Fasilitas", slug: "fasilitas" },
    { name: "Adiwiyata", slug: "adiwiyata" },
    { name: "Ekstrakurikuler", slug: "ekstrakurikuler" },
  ];
  const informasiChildren: MenuChild[] = [
    { name: "Pengumuman", slug: "pengumuman" },
    { name: "Prestasi", slug: "prestasi" },
    { name: "Kelulusan", slug: "kelulusan" },
    { name: "E-Rapor", slug: "e-rapor" },
    { name: "Ikatan Alumni", slug: "ikatan-alumni" },
  ];
  const galleryChildren: MenuChild[] = [
    { name: "Kegiatan Sekolah", slug: "kegiatan-sekolah" },
  ];

  const allChildren = [
    ...profileChildren,
    ...saranaChildren,
    ...informasiChildren,
    ...galleryChildren,
  ];

  for (const child of allChildren) {
    const parentMenu = profileChildren.includes(child)
      ? profileMenu
      : saranaChildren.includes(child)
      ? saranaMenu
      : informasiChildren.includes(child)
      ? informasiMenu
      : galleryMenu;
    await pb.collection("menus").create({
      tenant: tid,
      name: child.name,
      url: `/pages/${child.slug}`,
      parent: parentMenu.id,
    });
  }
  console.log("Menus done.");

  // ==========================================
  // 5. SLIDER ITEMS
  // ==========================================
  console.log("\n=== Seeding slider_items ===");
  await clearCollection("slider_items", tid);

  const sliderItems: SliderItem[] = [
    {
      image: IMG("Selamat+Datang+SMAN+72", 1920, 800, "1B4F72", "FFFFFF"),
      text: "Selamat Datang di SMA Negeri 72 Jakarta",
    },
    {
      image: IMG("Berprestasi+Berakhlak", 1920, 800, "2E86C1", "FFFFFF"),
      text: "Berprestasi, Berakhlak Mulia, Berwawasan Global",
    },
    {
      image: IMG("Sekolah+Adiwiyata", 1920, 800, "27AE60", "FFFFFF"),
      text: "Sekolah Adiwiyata - Berbudaya Lingkungan",
    },
    {
      image: IMG("PPDB+2026", 1920, 800, "E74C3C", "FFFFFF"),
      text: "Penerimaan Peserta Didik Baru 2026/2027",
    },
  ];

  try {
    await pb.collection("slider_items").create({
      tenant: tid,
      items: sliderItems,
    });
    console.log("  Slider created with", sliderItems.length, "items");
  } catch (e: any) {
    console.log("  Slider error:", e.response?.data || e.message);
  }
  console.log("Slider items done.");

  // ==========================================
  // 6. KEUNGGULAN
  // ==========================================
  console.log("\n=== Seeding keunggulan ===");
  await clearCollection("keunggulan", tid);

  const keunggulan: KeunggulanSeed[] = [
    {
      icon: "fas fa-graduation-cap",
      judul: "Akademik Unggul",
      deskripsi: "Kurikulum merdeka dengan pendekatan pembelajaran inovatif",
    },
    {
      icon: "fas fa-award",
      judul: "Berprestasi",
      deskripsi: "Siswa berprestasi di tingkat kota, provinsi, hingga nasional",
    },
    {
      icon: "fas fa-leaf",
      judul: "Sekolah Adiwiyata",
      deskripsi: "Sekolah berwawasan lingkungan dengan program penghijauan",
    },
    {
      icon: "fas fa-laptop-code",
      judul: "Fasilitas Modern",
      deskripsi:
        "Laboratorium lengkap, perpustakaan digital, ruang kelas ber-AC",
    },
    {
      icon: "fas fa-users",
      judul: "Guru Profesional",
      deskripsi:
        "Tenaga pendidik berkualifikasi S1/S2 dari perguruan tinggi terbaik",
    },
    {
      icon: "fas fa-palette",
      judul: "Ekstrakurikuler Variatif",
      deskripsi: "Lebih dari 20 kegiatan ekstrakurikuler",
    },
  ];

  for (const k of keunggulan) {
    await pb.collection("keunggulan").create({ ...k, tenant: tid });
  }
  console.log("Keunggulan done.");

  // ==========================================
  // 7. TEACHERS
  // ==========================================
  console.log("\n=== Seeding teachers ===");
  await clearCollection("teachers", tid);

  const teachers: TeacherSeed[] = [
    {
      nama: "Drs. H. Suryadi, M.Pd",
      foto: IMG("Kepala+Sekolah", 300, 400, "1B4F72", "FFFFFF"),
      mapel: "Kepala Sekolah",
    },
    {
      nama: "Dra. Siti Aminah, M.Pd",
      foto: IMG("Wakil+Kepsek", 300, 400, "2E86C1", "FFFFFF"),
      mapel: "Wakil Kepala Sekolah",
    },
    {
      nama: "Ahmad Fauzi, S.Pd",
      foto: IMG("Guru+1", 300, 400, "3498DB", "FFFFFF"),
      mapel: "Matematika",
    },
    {
      nama: "Dewi Sartika, S.Pd",
      foto: IMG("Guru+2", 300, 400, "E74C3C", "FFFFFF"),
      mapel: "Bahasa Indonesia",
    },
    {
      nama: "Budi Santoso, M.Pd",
      foto: IMG("Guru+3", 300, 400, "27AE60", "FFFFFF"),
      mapel: "Fisika",
    },
    {
      nama: "Rina Wulandari, S.Pd",
      foto: IMG("Guru+4", 300, 400, "F39C12", "FFFFFF"),
      mapel: "Kimia",
    },
    {
      nama: "Hendra Gunawan, S.Pd",
      foto: IMG("Guru+5", 300, 400, "9B59B6", "FFFFFF"),
      mapel: "Biologi",
    },
    {
      nama: "Nurhaliza, S.Pd",
      foto: IMG("Guru+6", 300, 400, "E67E22", "FFFFFF"),
      mapel: "Bahasa Inggris",
    },
    {
      nama: "Agus Prasetyo, S.Kom",
      foto: IMG("Guru+7", 300, 400, "1ABC9C", "FFFFFF"),
      mapel: "Informatika",
    },
    {
      nama: "Lestari Dewi, S.Pd",
      foto: IMG("Guru+8", 300, 400, "8E44AD", "FFFFFF"),
      mapel: "Sejarah Indonesia",
    },
    {
      nama: "Rizki Ramadhan, S.Pd",
      foto: IMG("Guru+9", 300, 400, "D35400", "FFFFFF"),
      mapel: "Pendidikan Jasmani",
    },
    {
      nama: "Fitri Handayani, S.Pd",
      foto: IMG("Guru+10", 300, 400, "C0392B", "FFFFFF"),
      mapel: "Seni Budaya",
    },
    {
      nama: "Ir. Bambang Widodo",
      foto: IMG("Guru+11", 300, 400, "2C3E50", "FFFFFF"),
      mapel: "Geografi",
    },
    {
      nama: "Sri Rahayu, S.Pd",
      foto: IMG("Guru+12", 300, 400, "7F8C8D", "FFFFFF"),
      mapel: "Pendidikan Agama Islam",
    },
    {
      nama: "Eko Supriyanto, S.Pd",
      foto: IMG("Guru+13", 300, 400, "2980B9", "FFFFFF"),
      mapel: "PKN",
    },
    {
      nama: "Maya Sari, S.Pd",
      foto: IMG("Guru+14", 300, 400, "8E44AD", "FFFFFF"),
      mapel: "Bahasa Jepang",
    },
  ];

  for (const t of teachers) {
    await pb.collection("teachers").create({
      ...t,
      tenant: tid,
      facebook: "",
      twitter: "",
      instagram: "",
    });
  }
  console.log("Teachers done.");

  // ==========================================
  // 8. EVENTS
  // ==========================================
  console.log("\n=== Seeding events ===");
  await clearCollection("events", tid);

  const events: EventSeed[] = [
    {
      title: "Penerimaan Peserta Didik Baru 2026/2027",
      text: "Pendaftaran PPDB tahun ajaran 2026/2027 telah dibuka.",
      content:
        "<p>PPDB SMA Negeri 72 Jakarta tahun ajaran 2026/2027 telah resmi dibuka.</p><p><strong>Jadwal:</strong><br/>- Pendaftaran: 1 - 15 Juni 2026<br/>- Seleksi: 16 - 20 Juni 2026<br/>- Pengumuman: 25 Juni 2026</p>",
      image: IMG("PPDB+2026", 600, 400, "E74C3C", "FFFFFF"),
    },
    {
      title: "Peringatan Hari Pendidikan Nasional",
      text: "Upacara dan berbagai lomba dalam rangka Hardiknas 2026",
      content:
        "<p>Kegiatan meliputi upacara bendera, lomba pidato, lomba poster, dan pentas seni siswa.</p>",
      image: IMG("Hardiknas+2026", 600, 400, "3498DB", "FFFFFF"),
    },
    {
      title: "Study Tour ke Yogyakarta",
      text: "Kegiatan study tour siswa kelas XI ke Yogyakarta",
      content:
        "<p>Study tour ke Yogyakarta dan Jawa Tengah untuk memperluas wawasan siswa tentang budaya dan sejarah Indonesia.</p>",
      image: IMG("Study+Tour", 600, 400, "27AE60", "FFFFFF"),
    },
    {
      title: "Pentas Seni Akhir Tahun",
      text: "Pentas seni dan pergelaran karya siswa akhir tahun ajaran",
      content:
        "<p>Pentas Seni menampilkan berbagai pertunjukan seni dari siswa, termasuk tari, musik, teater, dan pameran karya seni rupa.</p>",
      image: IMG("Pentas+Seni", 600, 400, "F39C12", "FFFFFF"),
    },
  ];

  for (const e of events) {
    await pb.collection("events").create({ ...e, tenant: tid });
  }
  console.log("Events done.");

  // ==========================================
  // 9. GALLERY
  // ==========================================
  console.log("\n=== Seeding gallery ===");
  await clearCollection("gallery", tid);

  const galleryItems: GallerySeed[] = [
    {
      title: "Upacara Bendera",
      description: "Upacara bendera rutin setiap hari Senin",
      image: IMG("Upacara", 600, 400, "E74C3C", "FFFFFF"),
    },
    {
      title: "Kegiatan Belajar",
      description: "Suasana belajar di kelas",
      image: IMG("Belajar", 600, 400, "3498DB", "FFFFFF"),
    },
    {
      title: "Praktikum IPA",
      description: "Siswa melakukan praktikum di laboratorium",
      image: IMG("Praktikum", 600, 400, "27AE60", "FFFFFF"),
    },
    {
      title: "Perpustakaan",
      description: "Kegiatan literasi di perpustakaan",
      image: IMG("Perpustakaan", 600, 400, "F39C12", "FFFFFF"),
    },
    {
      title: "Kegiatan Olahraga",
      description: "Latihan basket di lapangan sekolah",
      image: IMG("Olahraga", 600, 400, "9B59B6", "FFFFFF"),
    },
    {
      title: "Pentas Seni",
      description: "Pentas seni tahunan SMAN 72 Jakarta",
      image: IMG("Pentas+Seni", 600, 400, "E67E22", "FFFFFF"),
    },
    {
      title: "Kegiatan Pramuka",
      description: "Kegiatan perkemahan pramuka",
      image: IMG("Pramuka", 600, 400, "1ABC9C", "FFFFFF"),
    },
    {
      title: "Class Meeting",
      description: "Kegiatan class meeting akhir semester",
      image: IMG("Class+Meeting", 600, 400, "D35400", "FFFFFF"),
    },
    {
      title: "Study Tour",
      description: "Study tour ke Yogyakarta",
      image: IMG("Study+Tour", 600, 400, "C0392B", "FFFFFF"),
    },
    {
      title: "Workshop IT",
      description: "Workshop teknologi informasi untuk siswa",
      image: IMG("Workshop+IT", 600, 400, "2C3E50", "FFFFFF"),
    },
    {
      title: "Kegiatan Adiwiyata",
      description: "Penanaman pohon dalam program Adiwiyata",
      image: IMG("Adiwiyata", 600, 400, "2980B9", "FFFFFF"),
    },
    {
      title: "Wisuda Siswa",
      description: "Wisuda dan pelepasan siswa kelas XII",
      image: IMG("Wisuda", 600, 400, "8E44AD", "FFFFFF"),
    },
  ];

  for (const g of galleryItems) {
    await pb.collection("gallery").create({ ...g, tenant: tid });
  }
  console.log("Gallery done.");

  // ==========================================
  // 10. QUICK & POPULAR LINKS
  // ==========================================
  console.log("\n=== Seeding quick_popular_links ===");
  await clearCollection("quick_popular_links", tid);

  try {
    await pb.collection("quick_popular_links").create({
      tenant: tid,
      type: "quick",
      item: [
        { name: "PPDB DKI Jakarta", url: "https://ppdb.jakarta.go.id" },
        { name: "E-Rapor", url: "https://erapor.sman72jakarta.sch.id" },
        { name: "Kemendikbud", url: "https://kemdikbud.go.id" },
      ],
    });
  } catch (e: any) {
    console.log(
      "  Quick links error:",
      e.response?.data?.tenant?.message || e.message
    );
  }

  try {
    await pb.collection("quick_popular_links").create({
      tenant: tid,
      type: "popular",
      item: [
        { name: "Pendaftaran PPDB", url: "https://ppdb.jakarta.go.id" },
        {
          name: "E-Learning",
          url: "https://elearning.sman72jakarta.sch.id",
        },
        {
          name: "Perpustakaan Digital",
          url: "https://perpus.sman72jakarta.sch.id",
        },
        { name: "Alumni", url: "/pages?slug=ikatan-alumni" },
      ],
    });
  } catch (e: any) {
    console.log(
      "  Popular links error:",
      e.response?.data?.tenant?.message || e.message
    );
  }
  console.log("Quick & Popular links done.");

  // ==========================================
  // 11. POSTS
  // ==========================================
  console.log("\n=== Seeding posts ===");
  await clearCollection("posts", tid);

  const posts: PostSeed[] = [
    {
      slug: "pengumuman-ppdb-2026",
      title: "Pengumuman PPDB Tahun Ajaran 2026/2027",
      excerpt:
        "Informasi lengkap mengenai Penerimaan Peserta Didik Baru (PPDB) SMA Negeri 72 Jakarta tahun ajaran 2026/2027.",
      content: `
<h2>Pengumuman PPDB Tahun Ajaran 2026/2027</h2>
<p>Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027 telah resmi dibuka.</p>

<h3>Jadwal PPDB</h3>
<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Kegiatan</th><th>Tanggal</th></tr>
<tr><td>Pendaftaran Online</td><td>1 - 15 Juni 2026</td></tr>
<tr><td>Verifikasi Berkas</td><td>16 - 18 Juni 2026</td></tr>
<tr><td>Seleksi</td><td>19 - 20 Juni 2026</td></tr>
<tr><td>Pengumuman</td><td>25 Juni 2026</td></tr>
<tr><td>Daftar Ulang</td><td>26 - 28 Juni 2026</td></tr>
</table>

<h3>Jalur Pendaftaran</h3>
<ul>
<li><strong>Jalur Zonasi:</strong> 50%</li>
<li><strong>Jalur Prestasi:</strong> 30%</li>
<li><strong>Jalur Afirmasi:</strong> 15%</li>
<li><strong>Jalur Perpindahan Tugas Orang Tua:</strong> 5%</li>
</ul>

<p>Info lebih lanjut: <a href="https://ppdb.jakarta.go.id">ppdb.jakarta.go.id</a></p>
`,
      cover_image: IMG("PPDB+2026", 800, 400, "E74C3C", "FFFFFF"),
      author_name: "Admin SMAN 72",
      date: "2026-05-15",
    },
    {
      slug: "prestasi-osn-fisika-2025",
      title: "Siswa SMAN 72 Raih Juara 2 OSN Fisika Tingkat Nasional",
      excerpt:
        "Muhammad Rizki, siswa kelas XII MIPA 1, berhasil meraih Juara 2 OSN Fisika 2025.",
      content: `
<h2>Juara 2 OSN Fisika Tingkat Nasional</h2>
<p>Muhammad Rizki, siswa kelas XII MIPA 1, berhasil meraih <strong>Juara 2</strong> dalam Olimpiade Sains Nasional bidang Fisika 2025 di Yogyakarta.</p>

<img src="${IMG("OSN+Fisika", 800, 400, "F1C40F", "333333")}" alt="OSN Fisika" style="width:100%; max-width:800px;" />

<p>"Alhamdulillah, saya sangat bersyukur bisa meraih prestasi ini. Terima kasih kepada guru-guru yang telah membimbing saya," ujar Rizki.</p>

<p>Selamat kepada Muhammad Rizki! Semoga menjadi inspirasi bagi siswa lainnya.</p>
`,
      cover_image: IMG("Juara+OSN", 800, 400, "F1C40F", "333333"),
      author_name: "Admin SMAN 72",
      date: "2025-09-20",
    },
    {
      slug: "juara-lomba-debat-bahasa-inggris",
      title: "Juara 1 Lomba Debat Bahasa Inggris Tingkat Provinsi",
      excerpt:
        "Tim Debat Bahasa Inggris SMAN 72 meraih juara 1 tingkat Provinsi DKI Jakarta.",
      content: `
<h2>Juara 1 Lomba Debat Bahasa Inggris</h2>
<p>Tim Debat Bahasa Inggris meraih <strong>Juara 1</strong> dalam lomba debat tingkat Provinsi DKI Jakarta 2025.</p>

<img src="${IMG("Debat", 800, 400, "3498DB", "FFFFFF")}" alt="Debat" style="width:100%; max-width:800px;" />

<h3>Anggota Tim</h3>
<ul>
<li>Aisyah Putri (Ketua)</li>
<li>Fajar Nugroho</li>
<li>Nabila Zahra</li>
</ul>

<p>Topik debat: "The Impact of Artificial Intelligence on Education". Tim mengalahkan 32 sekolah lain.</p>
`,
      cover_image: IMG("Debat+BInggris", 800, 400, "3498DB", "FFFFFF"),
      author_name: "Admin SMAN 72",
      date: "2025-08-15",
    },
    {
      slug: "kegiatan-mpls-2026",
      title: "MPLS Tahun Ajaran 2026/2027",
      excerpt:
        "MPLS untuk siswa baru akan dilaksanakan pada 14-16 Juli 2026.",
      content: `
<h2>Masa Pengenalan Lingkungan Sekolah (MPLS) 2026</h2>

<h3>Jadwal</h3>
<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Hari/Tanggal</th><th>Kegiatan</th></tr>
<tr><td>Senin, 14 Juli 2026</td><td>Upacara, pengenalan visi misi, tour sekolah</td></tr>
<tr><td>Selasa, 15 Juli 2026</td><td>Pengenalan kurikulum, ekstrakurikuler</td></tr>
<tr><td>Rabu, 16 Juli 2026</td><td>Wawasan kebangsaan, anti bullying, penutupan</td></tr>
</table>

<img src="${IMG("MPLS+2026", 800, 400, "27AE60", "FFFFFF")}" alt="MPLS" style="width:100%; max-width:800px;" />

<p>Selamat bergabung kepada seluruh siswa baru!</p>
`,
      cover_image: IMG("MPLS+2026", 800, 400, "27AE60", "FFFFFF"),
      author_name: "Admin SMAN 72",
      date: "2026-05-10",
    },
    {
      slug: "program-adiwiyata-mandiri",
      title: "SMAN 72 Raih Penghargaan Sekolah Adiwiyata Mandiri",
      excerpt:
        "SMA Negeri 72 Jakarta berhasil meraih penghargaan Sekolah Adiwiyata Mandiri.",
      content: `
<h2>Penghargaan Sekolah Adiwiyata Mandiri</h2>
<p>SMA Negeri 72 Jakarta meraih penghargaan <strong>Sekolah Adiwiyata Mandiri</strong> dari Kementerian LHK.</p>

<img src="${IMG("Adiwiyata", 800, 400, "27AE60", "FFFFFF")}" alt="Adiwiyata" style="width:100%; max-width:800px;" />

<h3>Upaya yang Dilakukan</h3>
<ul>
<li>Penanaman lebih dari 500 pohon</li>
<li>Program bank sampah</li>
<li>Instalasi pengolahan air limbah</li>
<li>Penggunaan panel surya</li>
<li>Integrasi pendidikan lingkungan dalam kurikulum</li>
</ul>
`,
      cover_image: IMG("Adiwiyata+Mandiri", 800, 400, "27AE60", "FFFFFF"),
      author_name: "Admin SMAN 72",
      date: "2025-10-15",
    },
    {
      slug: "jadwal-ujian-akhir-semester-genap",
      title: "Jadwal UAS Genap Tahun Ajaran 2025/2026",
      excerpt:
        "Jadwal lengkap Ujian Akhir Semester Genap untuk seluruh kelas.",
      content: `
<h2>Jadwal UAS Genap 2025/2026</h2>

<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Hari/Tanggal</th><th>Mata Pelajaran</th><th>Waktu</th></tr>
<tr><td>Senin, 2 Juni 2026</td><td>Bahasa Indonesia</td><td>08.00 - 10.00</td></tr>
<tr><td>Selasa, 3 Juni 2026</td><td>Matematika</td><td>08.00 - 10.00</td></tr>
<tr><td>Rabu, 4 Juni 2026</td><td>Bahasa Inggris</td><td>08.00 - 10.00</td></tr>
<tr><td>Kamis, 5 Juni 2026</td><td>Fisika</td><td>08.00 - 10.00</td></tr>
<tr><td>Jumat, 6 Juni 2026</td><td>Kimia</td><td>08.00 - 10.00</td></tr>
<tr><td>Senin, 9 Juni 2026</td><td>Biologi</td><td>08.00 - 10.00</td></tr>
<tr><td>Selasa, 10 Juni 2026</td><td>Sejarah Indonesia</td><td>08.00 - 10.00</td></tr>
<tr><td>Rabu, 11 Juni 2026</td><td>PKN</td><td>08.00 - 10.00</td></tr>
</table>

<h3>Ketentuan</h3>
<ul>
<li>Hadir 15 menit sebelum ujian</li>
<li>Membawa alat tulis sendiri</li>
<li>Dilarang membawa handphone</li>
<li>Memakai seragam lengkap</li>
</ul>
`,
      cover_image: IMG("UAS+Genap", 800, 400, "E67E22", "FFFFFF"),
      author_name: "Admin SMAN 72",
      date: "2026-05-01",
    },
  ];

  for (const p of posts) {
    await pb.collection("posts").create({ tenant: tid, ...p });
    console.log(`  Post: ${p.slug}`);
  }
  console.log("Posts done.");

  console.log("\n========================================");
  console.log("=== SEEDING COMPLETE FOR SMAN 72 JAKARTA ===");
  console.log("========================================");
  console.log(`Tenant ID: ${tid}`);
  console.log("Content seeded:");
  console.log("  - School Settings");
  console.log("  - 12 Pages");
  console.log("  - Visi & Misi");
  console.log("  - 17 Menu Items (5 parent + 12 child)");
  console.log("  - 4 Slider Items");
  console.log("  - 6 Keunggulan");
  console.log("  - 16 Teachers");
  console.log("  - 4 Events");
  console.log("  - 12 Gallery Items");
  console.log("  - Quick & Popular Links");
  console.log("  - 6 Posts");
  console.log("========================================");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

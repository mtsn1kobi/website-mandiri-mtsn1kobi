import type {
  EventsRecord,
  GalleryRecord,
  KeunggulanRecord,
  MenusRecord,
  PagesRecord,
  PostsRecord,
  QuickPopularLinksRecord,
  SchoolSettingsRecord,
  SliderItemsRecord,
  TeachersRecord,
  VisiMisiRecord,
} from "./pocketbase-types"; // Adjust the import path as needed

export function defaultSettings(tenantID: string): {
  events: Partial<EventsRecord>[];
  gallery: Partial<GalleryRecord>[];
  keunggulan: Partial<KeunggulanRecord>[];
  menus: Partial<MenusRecord>[];
  pages: Partial<PagesRecord>[];
  posts: Partial<PostsRecord>[];
  quick_popular_links: Partial<QuickPopularLinksRecord>[];
  school_settings: Partial<SchoolSettingsRecord>[];
  slider_items: Partial<SliderItemsRecord>[];
  teachers: Partial<TeachersRecord>[];
  visi_misi: {
    type: string;
    item: {
      Visi: string;
      Misi: string[];
    };
    tenant: string;
  }[];
} {
  return {
    school_settings: [
      {
        nama_sekolah: "SMA Negeri 1 Harapan Bangsa",
        title:
          "SMA Negeri 1 Harapan Bangsa - Unggul, Berprestasi, Berakhlak Mulia",
        alamat: "Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345",
        telepon: "(021) 1234-5678",
        email: "info@harapanbangsa.sch.id",
        jam_kerja: "Senin - Jumat: 07.00 - 16.00 WIB",
        sekilas_info:
          "SMA Negeri 1 Harapan Bangsa adalah sekolah unggulan yang berkomitmen mencetak generasi emas Indonesia dengan prestasi akademik dan non-akademik yang gemilang, serta berlandaskan nilai-nilai karakter yang kuat.",
        tentang_kepsek:
          "Selamat datang di website resmi SMA Negeri 1 Harapan Bangsa. Kami berdedikasi untuk menyediakan lingkungan belajar yang inovatif, inklusif, dan inspiratif bagi seluruh peserta didik. Mari bersama-sama mewujudkan pendidikan berkualitas untuk masa depan yang lebih cerah.",
        logo: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
        about_image:
          "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        home_background:
          "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        facebook: "https://facebook.com/sman1harapanbangsa",
        instagram: "https://instagram.com/sman1harapanbangsa",
        twitter: "https://twitter.com/sman1harapan",
        youtube: "https://youtube.com/@sman1harapanbangsa",
        popup:
          "<div class='p-6 text-center'><h3 class='text-2xl font-bold text-blue-800 mb-2'>Pendaftaran PPDB 2024/2025 Dibuka!</h3><p class='mb-4 text-gray-600'>Segera daftarkan putra-putri Anda. Kuota terbatas untuk jalur prestasi.</p><a href='/ppdb' class='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>Daftar Sekarang</a></div>",
        tenant: tenantID,
      },
    ],

    menus: [
      { name: "Beranda", url: "/", order: 1, tenant: tenantID },
      { name: "Guru", url: "/guru", order: 3, tenant: tenantID },
      { name: "Kegiatan", url: "/events", order: 4, tenant: tenantID },
      { name: "Berita", url: "/berita", order: 5, tenant: tenantID },
      { name: "Galeri", url: "/gallery", order: 6, tenant: tenantID },
    ],

    visi_misi: [
      {
        type: "visi",
        item: {
          Visi: "Menjadi sekolah unggul yang mencetak generasi berprestasi, berakhlak mulia, berwawasan global, dan peduli terhadap lingkungan pada tahun 2030.",
          Misi: [
            "Menyelenggarakan pendidikan berkualitas dengan kurikulum yang adaptif dan inovatif.",
            "Mengembangkan potensi siswa secara optimal melalui kegiatan ekstrakurikuler yang beragam.",
            "Membangun karakter siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.",
            "Meningkatkan kompetensi guru dan tenaga kependidikan secara berkelanjutan.",
            "Menciptakan lingkungan sekolah yang bersih, hijau, dan kondusif untuk belajar.",
          ],
        },
        tenant: tenantID,
      },
    ],

    keunggulan: [
      {
        judul: "Kurikulum Merdeka",
        deskripsi:
          "Menerapkan kurikulum yang fleksibel dan berfokus pada pengembangan karakter serta kompetensi siswa sesuai minat dan bakat.",
        icon: "fas fa-book-reader",
        tenant: tenantID,
      },
      {
        judul: "Fasilitas Modern",
        deskripsi:
          "Dilengkapi dengan laboratorium sains terpadu, komputer, perpustakaan digital, dan ruang kelas ber-AC yang nyaman.",
        icon: "fas fa-building",
        tenant: tenantID,
      },
      {
        judul: "Prestasi Non-Akademik",
        deskripsi:
          "Raih prestasi di berbagai bidang seperti olahraga, seni, robotik, dan pramuka di tingkat nasional maupun internasional.",
        icon: "fas fa-trophy",
        tenant: tenantID,
      },
    ],

    teachers: [
      {
        nama: "Dr. Budi Santoso, M.Pd.",
        mapel: "Kepala Sekolah",
        foto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
        tenant: tenantID,
      },
      {
        nama: "Siti Aminah, S.Pd.",
        mapel: "Matematika",
        foto: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
        tenant: tenantID,
      },
      {
        nama: "Rahmat Hidayat, S.Si.",
        mapel: "Fisika",
        foto: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
        tenant: tenantID,
      },
      {
        nama: "Dewi Lestari, S.Pd.",
        mapel: "Bahasa Inggris",
        foto: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
        tenant: tenantID,
      },
    ],

    posts: [
      {
        title: "Juara 1 Olimpiade Sains Nasional 2024",
        slug: "juara-1-osn-2024",
        excerpt:
          "Siswa kami berhasil meraih medali emas dalam bidang Fisika pada ajang OSN tingkat nasional.",
        content:
          "<p>Kami dengan bangga mengumumkan bahwa perwakilan sekolah kami, Ananda Rizky, telah berhasil meraih Juara 1 dalam Olimpiade Sains Nasional (OSN) 2024 bidang Fisika. Prestasi ini merupakan hasil dari kerja keras, dedikasi, dan bimbingan intensif dari para guru.</p><p>Selamat kepada Rizky dan keluarga besar SMA Negeri 1 Harapan Bangsa! Semoga prestasi ini menjadi inspirasi bagi siswa lainnya.</p>",
        cover_image:
          "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        author_name: "Admin Sekolah",
        author_picture:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
        date: new Date().toISOString(),
        tenant: tenantID,
      },
      {
        title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025",
        slug: "ppdb-2024-2025",
        excerpt:
          "Informasi lengkap mengenai jadwal, syarat, dan tata cara pendaftaran PPDB online.",
        content:
          "<p>Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2024/2025 telah resmi dibuka. Silakan kunjungi halaman PPDB untuk informasi lebih lanjut mengenai jalur pendaftaran (Zonasi, Prestasi, dan Afirmasi), syarat dokumen, dan jadwal seleksi.</p><p>Jangan lewatkan kesempatan untuk bergabung dengan keluarga besar kami!</p>",
        cover_image:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
        author_name: "Panitia PPDB",
        author_picture:
          "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
        date: new Date().toISOString(),
        tenant: tenantID,
      },
    ],

    events: [
      {
        title: "Pentas Seni Akhir Tahun",
        content:
          "Ayo saksikan penampilan spektakuler dari siswa-siswi berbakat kita dalam Pentas Seni Akhir Tahun yang menampilkan tari tradisional, band, dan teater.",
        text: "Lokasi: Aula Utama Sekolah. Waktu: 20 Desember 2024, Pukul 19.00 WIB. Gratis untuk umum.",
        image:
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        tenant: tenantID,
      },
      {
        title: "Workshop Teknologi dan Robotik",
        content:
          "Pelatihan intensif selama 3 hari tentang pemrograman dasar Python dan perakitan robot line follower untuk siswa kelas X dan XI.",
        text: "Fasilitas: Sertifikat, Snack, dan Modul Pelatihan. Pendaftaran melalui link di bio Instagram sekolah.",
        image:
          "https://images.pexels.com/photos/2183045/pexels-photo-2183045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        tenant: tenantID,
      },
    ],

    gallery: [
      {
        title: "Upacara Bendera",
        description:
          "Pelaksanaan upacara bendera setiap hari Senin dengan penuh khidmat untuk menumbuhkan rasa nasionalisme.",
        image:
          "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        tenant: tenantID,
      },
      {
        title: "Kegiatan Pramuka",
        description:
          "Latihan rutin pramuka di alam terbuka untuk membentuk karakter disiplin, tangguh, dan mandiri.",
        image:
          "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        tenant: tenantID,
      },
      {
        title: "Laboratorium Komputer",
        description:
          "Fasilitas laboratorium komputer modern dengan spesifikasi tinggi untuk menunjang pembelajaran TIK dan coding.",
        image:
          "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
        tenant: tenantID,
      },
    ],

    slider_items: [
      {
        items: [
          {
            text: "Selamat Datang di SMA Negeri 1 Harapan Bangsa",
            image:
              "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
          },
          {
            text: "Prestasi Membanggakan di Tingkat Nasional",
            image:
              "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
          },
        ] as unknown as null, // Type assertion to satisfy generic Titems
        tenant: tenantID,
      },
    ],

    quick_popular_links: [
      {
        type: "popular",
        item: [
          {
            name: "Google",
            url: "https://google.com",
          },
          {
            name: "Youtube",
            url: "https://youtube.com",
          },
        ] as unknown as null,
        tenant: tenantID,
      },
      {
        type: "quick",
        item: [
          {
            name: "Admin",
            url: "/admin/login",
          },
          {
            name: "Galeri Guru",
            url: "/guru",
          },
        ] as unknown as null,
        tenant: tenantID,
      },
    ],

    pages: [
      {
        title: "Tentang Kami",
        slug: "tentang-kami",
        content:
          "<h2 class='text-2xl font-bold mb-4'>Sejarah Sekolah</h2><p class='mb-4'>SMA Negeri 1 Harapan Bangsa didirikan pada tahun 1985 dengan visi untuk mencerdaskan kehidupan bangsa. Sejak saat itu, kami terus berkembang menjadi salah satu institusi pendidikan terdepan di wilayah ini.</p><h2 class='text-2xl font-bold mb-4 mt-8'>Nilai Inti</h2><ul class='list-disc pl-5'><li>Integritas</li><li>Excellence (Keunggulan)</li><li>Kolaborasi</li><li>Inovasi</li></ul>",
        tenant: tenantID,
      },
      {
        title: "Fasilitas",
        slug: "fasilitas",
        content:
          "<h2 class='text-2xl font-bold mb-4'>Fasilitas Unggulan</h2><ul class='list-disc pl-5 space-y-2'><li><strong>Laboratorium Sains Terpadu:</strong> Dilengkapi peralatan praktikum modern untuk Fisika, Kimia, dan Biologi.</li><li><strong>Perpustakaan Digital:</strong> Akses ke ribuan e-book dan jurnal ilmiah.</li><li><strong>Lapangan Olahraga:</strong> Lapangan basket, futsal, dan voli berstandar nasional.</li><li><strong>Masjid Sekolah:</strong> Sarana ibadah yang luas dan nyaman untuk kegiatan keagamaan.</li></ul>",
        tenant: tenantID,
      },
    ],
  };
}

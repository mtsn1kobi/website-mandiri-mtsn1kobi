/**
 * Seed script: Populates Pocketbase with existing data from markdown files and settings.
 * Usage: node seed.mjs
 */
import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PB_URL = process.env.PB_URL || 'https://sekolah-backend.sg2.app.web.id';
const PB_EMAIL = process.env.PB_EMAIL || 'yokowasis@gmail.com';
const PB_PASSWORD = process.env.PB_PASSWORD || '6BS5qXPxRH8eZf';

const pb = new PocketBase(PB_URL);

async function seed() {
  console.log('Authenticating admin...');
  await pb.admins.authWithPassword(PB_EMAIL, PB_PASSWORD);

  // 1. Create tenant user (if not exists)
  console.log('Setting up tenant user...');
  let tenantUser = null;
  try {
    const existing = await pb.collection('users').getFirstListItem('email="yokowasis@gmail.com"');
    tenantUser = existing;
    console.log('Tenant user already exists:', tenantUser.id);
  } catch {
    tenantUser = await pb.collection('users').create({
      email: 'yokowasis@gmail.com',
      password: '6BS5qXPxRH8eZf',
      passwordConfirm: '6BS5qXPxRH8eZf',
      name: 'Sekolah Kita',
      domain: 'man1kotabima.sch.id',
      subdomain: 'man1kotabima',
      title: 'Sekolah Kita',
      logo: 'https://1.bp.blogspot.com/-Jl-IvuKLjWc/YGyaWiAkHFI/AAAAAAAACVo/brBouKlkxAE9m52u54EMTPayvnzZEeR4gCNcBGAsYHQ/s2048/Kementerian%2BAgama.png',
      about_image: 'https://images.pexels.com/photos/887584/pexels-photo-887584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    });
    console.log('Created tenant user:', tenantUser.id);
  }

  const tenantId = tenantUser.id;

  // 2. Seed school_settings
  console.log('Seeding school_settings...');
  try {
    const existing = await pb.collection('school_settings').getFullList();
    for (const s of existing) await pb.collection('school_settings').delete(s.id);
  } catch {}
  
  await pb.collection('school_settings').create({
    tenant: tenantId,
    nama_sekolah: 'Sekolah Kita',
    telepon: '(0374) 42434',
    email: 'info@man1kotabima.sch.id',
    alamat: 'Jln. Seruni No.06 Kota Bima',
    jam_kerja: 'Senin s/d Sabtu : 07.00 - 14.30',
    sekilas_info: 'Sekolah Kita adalah sebuah sekolah menengah atas yang berada di bawah naungan Kementerian Agama. Sekolah Kita memiliki status negeri dan menawarkan jenjang pendidikan yang memadai.',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    tentang_kepsek: 'Selamat datang di website kami. Kami berkomitmen untuk menciptakan lingkungan belajar yang inspiratif dan inklusif.',
    home_background: 'https://images.pexels.com/photos/159497/school-notebook-binders-notepad-159497.jpeg?auto=compress&cs=tinysrgb&w=1920',
    video: 'https://www.youtube.com/embed/wgeDmKOKPrY?si=eNwahyAmd1l1xHLM',
  });
  console.log('school_settings seeded.');

  // 3. Seed menus
  console.log('Seeding menus...');
  // Clear existing menus
  try {
    const existingMenus = await pb.collection('menus').getFullList();
    for (const m of existingMenus) {
      await pb.collection('menus').delete(m.id);
    }
  } catch {}

  const menuItems = [
    { name: 'Home', url: '/', parent: null },
    { name: 'About', url: '/pages/about', parent: null },
    { name: 'Visi_Misi', url: '/pages/visi-misi', parent: null },
    { name: 'Struktur_Organisasi', url: '/pages/struktur-organisasi', parent: null },
    { name: 'Jadwal_Pelajaran', url: '/pages/jadwal-pelajaran', parent: null },
    { name: 'Contact', url: '/pages/contact', parent: null },
  ];
  for (const item of menuItems) {
    await pb.collection('menus').create({
      ...item,
      tenant: tenantId,
    });
  }
  console.log('Menus seeded.');

  // 4. Seed slider_items
  console.log('Seeding slider_items...');
  try {
    const existing = await pb.collection('slider_items').getFullList();
    for (const s of existing) await pb.collection('slider_items').delete(s.id);
  } catch {}

  const sliders = [
    { image: 'https://images.pexels.com/photos/159497/school-notebook-binders-notepad-159497.jpeg?auto=compress&cs=tinysrgb&w=1920', text: 'Membangun Jiwa, Mengasah Potensi' },
    { image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', text: 'Kreativitas, Integritas, Prestasi.' },
    { image: 'https://images.pexels.com/photos/207756/pexels-photo-207756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', text: 'Kunci Masa Depan: Pendidikan Berkualitas.' },
  ];
  for (const s of sliders) {
    await pb.collection('slider_items').create({ ...s, tenant: tenantId });
  }
  console.log('Slider items seeded.');

  // 5. Seed keunggulan
  console.log('Seeding keunggulan...');
  try {
    const existing = await pb.collection('keunggulan').getFullList();
    for (const k of existing) await pb.collection('keunggulan').delete(k.id);
  } catch {}

  const keunggulan = [
    { icon: 'fas fa-graduation-cap', judul: 'Akademik Berkualitas', deskripsi: 'Menyediakan kurikulum yang komprehensif dan terkini' },
    { icon: 'fas fa-building', judul: 'Fasilitas Modern', deskripsi: 'Fasilitas modern dan lingkungan yang mendukung proses belajar-mengajar' },
    { icon: 'fas fa-palette', judul: 'Ekstrakurikuler Variatif', deskripsi: 'Menawarkan beragam kegiatan ekstrakurikuler yang memperkaya pengalaman siswa' },
  ];
  for (const k of keunggulan) {
    await pb.collection('keunggulan').create({ ...k, tenant: tenantId });
  }
  console.log('Keunggulan seeded.');

  // 6. Seed teachers
  console.log('Seeding teachers...');
  try {
    const existing = await pb.collection('teachers').getFullList();
    for (const t of existing) await pb.collection('teachers').delete(t.id);
  } catch {}

  const teachers = [
    { nama: 'Guru 1', mapel: 'Bahasa Inggris', foto: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nama: 'Guru 2', mapel: 'Bahasa Inggris', foto: 'https://images.pexels.com/photos/9159042/pexels-photo-9159042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nama: 'Guru 3', mapel: 'Bahasa Inggris', foto: 'https://images.pexels.com/photos/7750704/pexels-photo-7750704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { nama: 'Guru 4', mapel: 'Bahasa Inggris', foto: 'https://images.pexels.com/photos/8087857/pexels-photo-8087857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];
  for (const t of teachers) {
    await pb.collection('teachers').create({ ...t, tenant: tenantId, facebook: '', twitter: '', instagram: '' });
  }
  console.log('Teachers seeded.');

  // 7. Seed events
  console.log('Seeding events...');
  try {
    const existing = await pb.collection('events').getFullList();
    for (const e of existing) await pb.collection('events').delete(e.id);
  } catch {}

  const events = [
    { image: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Judul Kegiatan 1', text: 'Ini adalah deskripsi kegiatan', link: 'https://google.com/' },
    { image: 'https://images.pexels.com/photos/848752/pexels-photo-848752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Judul Kegiatan 2', text: 'Ini adalah deskripsi kegiatan', link: 'https://google.com/' },
  ];
  for (const e of events) {
    await pb.collection('events').create({ ...e, tenant: tenantId });
  }
  console.log('Events seeded.');

  // 8. Seed quick_popular_links
  console.log('Seeding quick/popular links...');
  try {
    const existing = await pb.collection('quick_popular_links').getFullList();
    for (const l of existing) await pb.collection('quick_popular_links').delete(l.id);
  } catch {}

  const links = [
    { name: 'Google', url: 'https://google.com', type: 'quick' },
    { name: 'RDM', url: 'https://rdm.man1kotabima.sch.id', type: 'popular' },
    { name: 'Pendaftaran PPDB', url: 'https://aplikasi.man1kotabima.sch.id/ppdb-signup/', type: 'popular' },
    { name: 'Login PPDB', url: 'https://aplikasi.man1kotabima.sch.id', type: 'popular' },
  ];
  for (const l of links) {
    await pb.collection('quick_popular_links').create({ ...l, tenant: tenantId });
  }
  console.log('Links seeded.');

  // 9. Seed posts from _posts/
  console.log('Seeding posts...');
  try {
    const existing = await pb.collection('posts').getFullList();
    for (const p of existing) await pb.collection('posts').delete(p.id);
  } catch {}

  const postsDir = path.join(process.cwd(), '_posts');
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content: body } = matter(content);
      const slug = file.replace(/\.md$/, '');
      
      await pb.collection('posts').create({
        tenant: tenantId,
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: body,
        cover_image: data.coverImage || '',
        date: data.date || new Date().toISOString(),
        author_name: data.author?.name || 'Admin',
        author_picture: data.author?.picture || '',
      });
      console.log(`  Post: ${slug}`);
    }
  }
  console.log('Posts seeded.');

  // 10. Seed pages from _pages/
  console.log('Seeding pages...');
  try {
    const existing = await pb.collection('pages').getFullList();
    for (const p of existing) await pb.collection('pages').delete(p.id);
  } catch {}

  async function readPagesDir(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        await readPagesDir(fullPath, basePath ? path.join(basePath, item) : item);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { data, content: body } = matter(content);
        const pageSlug = basePath ? path.join(basePath, item.replace(/\.md$/, '')) : item.replace(/\.md$/, '');
        
        // Skip SCHEMA.md
        if (item === 'SCHEMA.md') continue;

        await pb.collection('pages').create({
          tenant: tenantId,
          slug: pageSlug.replace(/\\/g, '/'),
          title: data.title || pageSlug,
          content: body,
        });
        console.log(`  Page: ${pageSlug}`);
      }
    }
  }
  
  if (fs.existsSync(path.join(process.cwd(), '_pages'))) {
    await readPagesDir(path.join(process.cwd(), '_pages'));
  }

  console.log('\n=== Seed complete! ===');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});

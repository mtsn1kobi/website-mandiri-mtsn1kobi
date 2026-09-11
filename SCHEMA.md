### Required Pocketbase Schema

Create these collections in Pocketbase:

```typescript
// tenants - for multi-tenant isolation
{
  id: string,
  domain: string,           // e.g., "man1kotabima.sch.id"
  subdomain: string,        // e.g., "man1kotabima"
  name: string,
  logo: string,
  title: string,
  about_image: string,
  created: date,
  updated: date
}

// school_settings - per-tenant configuration
{
  id: string,
  tenant: relation<tenants>,
  nama_sekolah: string,
  telepon: string,
  email: string,
  alamat: string,
  jam_kerja: string,
  sekilas_info: string,
  facebook: string,
  twitter: string,
  instagram: string,
  youtube: string,
  tentang_kepsek: string,
  home_background: string,
  video: string
}

// menus - navigation structure
{
  id: string,
  tenant: relation<tenants>,
  name: string,     // "Home", "About", etc.
  url: string,
  parent: relation<menus> | null
}

// posts - blog posts
{
  id: string,
  tenant: relation<tenants>,
  slug: string,
  title: string,
  excerpt: string,
  content: string,  // markdown
  cover_image: string,
  date: string,
  author_name: string,
  author_picture: string
}

// pages - static pages
{
  id: string,
  tenant: relation<tenants>,
  slug: string,
  title: string,
  content: string   // markdown
}

// teachers
{
  id: string,
  tenant: relation<tenants>,
  nama: string,
  mapel: string,
  foto: string,
  facebook: string,
  twitter: string,
  instagram: string
}

// slider_items
{
  id: string,
  tenant: relation<tenants>,
  image: string,
  text: string
}

// keunggulan - features/advantages
{
  id: string,
  tenant: relation<tenants>,
  icon: string,       // e.g., "fas fa-graduation-cap"
  judul: string,
  deskripsi: string
}

// events
{
  id: string,
  tenant: relation<tenants>,
  image: string,
  title: string,
  text: string,
  link: string
}

// quick_links & popular_links
{
  id: string,
  tenant: relation<tenants>,
  name: string,
  url: string,
  type: "quick" | "popular"
}

### Tenant Resolution

Two approaches:

1. **Subdomain-based**: Extract subdomain from `request.headers.host` (e.g., `man1.example.com` → tenant `man1`)
2. **Domain-based**: Full domain match in `tenants.domain` field

Implement tenant middleware that:
1. Reads host header
2. Queries Pocketbase for matching tenant
3. Caches tenant config (in-memory or Vercel KV)
4. Passes tenant ID to all subsequent queries

```

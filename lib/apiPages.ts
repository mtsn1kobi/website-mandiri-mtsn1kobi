const PB_URL = "https://sekolah-backend.sg2.app.web.id";

async function fetchSlugsFromPocketbase(): Promise<string[]> {
  try {
    const res = await fetch(`${PB_URL}/api/collections/pages/records?fields=slug&sort=-created`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: { slug: string }) => item.slug);
  } catch {
    return [];
  }
}

export async function getPostSlugs() {
  const slugs: string[] = [];
  const pbSlugs = await fetchSlugsFromPocketbase();
  for (const slug of pbSlugs) {
    slugs.push(slug.endsWith(".md") ? slug : `${slug}.md`);
  }
  return slugs;
}

export function getPostBySlug(slug: string, _fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  type Items = { [key: string]: string };
  const items: Items = {};

  _fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    } else {
      items[field] = "";
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug, fields));
}

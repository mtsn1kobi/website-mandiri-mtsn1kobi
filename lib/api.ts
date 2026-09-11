const PB_URL = "https://sekolah-backend.sg2.app.web.id";

async function fetchSlugsFromPocketbase(): Promise<string[]> {
  try {
    const res = await fetch(`${PB_URL}/api/collections/posts/records?fields=slug&sort=-created`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: { slug: string }) => item.slug);
  } catch {
    return [];
  }
}

export async function getPostSlugs() {
  return fetchSlugsFromPocketbase();
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  type Items = { [key: string]: string };
  const items: Items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = "";
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug, fields));
}

import PocketBase from "pocketbase";
import matter from "gray-matter";

const PB_URL = process.env.PB_URL || "https://sekolah-backend.sg2.app.web.id";
const ADMIN_EMAIL = process.env.PB_EMAIL || "yokowasis@gmail.com";
const ADMIN_PASSWORD = process.env.PB_PASSWORD || "6BS5qXPxRH8eZf";
const TENANT_ID = "ailsyta6k6p7xcb";
const GITHUB_API_URL = "https://api.github.com/repos/yokowasis/website-mtsn1kobi.sch.id/contents/_posts";
const PLACEHOLDER_COVER = "https://placehold.co/600x400/EEE/31343C";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log("=== Starting Post Migration for MTsN 1 Kota Bima ===");
  console.log(`Connecting to PocketBase: ${PB_URL}`);

  const pb = new PocketBase(PB_URL);
  await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log("Admin authenticated successfully.");

  // Verify tenant
  const tenantUser = await pb.collection("users").getOne(TENANT_ID);
  console.log(`Target Tenant verified: ${tenantUser.id} (${tenantUser.email || tenantUser.name})`);

  // Fetch file list from GitHub
  console.log(`\nFetching post files from GitHub: ${GITHUB_API_URL}`);
  const ghRes = await fetch(GITHUB_API_URL, {
    headers: {
      "User-Agent": "Antigravity-Migration-Script",
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!ghRes.ok) {
    throw new Error(`Failed to fetch from GitHub API: ${ghRes.status} ${ghRes.statusText}`);
  }

  const files: any[] = await ghRes.json();
  const mdFiles = files.filter((f) => f.name.endsWith(".md"));
  console.log(`Found ${mdFiles.length} markdown post files on GitHub.`);

  const seenSlugs = new Set<string>();
  let createdCount = 0;
  let updatedCount = 0;
  let skippedDuplicates = 0;

  for (let i = 0; i < mdFiles.length; i++) {
    const file = mdFiles[i];
    console.log(`\n[${i + 1}/${mdFiles.length}] Processing ${file.name}...`);

    const rawRes = await fetch(file.download_url);
    if (!rawRes.ok) {
      console.error(`  Failed to download file: ${file.download_url} (${rawRes.status})`);
      continue;
    }

    const rawText = await rawRes.text();
    const { data, content: body } = matter(rawText);

    const title = (data.title || "Untitled").trim();
    const slug = generateSlug(title) || `post-${Date.now()}`;

    // Handle duplicate titles/slugs by skipping duplicate
    if (seenSlugs.has(slug)) {
      console.log(`  Skipping duplicate title/slug: "${title}" (slug: ${slug})`);
      skippedDuplicates++;
      continue;
    }
    seenSlugs.add(slug);

    // Format cover image
    let coverImage = (data.coverImage || "").trim();
    if (!coverImage || coverImage.toLowerCase().startsWith("loading") || !coverImage.startsWith("http")) {
      coverImage = PLACEHOLDER_COVER;
    }

    const postRecord = {
      tenant: TENANT_ID,
      slug,
      title,
      excerpt: (data.excerpt || "").trim(),
      content: body.trim(),
      cover_image: coverImage,
      date: data.date || new Date().toISOString(),
      author_name: data.author?.name || "Admin",
      author_picture: data.author?.picture || "",
    };

    // Check if post already exists for this tenant & slug
    try {
      const existing = await pb.collection("posts").getList(1, 1, {
        filter: `tenant = "${TENANT_ID}" && slug = "${slug}"`,
      });

      if (existing.items.length > 0) {
        const id = existing.items[0].id;
        await pb.collection("posts").update(id, postRecord);
        console.log(`  Updated existing post [${id}] (slug: ${slug})`);
        updatedCount++;
      } else {
        const created = await pb.collection("posts").create(postRecord);
        console.log(`  Created new post [${created.id}] (slug: ${slug})`);
        createdCount++;
      }
    } catch (err: any) {
      console.error(`  Error saving post "${title}":`, err?.message || err);
    }
  }

  console.log("\n=== Migration Summary ===");
  console.log(`Total files inspected: ${mdFiles.length}`);
  console.log(`Created: ${createdCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Skipped duplicates: ${skippedDuplicates}`);

  // Final verification
  const finalCheck = await pb.collection("posts").getList(1, 50, {
    filter: `tenant = "${TENANT_ID}"`,
    sort: "-date",
  });
  console.log(`\nFinal count in database for tenant ${TENANT_ID}: ${finalCheck.totalItems} posts`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

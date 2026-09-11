import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, PostsRecord } from "../pocketbase-types";

export const DataPosts = {
  // Create
  create: async (data: Partial<PostsRecord>) => {
    data.tenant = getTenantId();
    const r = await pb.collection(Collections.Posts).create(data);
    return r;
  },

  // Single by slug
  bySlug: async (slug: string) => {
    const r = await pb
      .collection(Collections.Posts)
      .getFirstListItem(`${TENANT_FILTER} && slug="${slug}"`);
    return r;
  },

  // All posts, sorted by date desc
  all: async () => {
    const r = await pb.collection(Collections.Posts).getFullList({
      filter: TENANT_FILTER,
      sort: "-date",
    });
    return r;
  },

  // Paginated
  read: async (
    page: number = 1,
    perPage: number = 50,
    filter: string = "",
    sort: string = "-date",
    fields: string = "",
  ) => {
    const fullFilter = filter
      ? `${TENANT_FILTER} && (${filter})`
      : TENANT_FILTER;
    const r = await pb.collection(Collections.Posts).getList(page, perPage, {
      filter: fullFilter,
      sort,
      fields,
    });
    return r;
  },

  // Update
  update: async (id: string, data: Partial<PostsRecord>) => {
    data.tenant = getTenantId();
    const r = await pb.collection(Collections.Posts).update(id, data);
    return r;
  },

  // Delete
  delete: async (id: string) => {
    const r = await pb.collection(Collections.Posts).delete(id);
    return r;
  },

  // Count
  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.Posts)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting posts:", error);
      return 0;
    }
  },
};

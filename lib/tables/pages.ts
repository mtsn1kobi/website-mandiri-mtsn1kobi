import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, PagesRecord } from "../pocketbase-types";

export const DataPages = {
  create: async (data: Partial<PagesRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Pages).create(data);
  },

  bySlug: async (slug: string) => {
    return await pb
      .collection(Collections.Pages)
      .getFirstListItem(`${TENANT_FILTER} && slug="${slug}"`);
  },

  all: async () => {
    return await pb.collection(Collections.Pages).getFullList({
      filter: TENANT_FILTER,
      sort: "-created",
    });
  },

  read: async (
    page: number = 1,
    perPage: number = 50,
    filter: string = "",
    sort: string = "-created",
    fields: string = "",
  ) => {
    const fullFilter = filter
      ? `${TENANT_FILTER} && (${filter})`
      : TENANT_FILTER;
    return await pb.collection(Collections.Pages).getList(page, perPage, {
      filter: fullFilter,
      sort,
      fields,
    });
  },

  update: async (id: string, data: Partial<PagesRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Pages).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.Pages).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.Pages)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting pages:", error);
      return 0;
    }
  },
};

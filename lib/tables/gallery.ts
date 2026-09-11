import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, GalleryRecord } from "../pocketbase-types";

export const DataGallery = {
  create: async (data: Partial<GalleryRecord>) => {
    data.tenant = getTenantId();
    return await pb
      .collection(Collections.Gallery)
      .create({ ...data, tenant: getTenantId() });
  },

  all: async () => {
    return await pb.collection(Collections.Gallery).getFullList({
      filter: TENANT_FILTER,
      sort: "-created",
    });
  },

  top10: async () => {
    return await pb.collection(Collections.Gallery).getList(1, 10, {
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
    return await pb.collection(Collections.Gallery).getList(page, perPage, {
      filter: fullFilter,
      sort,
      fields,
    });
  },

  update: async (id: string, data: Partial<GalleryRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Gallery).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.Gallery).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.Gallery)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting gallery items:", error);
      return 0;
    }
  },
};

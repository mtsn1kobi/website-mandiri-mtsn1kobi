import { getTenantId, pb, TENANT_FILTER } from "../db";
import {
  Collections,
  QuickPopularLinksRecord,
  QuickPopularLinksTypeOptions,
} from "../pocketbase-types";

export const DataQuickPopularLinks = {
  create: async (data: Partial<QuickPopularLinksRecord>) => {
    data.tenant = getTenantId();
    return await pb
      .collection(Collections.QuickPopularLinks)
      .create({ ...data, tenant: getTenantId() });
  },

  getByTenant: async (
    type: QuickPopularLinksTypeOptions,
  ): Promise<QuickPopularLinksRecord | null> => {
    const records = await pb
      .collection(Collections.QuickPopularLinks)
      .getFullList({
        filter: `${TENANT_FILTER} && type="${type}"`,
      });
    return records.length > 0 ? records[0] : null;
  },

  upsert: async (
    type: QuickPopularLinksTypeOptions,
    items: { name: string; url: string }[],
  ) => {
    const existing = await DataQuickPopularLinks.getByTenant(type);
    if (existing) {
      return await pb
        .collection(Collections.QuickPopularLinks)
        .update(existing.id, { item: items });
    } else {
      return await pb
        .collection(Collections.QuickPopularLinks)
        .create({ item: items, type, tenant: getTenantId() });
    }
  },

  all: async () => {
    return await pb.collection(Collections.QuickPopularLinks).getFullList({
      filter: TENANT_FILTER,
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
    return await pb
      .collection(Collections.QuickPopularLinks)
      .getList(page, perPage, {
        filter: fullFilter,
        sort,
        fields,
      });
  },

  update: async (id: string, data: Partial<QuickPopularLinksRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.QuickPopularLinks).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.QuickPopularLinks).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.QuickPopularLinks)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting quick/popular links:", error);
      return 0;
    }
  },
};

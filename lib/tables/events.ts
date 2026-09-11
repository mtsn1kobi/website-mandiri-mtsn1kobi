import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, EventsRecord } from "../pocketbase-types";

export const DataEvents = {
  create: async (data: Partial<EventsRecord>) => {
    data.tenant = getTenantId();
    return await pb
      .collection(Collections.Events)
      .create({ ...data, tenant: getTenantId() });
  },

  all: async () => {
    return await pb.collection(Collections.Events).getFullList({
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
    return await pb.collection(Collections.Events).getList(page, perPage, {
      filter: fullFilter,
      sort,
      fields,
    });
  },

  update: async (id: string, data: Partial<EventsRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Events).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.Events).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.Events)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting events:", error);
      return 0;
    }
  },
};

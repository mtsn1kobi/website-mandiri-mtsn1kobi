import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, MenusRecord } from "../pocketbase-types";

export const DataMenus = {
  create: async (data: Partial<MenusRecord>) => {
    data.tenant = getTenantId();
    return await pb
      .collection(Collections.Menus)
      .create({ ...data, tenant: getTenantId() });
  },

  all: async () => {
    return await pb.collection(Collections.Menus).getFullList({
      filter: TENANT_FILTER,
      sort: "order",
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
    return await pb.collection(Collections.Menus).getList(page, perPage, {
      filter: fullFilter,
      sort,
      fields,
    });
  },

  update: async (id: string, data: Partial<MenusRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Menus).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.Menus).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.Menus)
        .getList(1, 1, { filter: fullFilter });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting menus:", error);
      return 0;
    }
  },
};

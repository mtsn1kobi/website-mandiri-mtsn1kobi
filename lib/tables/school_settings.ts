import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections, SchoolSettingsRecord } from "../pocketbase-types";

export const DataSchoolSettings = {
  create: async (data: Partial<SchoolSettingsRecord>) => {
    data.tenant = getTenantId();
    return await pb
      .collection(Collections.SchoolSettings)
      .create({ ...data, tenant: getTenantId() });
  },

  all: async () => {
    return await pb.collection(Collections.SchoolSettings).getFullList({
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
      .collection(Collections.SchoolSettings)
      .getList(page, perPage, {
        filter: fullFilter,
        sort,
        fields,
      });
  },

  update: async (id: string, data: Partial<SchoolSettingsRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.SchoolSettings).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.SchoolSettings).delete(id);
  },

  count: async (filter: string = "") => {
    try {
      const fullFilter = filter
        ? `${TENANT_FILTER} && (${filter})`
        : TENANT_FILTER;
      const resp = await pb
        .collection(Collections.SchoolSettings)
        .getList(1, 1, { filter: fullFilter, fields: "id" });
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting events:", error);
      return 0;
    }
  },
};

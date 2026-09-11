import { getTenantId, pb } from "../db";
import { Collections, FilesRecord } from "../pocketbase-types";

export const DataFiles = {
  create: async (data: Partial<FilesRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Files).create(data);
  },

  all: async () => {
    return await pb.collection(Collections.Files).getFullList({
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
    return await pb.collection(Collections.Files).getList(page, perPage, {
      filter,
      sort,
      fields,
    });
  },

  update: async (id: string, data: Partial<FilesRecord>) => {
    data.tenant = getTenantId();
    return await pb.collection(Collections.Files).update(id, data);
  },

  delete: async (id: string) => {
    return await pb.collection(Collections.Files).delete(id);
  },

  count: async () => {
    try {
      const resp = await pb.collection(Collections.Files).getList(1, 1);
      return resp.totalItems;
    } catch (error) {
      console.error("Error counting files:", error);
      return 0;
    }
  },
};

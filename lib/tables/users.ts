import { getTenantId, pb } from "../db";
import { Collections, UsersRecord } from "../pocketbase-types";

export const DataUsers = {
  // Create
  create: async (data: Partial<UsersRecord>) => {
    const r = await pb.collection(Collections.Users).create(data);
    return r;
  },

  // Single
  single: async (id: string, fields: string = "") => {
    const r: UsersRecord = await pb.collection(Collections.Users).getOne(id, {
      fields,
    });
    return r;
  },

  // Read
  read: async (
    page: number = 1,
    perPage: number = 50,
    filter: string = "",
    sort: string = "-created",
    fields: string = "",
  ) => {
    const r = await pb.collection(Collections.Users).getList(page, perPage, {
      filter,
      sort,
      fields,
    });
    return r;
  },

  // Update
  update: async (id: string, data: Partial<UsersRecord>) => {
    const r = await pb.collection(Collections.Users).update(id, data);
    return r;
  },

  // Delete
  delete: async (id: string) => {
    const r = await pb.collection(Collections.Users).delete(id);
    return r;
  },

  // Count
  count: async (filter: string = "") => {
    try {
      const resp = await pb
        .collection(Collections.Users)
        .getList(1, 1, { filter });

      return resp.totalItems;
    } catch (error) {
      console.error("Error counting records:", error);
      return 0;
    }
  },
};

import { getTenantId, pb, TENANT_FILTER } from "../db";
import { Collections } from "../pocketbase-types";

export const DataVisiMisi = {
  read: async () => {
    const records = await pb
      .collection(Collections.VisiMisi)
      .getFullList({ filter: TENANT_FILTER });
    return records;
  },

  upsert: async (data: { Visi: string; Misi: string[] }) => {
    const records = await pb
      .collection(Collections.VisiMisi)
      .getFullList({ filter: TENANT_FILTER });
    if (records.length > 0) {
      return await pb
        .collection(Collections.VisiMisi)
        .update(records[0].id, { item: data });
    }
    return await pb
      .collection(Collections.VisiMisi)
      .create({ tenant: getTenantId(), type: "visi", item: data });
  },
};

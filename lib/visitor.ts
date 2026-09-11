import { getTenantId } from "./db";

const BASE = "https://global-state.bimasoft.sg2.app.web.id";

function key(namespace: string) {
  return `sekolah:visitor:${namespace}`;
}

async function api(action: "get" | "set", body: Record<string, string>) {
  const res = await fetch(`${BASE}/?_=/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export const DataVisitor = {
  /** Increment visitor counter for the given namespace and return new count */
  increment: async (namespace: string): Promise<number> => {
    try {
      const { value } = await api("get", { key: key(namespace) });
      const current = parseInt(value || "0", 10);
      const next = current + 1;
      await api("set", { key: key(namespace), value: String(next) });
      return next;
    } catch {
      return 0;
    }
  },

  /** Get visitor count without incrementing */
  get: async (namespace: string): Promise<number> => {
    try {
      const { value } = await api("get", { key: key(namespace) });
      return parseInt(value || "0", 10);
    } catch {
      return 0;
    }
  },
};
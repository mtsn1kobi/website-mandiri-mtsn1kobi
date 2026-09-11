import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";
import tenantMap from "./tenant.json";

export const pb = new PocketBase(
  "https://sekolah-backend.sg2.app.web.id",
) as TypedPocketBase;

const DEFAULT_TENANT = "ailsyta6k6p7xcb";

export const getTenantId = () => {
  if (typeof window === "undefined") {
    return DEFAULT_TENANT;
  }

  const hostname = window.location.hostname.replace("www.", "");
  return (tenantMap as Record<string, string>)[hostname] || DEFAULT_TENANT;
};

export const TENANT_FILTER = `tenant = "${getTenantId()}"`;

pb.autoCancellation(false);

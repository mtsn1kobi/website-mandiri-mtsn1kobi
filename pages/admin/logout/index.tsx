import { useEffect } from "react";
import { useRouter } from "next/router";
import { pb } from "../../../lib/db";

export default function AdminLogout() {
  const router = useRouter();

  useEffect(() => {
    pb.authStore.clear();
    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Logging out...</span>
      </div>
    </div>
  );
}

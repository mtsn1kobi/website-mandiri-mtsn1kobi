import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { pb } from "../../../lib/db";

export default function MediaPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to list files from Pocketbase storage
    (async () => {
      try {
        // Pocketbase doesn't have a direct file listing API,
        // but we can show link to PB admin and use cs-upload
        setLoading(false);
      } catch (err) {
        console.error("Failed to load media:", err);
        setLoading(false);
      }
    })();
  }, []);

  const uploadServer = pb.baseUrl + "/api/files";

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Media"]}
      sidebar={adminSidebar}
      activePath="/admin/media"
    >
      <h1>Media</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Upload and manage files for your website
      </p>

      <div className="settings-section">
        <h3>Upload New File</h3>
        <div style={{ maxWidth: "500px" }}>
          <cs-upload
            id="file-upload"
            label="Choose a file"
            server={uploadServer}
            folder={`media/${new Date().getFullYear()}`}
            limit={10}
          ></cs-upload>
        </div>
        <p style={{ color: "#71717a", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Supported: JPG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX. Max 10MB.
        </p>
      </div>

      <div className="settings-section">
        <h3>Image URLs Reference</h3>
        <p style={{ color: "#71717a", marginBottom: "1rem" }}>
          Use these base URLs when entering image paths in content fields:
        </p>
        <div style={{
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
        }}>
          <div style={{ padding: "1rem", border: "1px solid #e4e4e7", borderRadius: "0.5rem" }}>
            <strong>Pocketbase Files</strong>
            <p style={{ fontSize: "0.8rem", color: "#71717a", wordBreak: "break-all", marginTop: "0.25rem" }}>
              {pb.baseUrl}/api/files/collectionName/recordId/fileName
            </p>
          </div>
          <div style={{ padding: "1rem", border: "1px solid #e4e4e7", borderRadius: "0.5rem" }}>
            <strong>External CDN</strong>
            <p style={{ fontSize: "0.8rem", color: "#71717a", wordBreak: "break-all", marginTop: "0.25rem" }}>
              https://cdnhost2.bimasoft.web.id/...
            </p>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Pocketbase Admin</h3>
        <p style={{ color: "#71717a", marginBottom: "0.75rem" }}>
          For advanced file management, use the Pocketbase admin panel:
        </p>
        <a
          href={`${pb.baseUrl}/_/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "#18181b",
            color: "#fafafa",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Open Pocketbase Admin
        </a>
      </div>
    </AdminLayout>
  );
}

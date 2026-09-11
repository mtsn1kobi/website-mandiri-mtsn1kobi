import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataFiles } from "../../../lib/tables/files";

const STORAGE_LIMIT_GB = 100;

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

function bytesToGB(bytes: number): number {
  return bytes / (1024 * 1024 * 1024);
}

function totalBytes(files: any[]): number {
  return files.reduce((acc: number, f: any) => acc + (Number(f.size) || 0), 0);
}

interface EditingRow {
  id: string;
  judul: string;
  link: string;
  size: number;
}

export default function FilesPage() {
  const [filesData, setFilesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);

  // new-row form state
  const [newJudul, setNewJudul] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newSize, setNewSize] = useState(0);

  // edit-row form state
  const [editLink, setEditLink] = useState("");
  const [editSize, setEditSize] = useState(0);

  const uploadServer = "https://drive.next.app.web.id/";
  const uploadFolder = `files/${new Date().getFullYear()}`;

  const loadData = async () => {
    const records = await DataFiles.all();
    setFilesData(records as any[]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Wire up cs-upload callbacks after mount
  useEffect(() => {
    if (loading) return;

    if (showAddForm) {
      const el = document.getElementById(
        "files-add-upload",
      ) as unknown as CSElement["cs-upload"];
      if (el) {
        el.onchange = (e: any) => setNewLink(e.target?.value ?? "");

        el.onupload = (info) => {
          setNewLink(info.link);
          setNewSize(info.size);
        };
      }
    }

    if (editingRow) {
      const el = document.getElementById(
        "files-edit-upload",
      ) as unknown as CSElement["cs-upload"];
      if (el) {
        el.onchange = (e: any) => setEditLink(e.target?.value ?? "");
        el.onupload = (info) => {
          setEditLink(info.link);
          setEditSize(info.size);
        };
      }
    }
  }, [loading, showAddForm, editingRow]);

  const handleAdd = async () => {
    if (!newJudul.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }
    setSaving(true);
    try {
      const data = {
        judul: newJudul,
        link: newLink,
        size: newSize,
      };

      console.log(data);

      await DataFiles.create(data);

      toast.success("File ditambahkan");

      setNewJudul("");
      setNewLink("");
      setNewSize(0);
      setShowAddForm(false);
      await loadData();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (row: any) => {
    setEditingRow({
      id: row.id,
      judul: row.judul ?? "",
      link: row.link ?? "",
      size: row.size ?? 0,
    });
    setEditLink(row.link ?? "");
    setEditSize(row.size ?? 0);
  };

  const handleEditSave = async () => {
    if (!editingRow) return;
    setSaving(true);
    try {
      await DataFiles.update(editingRow.id, {
        judul: editingRow.judul,
        link: editLink,
        size: editSize,
      });
      toast.success?.("File diperbarui");
      setEditingRow(null);
      await loadData();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus file ini?")) return;
    setDeletingId(id);
    try {
      await DataFiles.delete(id);
      toast.success("File dihapus");
      await loadData();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  const copyEmbed = (link: string) => {
    let formattedLink = link;
    if (link.includes("drive.google.com")) {
      formattedLink = `${link}/preview`;
    }
    navigator.clipboard.writeText(
      `<iframe src="${formattedLink}" width="640" height="480"></iframe>`,
    );
    toast.success?.("Embed code copied to clipboard");
  };

  const usedBytes = totalBytes(filesData);
  const usedGB = bytesToGB(usedBytes);
  const pct = Math.min((usedGB / STORAGE_LIMIT_GB) * 100, 100);

  const barColor =
    pct < 60
      ? "linear-gradient(90deg,#22c55e,#16a34a)"
      : pct < 85
        ? "linear-gradient(90deg,#f59e0b,#d97706)"
        : "linear-gradient(90deg,#ef4444,#dc2626)";

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard", "Files"]}
        sidebar={adminSidebar}
        activePath="/admin/files"
      >
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard", "Files"]}
      sidebar={adminSidebar}
      activePath="/admin/files"
    >
      <h1>Files Management</h1>
      <p style={{ color: "#71717a", marginBottom: "1.5rem" }}>
        Manage files and Google Drive links
      </p>

      {/* ── Storage Counter ── */}
      <div
        style={{
          background: "var(--card-bg, #fff)",
          border: "1px solid var(--border, #e4e4e7)",
          borderRadius: "0.75rem",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          maxWidth: "560px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Storage Used
          </span>
          <span style={{ fontSize: "0.875rem", color: "#71717a" }}>
            <strong style={{ color: pct >= 85 ? "#ef4444" : "inherit" }}>
              {usedGB.toFixed(2)} GB
            </strong>{" "}
            of {STORAGE_LIMIT_GB} GB
          </span>
        </div>
        <div
          style={{
            height: "10px",
            background: "#e4e4e7",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: barColor,
              borderRadius: "9999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <p
          style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: "#71717a" }}
        >
          {filesData.length} file{filesData.length !== 1 ? "s" : ""} ·{" "}
          {formatBytes(usedBytes)} total
        </p>
      </div>

      {/* ── Add Button ── */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditingRow(null);
          }}
          style={{
            background: "#18181b",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.5rem 1.25rem",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          {showAddForm ? "✕ Batal" : "+ Tambah File"}
        </button>
      </div>

      {/* ── Add Form ── */}
      {showAddForm && (
        <div
          style={{
            background: "var(--card-bg,#f9f9f9)",
            border: "1px solid var(--border,#e4e4e7)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            maxWidth: "560px",
            display: "grid",
            gap: "1rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1rem" }}>Tambah File Baru</h3>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginBottom: "0.3rem",
              }}
            >
              Judul <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={newJudul}
              onChange={(e) => setNewJudul(e.target.value)}
              placeholder="Judul file"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #e4e4e7",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginBottom: "0.3rem",
              }}
            >
              File Upload
            </label>
            <cs-upload
              id="files-add-upload"
              label="Pilih File"
              server={uploadServer}
              folder={uploadFolder}
              limit={100}
            ></cs-upload>
            {newLink && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#71717a",
                  marginTop: "0.25rem",
                  wordBreak: "break-all",
                }}
              >
                URL: {newLink}
              </p>
            )}
            {newSize > 0 && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#71717a",
                  margin: "0.15rem 0 0",
                }}
              >
                Ukuran: {formatBytes(newSize)}
              </p>
            )}
          </div>

          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              onClick={handleAdd}
              disabled={saving}
              style={{
                background: "#18181b",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem 1.25rem",
                cursor: saving ? "not-allowed" : "pointer",
                fontWeight: 500,
                fontSize: "0.875rem",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                background: "transparent",
                color: "#71717a",
                border: "1px solid #e4e4e7",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ── Edit Form ── */}
      {editingRow && (
        <div
          style={{
            background: "var(--card-bg,#f0f9ff)",
            border: "1px solid #bae6fd",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            maxWidth: "560px",
            display: "grid",
            gap: "1rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1rem" }}>Edit File</h3>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginBottom: "0.3rem",
              }}
            >
              Judul
            </label>
            <input
              type="text"
              value={editingRow.judul}
              onChange={(e) =>
                setEditingRow((r) => (r ? { ...r, judul: e.target.value } : r))
              }
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #e4e4e7",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 500,
                marginBottom: "0.3rem",
              }}
            >
              Ganti File (opsional)
            </label>
            <cs-upload
              id="files-edit-upload"
              label="Pilih File Baru"
              server={uploadServer}
              folder={uploadFolder}
              limit={100}
              value={editingRow.link}
            ></cs-upload>
            {editLink && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#71717a",
                  marginTop: "0.25rem",
                  wordBreak: "break-all",
                }}
              >
                URL: {editLink}
              </p>
            )}
            {editSize > 0 && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#71717a",
                  margin: "0.15rem 0 0",
                }}
              >
                Ukuran: {formatBytes(editSize)}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handleEditSave}
              disabled={saving}
              style={{
                background: "#0284c7",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem 1.25rem",
                cursor: saving ? "not-allowed" : "pointer",
                fontWeight: 500,
                fontSize: "0.875rem",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              onClick={() => setEditingRow(null)}
              style={{
                background: "transparent",
                color: "#71717a",
                border: "1px solid #e4e4e7",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ── Files Table ── */}
      <div
        style={{
          background: "var(--card-bg,#fff)",
          border: "1px solid var(--border,#e4e4e7)",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f5", textAlign: "left" }}>
              <th
                style={{
                  padding: "0.75rem 1rem",
                  fontWeight: 600,
                  color: "#3f3f46",
                }}
              >
                Judul
              </th>
              <th
                style={{
                  padding: "0.75rem 1rem",
                  fontWeight: 600,
                  color: "#3f3f46",
                }}
              >
                File
              </th>
              <th
                style={{
                  padding: "0.75rem 1rem",
                  fontWeight: 600,
                  color: "#3f3f46",
                }}
              >
                Ukuran
              </th>
              <th
                style={{
                  padding: "0.75rem 1rem",
                  fontWeight: 600,
                  color: "#3f3f46",
                }}
              >
                Tanggal
              </th>
              <th
                style={{
                  padding: "0.75rem 1rem",
                  fontWeight: 600,
                  color: "#3f3f46",
                  textAlign: "right",
                }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filesData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "2rem 1rem",
                    textAlign: "center",
                    color: "#71717a",
                  }}
                >
                  Belum ada file. Klik &quot;+ Tambah File&quot; untuk
                  menambahkan.
                </td>
              </tr>
            )}
            {filesData.map((row: any, idx: number) => (
              <tr
                key={row.id}
                style={{
                  borderTop: "1px solid #f0f0f0",
                  background: idx % 2 === 0 ? "#fff" : "#fafafa",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    "#f0f9ff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background =
                    idx % 2 === 0 ? "#fff" : "#fafafa")
                }
              >
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.judul || <span style={{ color: "#a1a1aa" }}>—</span>}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  {row.link ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#0284c7",
                          textDecoration: "underline",
                        }}
                      >
                        Link
                      </a>
                      <button
                        title="Copy embed code"
                        onClick={() => copyEmbed(row.link)}
                        style={{
                          background: "none",
                          border: "1px solid #e4e4e7",
                          borderRadius: "4px",
                          padding: "2px 5px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/icons/embed-svgrepo-com.svg"
                          style={{ width: "14px", height: "14px" }}
                          alt="embed"
                        />
                      </button>
                    </span>
                  ) : (
                    <span style={{ color: "#a1a1aa" }}>—</span>
                  )}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "#52525b" }}>
                  {row.size ? (
                    formatBytes(Number(row.size))
                  ) : (
                    <span style={{ color: "#a1a1aa" }}>—</span>
                  )}
                </td>
                <td
                  style={{
                    padding: "0.75rem 1rem",
                    color: "#71717a",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.created
                    ? new Date(row.created).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => startEdit(row)}
                      style={{
                        background: "#f4f4f5",
                        border: "1px solid #e4e4e7",
                        borderRadius: "0.375rem",
                        padding: "0.3rem 0.7rem",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deletingId === row.id}
                      style={{
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "0.375rem",
                        padding: "0.3rem 0.7rem",
                        cursor:
                          deletingId === row.id ? "not-allowed" : "pointer",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "#dc2626",
                        opacity: deletingId === row.id ? 0.6 : 1,
                      }}
                    >
                      {deletingId === row.id ? "…" : "Hapus"}
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import AdminLayout from "../../../components/adminlayout";
import { adminSidebar } from "../../../lib/admin-sidebar";
import { DataPosts } from "../../../lib/tables/posts";
import { DataPages } from "../../../lib/tables/pages";
import { DataTeachers } from "../../../lib/tables/teachers";
import { DataEvents } from "../../../lib/tables/events";
import { DataSliderItems } from "../../../lib/tables/slider_items";
import { getTenantId } from "../../../lib/db";

interface DashboardStats {
  posts: number;
  pages: number;
  teachers: number;
  events: number;
  sliders: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    posts: 0,
    pages: 0,
    teachers: 0,
    events: 0,
    sliders: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [
          postCount,
          pageCount,
          teacherCount,
          eventCount,
          sliderCount,
          posts,
        ] = await Promise.all([
          DataPosts.count(),
          DataPages.count(),
          DataTeachers.count(),
          DataEvents.count(),
          DataSliderItems.count(),
          DataPosts.read(1, 5, "", "-date", "title,date,created"),
        ]);
        setStats({
          posts: postCount,
          pages: pageCount,
          teachers: teacherCount,
          events: eventCount,
          sliders: sliderCount,
        });
        setRecentPosts(posts.items || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard"]}
        sidebar={adminSidebar}
        activePath="/admin/dashboard"
      >
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout
        title="Admin"
        subtitle="Admin Panel"
        breadcrumb={["Dashboard"]}
        sidebar={adminSidebar}
        activePath="/admin/dashboard"
      >
        <div style={{ textAlign: "center", padding: "3rem", color: "red" }}>
          <p>Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin"
      subtitle="Admin Panel"
      breadcrumb={["Dashboard"]}
      sidebar={adminSidebar}
      activePath="/admin/dashboard"
    >
      <h1>Dashboard</h1>
      <p
        style={{
          color: "#71717a",
          marginBottom: "1.5rem",
        }}
      >
        Overview of your website content
      </p>
      <p>ID SEKOLAH : {getTenantId()}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.posts}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pages}</div>
          <div className="stat-label">Total Pages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.teachers}</div>
          <div className="stat-label">Teachers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.events}</div>
          <div className="stat-label">Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.sliders}</div>
          <div className="stat-label">Slider Items</div>
        </div>
      </div>

      <h2>Recent Posts</h2>
      {recentPosts.length === 0 ? (
        <p style={{ color: "#71717a" }}>No posts yet.</p>
      ) : (
        <table
          className="table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #e4e4e7",
                textAlign: "left",
              }}
            >
              <th
                style={{
                  padding: "0.75rem 0.5rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "0.75rem 0.5rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((post: any) => (
              <tr
                key={post.id || post.slug}
                style={{ borderBottom: "1px solid #e4e4e7" }}
              >
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {post.title || "—"}
                </td>
                <td
                  style={{
                    padding: "0.75rem 0.5rem",
                    color: "#71717a",
                  }}
                >
                  {post.date ? new Date(post.date).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

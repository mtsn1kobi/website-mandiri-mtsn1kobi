import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { pb } from "../lib/db";
import { DataSchoolSettings } from "../lib/tables/school_settings";

export interface AdminNavItem {
  title: string;
  link?: string;
  icon?: string;
  childs?: Array<{ title: string; link: string }>;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumb?: string[];
  sidebar?: Record<string, AdminNavItem[]>;
  activePath?: string;
  logo?: string;
}

export default function AdminLayout({
  children,
  title: propTitle = "CS Dashboard",
  subtitle = "Admin Panel",
  breadcrumb = ["Dashboard", "Overview"],
  sidebar = {},
  activePath = "/admin/dashboard",
  logo: propLogo,
}: AdminLayoutProps) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [schoolName, setSchoolName] = useState(propTitle);
  const [schoolLogo, setSchoolLogo] = useState(propLogo || "");
  const settingsLoaded = useRef(false);
  const dashboardReady = useRef(false);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.replace("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authed || settingsLoaded.current) return;
    settingsLoaded.current = true;
    DataSchoolSettings.read(1, 1).then((res) => {
      const item = res.items[0];
      if (item) {
        setSchoolName(item.nama_sekolah || propTitle);
        setSchoolLogo(item.logo || propLogo || "");
      }
    }).catch(() => {});
  }, [authed, propTitle, propLogo]);

  useEffect(() => {
    if (!authed) return;

    const trySetup = () => {
      const dashboard = document.getElementById(
        "dashboard",
      ) as unknown as CSElement["cs-dashboard"];

      if (!dashboard) {
        setTimeout(trySetup, 100);
        return;
      }

      dashboardReady.current = true;
      dashboard.logo = schoolLogo || "https://placehold.co/64x64/EEE/31343C?text=S";
      dashboard.title = schoolName;
      dashboard.subtitle = subtitle;
      dashboard.breadcrumb = breadcrumb;
      dashboard.sidebar = sidebar;
      dashboard.activePath = activePath;
    };

    if (!dashboardReady.current) {
      if (customElements.get("cs-dashboard")) {
        trySetup();
      } else {
        customElements.whenDefined("cs-dashboard").then(trySetup);
      }
    } else {
      const dashboard = document.getElementById(
        "dashboard",
      ) as unknown as CSElement["cs-dashboard"];
      if (dashboard) {
        dashboard.logo = schoolLogo || "https://placehold.co/64x64/EEE/31343C?text=S";
        dashboard.title = schoolName;
        dashboard.subtitle = subtitle;
        dashboard.breadcrumb = breadcrumb;
        dashboard.sidebar = sidebar;
        dashboard.activePath = activePath;
      }
    }
  }, [authed, schoolName, schoolLogo, subtitle, breadcrumb, sidebar, activePath]);

  if (!authed) return null;

  return (
    <>
      <Head>
        <script src="https://pages-github.b-cdn.net/webcomponents/modules/cs-dashboard.js"></script>
      </Head>
      <style>{`
        .admin-content {
          padding: 1rem 0;
        }
        .admin-content h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .admin-content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          background: hsl(var(--card, 0 0% 100%));
          border: 1px solid hsl(var(--border, 240 5.9% 90%));
          border-radius: var(--radius, 0.5rem);
          padding: 1.25rem;
        }
        .stat-card .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: hsl(var(--foreground, 240 10% 3.9%));
        }
        .stat-card .stat-label {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground, 240 3.8% 46.1%));
          margin-top: 0.25rem;
        }
        .settings-section {
          margin-bottom: 2rem;
        }
        .settings-section h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid hsl(var(--border, 240 5.9% 90%));
        }
      `}</style>
      <cs-toast></cs-toast>
      <div className="text-dark">
        <cs-dashboard id="dashboard">
          <div className="content admin-content">{children}</div>
        </cs-dashboard>
      </div>
    </>
  );
}

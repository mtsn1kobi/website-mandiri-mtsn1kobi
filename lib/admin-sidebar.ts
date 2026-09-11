import type { AdminNavItem } from "../components/adminlayout";

export const adminSidebar: Record<string, AdminNavItem[]> = {
  Main: [
    {
      title: "Dashboard",
      icon: "/icons/dashboard-svgrepo-com.svg",
      link: "/admin/dashboard",
    },
    {
      title: "Visit Website",
      icon: "/icons/eye-svgrepo-com.svg",
      link: "/",
    },
  ],
  Content: [
    {
      title: "Posts",
      icon: "/icons/edit-alt-3-svgrepo-com.svg",
      link: "/admin/posts",
    },
    {
      title: "Pages",
      icon: "/icons/page-break-svgrepo-com.svg",
      link: "/admin/pages",
    },
    {
      title: "Comments",
      icon: "/icons/chat-comment-message-svgrepo-com.svg",
      link: "/admin/comments",
    },
    {
      title: "Gallery",
      icon: "/icons/image-svgrepo-com.svg",
      link: "/admin/gallery",
    },
    {
      title: "Events",
      icon: "/icons/event-available-svgrepo-com.svg",
      link: "/admin/events",
    },
    {
      title: "Files",
      icon: "/icons/file-svgrepo-com.svg",
      link: "/admin/files",
    },
    {
      title: "Slider",
      icon: "/icons/slider-minimalistic-horizontal-svgrepo-com.svg",
      link: "/admin/slider",
    },
  ],
  Management: [
    {
      title: "Settings",
      icon: "/icons/settings-svgrepo-com(1).svg",
      link: "/admin/settings",
    },
    {
      title: "Media",
      icon: "/icons/image-svgrepo-com.svg",
      link: "/admin/media",
    },
    {
      title: "Teachers",
      icon: "/icons/teacher-svgrepo-com.svg",
      link: "/admin/teachers",
    },
    {
      title: "Logout",
      icon: "/icons/logout-svgrepo-com.svg",
      link: "/admin/logout",
    },
  ],
};

export const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/posts": "Posts",
  "/admin/pages": "Pages",
  "/admin/comments": "Comments",
  "/admin/slider": "Slider",
  "/admin/gallery": "Gallery",
  "/admin/teachers": "Teachers",
  "/admin/events": "Events",
  "/admin/settings": "Settings",
  "/admin/media": "Media",
  "/admin/files": "Files",
};

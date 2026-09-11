import Head from "next/head";
import { useEffect } from "react";
import { getTenantId } from "../lib/db";
import { SiteSettings } from "../lib/tables/settings";
import Header1 from "./headers/Header1";
import Header6 from "./headers/Header6";

const Header = (props: { s: SiteSettings }) => {
  const id = getTenantId();
  const logo = props.s?.InfoSekolah?.Logo;

  useEffect(() => {
    if (logo) {
      const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (link) {
        link.href = logo;
      }
      const appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
      if (appleLink) {
        appleLink.href = logo;
      }
    }
  }, [logo]);

  return (
    <>
      {logo && (
        <Head>
          <link rel="icon" href={logo} />
          <link rel="apple-touch-icon" href={logo} />
        </Head>
      )}
      {id === "ailsyta6k6p7xcb" ? (
        <Header6 {...props} />
      ) : (
        <Header1 {...props} />
      )}
    </>
  );
};

export default Header;

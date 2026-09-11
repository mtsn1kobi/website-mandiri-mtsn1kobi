import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getTenantId } from "../lib/db";
import { DataVisitor } from "../lib/visitor";
import { DataSchoolSettings } from "../lib/tables/school_settings";
import "../styles/index.css";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [faviconUrl, setFaviconUrl] = useState<string>("");

  useEffect(() => {
    const namespace = getTenantId();
    DataVisitor.increment(namespace);
  }, [router.pathname]);

  useEffect(() => {
    DataSchoolSettings.read(1, 1)
      .then((res) => {
        const logo = res.items[0]?.logo;
        if (logo) {
          setFaviconUrl(logo);
          const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
          if (link) {
            link.href = logo;
          } else {
            const newLink = document.createElement("link");
            newLink.rel = "icon";
            newLink.href = logo;
            document.head.appendChild(newLink);
          }

          const appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
          if (appleLink) {
            appleLink.href = logo;
          } else {
            const newAppleLink = document.createElement("link");
            newAppleLink.rel = "apple-touch-icon";
            newAppleLink.href = logo;
            document.head.appendChild(newAppleLink);
          }
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

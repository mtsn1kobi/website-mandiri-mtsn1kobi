import Head from "next/head";
import type { Settings } from "../../lib/tables/settings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { DataSettings } from "../../lib/tables/settings";
import { DataPages } from "../../lib/tables/pages";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import markdownToHtml from "../../lib/markdownToHtml";

export default function PagesDirectory() {
  const router = useRouter();
  const { slug } = router.query;
  const [s, setS] = useState<Settings | null>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [singlePage, setSinglePage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    if (slug && typeof slug === "string") {
      let cancelled = false;
      DataPages.bySlug(slug)
        .then(async (record) => {
          if (cancelled) return;
          const content = await markdownToHtml(record.content || "");
          const strippedHTML = content.replace(/<[^>]+>/g, "").trim();
          const isValidUrl = /^(https?:\/\/|mailto:|tel:)/.test(strippedHTML);

          if (isValidUrl) {
            window.location.href = strippedHTML;
            return;
          }

          setSinglePage({
            id: record.id,
            slug: record.slug,
            title: record.title,
            content: content.replace("---SEPARATOR---", ""),
          });

          setLoading(false);
        })
        .catch((err) => {
          if (!cancelled) {
            console.error(err);
            setLoadError(true);
          }
        });
      return () => {
        cancelled = true;
      };
    } else {
      DataPages.all()
        .then((records) => {
          setPages(records || []);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [slug]);

  if (!slug || !s || loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return <ErrorPage statusCode={404} />;
  }

  // Single page view
  if (singlePage) {
    const title = `${singlePage.title} | Official Website ${s.InfoSekolah.Nama}`;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Header s={s} />

        <div
          className="container-fluid page-header py-6 my-6 mt-0 wow fadeIn mb-0"
          data-wow-delay="0.1s"
          style={{
            visibility: "visible",
            animationDelay: "0.1s",
            animationName: "fadeIn",
            background: `linear-gradient(rgba(0, 0, 0, .75), rgba(0, 0, 0, .75)), url("/img/banner.jpg") center center no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <div className="container text-center">
            <h1 className="display-4 text-white slideInDown mb-4">
              {singlePage.title}
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item text-white">
                  <a href="/pages/" className="text-white">
                    Home
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  {singlePage.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container pt-5" id="post">
          <div className="row">
            <div
              className="col-lg-8 col-md-8"
              dangerouslySetInnerHTML={{ __html: singlePage.content }}
            ></div>
            <div className="col-lg-4 col-md-4">
              {s.QuickLinks && Object.keys(s.QuickLinks).length > 0 && (
                <div
                  className="bg-light rounded p-4"
                  style={{ position: "sticky", top: "100px" }}
                >
                  <h5 className="mb-3 text-primary">Quick Links</h5>
                  <ul className="list-unstyled mb-0">
                    {Object.keys(s.QuickLinks).map((key, i) => (
                      <li key={i} className="mb-2">
                        <a
                          href={s.QuickLinks[key]}
                          className="text-decoration-none"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-link text-primary me-2"></i>
                          {key}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer s={s} />
      </>
    );
  }

  // Directory listing
  const title = `Halaman | Official Website ${s.InfoSekolah.Nama}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header s={s} />

      <div
        className="container-fluid page-header py-6 my-6 mt-0 wow fadeIn mb-0"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
          background: `linear-gradient(rgba(0, 0, 0, .75), rgba(0, 0, 0, .75)), url("/img/banner.jpg") center center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 text-white slideInDown mb-4">Halaman</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item text-white">Home</li>
              <li
                className="breadcrumb-item text-primary active"
                aria-current="page"
              >
                Halaman
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{
              maxWidth: "500px",
              visibility: "hidden",
              animationDelay: "0.1s",
              animationName: "none",
            }}
          >
            <h6 className="text-primary text-uppercase mb-2">HALAMAN</h6>
            <h1 className="display-6 mb-4">Daftar Halaman</h1>
          </div>
          <div className="row g-4">
            {pages.map((page: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6 wow fadeInUp">
                <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                  <div className="text-center p-4 pt-0">
                    <h5 className="mb-3 mt-4">
                      <a
                        className="text-dark"
                        href={`/pages/?slug=${page.slug}`}
                      >
                        {page.title || page.slug}
                      </a>
                    </h5>
                    <ol className="breadcrumb justify-content-center mb-0">
                      <li className="breadcrumb-item small">
                        <i className="fa fa-file text-primary me-2"></i>
                        {page.slug}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pages.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">Tidak ada halaman tersedia.</p>
            </div>
          )}
        </div>
      </div>

      <Footer s={s} />
    </>
  );
}

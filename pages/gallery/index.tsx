import Head from "next/head";
import type { Settings } from "../../lib/tables/settings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { DataSettings } from "../../lib/tables/settings";
import { DataGallery } from "../../lib/tables/gallery";

export default function GalleryPage() {
  const [s, setS] = useState<Settings | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  const [hasMoreGallery, setHasMoreGallery] = useState(true);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    DataGallery.read(1, 16)
      .then((result) => {
        setGallery(result.items || []);
        setGalleryPage(result.page);
        setHasMoreGallery(result.page < result.totalPages);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const loadMoreGallery = () => {
    if (galleryLoading || !hasMoreGallery) return;
    setGalleryLoading(true);
    const nextPage = galleryPage + 1;
    DataGallery.read(nextPage, 16)
      .then((result) => {
        setGallery((prev) => [...prev, ...(result.items || [])]);
        setGalleryPage(nextPage);
        setHasMoreGallery(result.page < result.totalPages);
      })
      .catch(console.error)
      .finally(() => setGalleryLoading(false));
  };

  if (!s || loading) {
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

  const title = `Galeri | Official Website ${s.InfoSekolah.Nama}`;

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
          <h1 className="display-4 text-white slideInDown mb-4">Galeri</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item text-white">Home</li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Galeri
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
            <h6 className="text-primary text-uppercase mb-2">GALERI</h6>
            <h1 className="display-6 mb-4">Dokumentasi Kegiatan</h1>
          </div>
          <div className="row g-3">
            {gallery.map((item: any, i: number) => (
              <div
                key={i}
                className="col-6 col-md-4 col-lg-3 wow fadeInUp"
                data-wow-delay={`${0.05 * (i % 4)}s`}
              >
                <div
                  className="position-relative overflow-hidden h-100"
                  style={{ borderRadius: "8px" }}
                >
                  <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt={item.title || "Gallery"}
                    style={{ height: 220, objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      top: 0,
                      left: 0,
                      background: "rgba(0,0,0,0.5)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = "0";
                    }}
                  >
                    <div className="text-center p-2">
                      {item.title && (
                        <p className="text-white mb-1 small">{item.title}</p>
                      )}
                      {item.description && (
                        <p className="text-white-50 small mb-0">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMoreGallery && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary border-2"
                onClick={loadMoreGallery}
                disabled={galleryLoading}
              >
                {galleryLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer s={s} />
    </>
  );
}

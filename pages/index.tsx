import Head from "next/head";
import type { Settings } from "../lib/tables/settings";
import Header from "../components/header";
import Footer from "../components/footer";
import Slider from "../components/slider";
import { useEffect, useState } from "react";
import { DataSettings } from "../lib/tables/settings";
import { DataEvents } from "../lib/tables/events";
import { DataGallery } from "../lib/tables/gallery";
import { DataTeachers } from "../lib/tables/teachers";

export default function Index() {
  const [s, setS] = useState<Settings | null>(null);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [guru, setGuru] = useState<any[]>([]);

  const [galleryPage, setGalleryPage] = useState(1);
  const [guruPage, setGuruPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);

  const [galleryLoading, setGalleryLoading] = useState(false);
  const [guruLoading, setGuruLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const [hasMoreGallery, setHasMoreGallery] = useState(true);
  const [hasMoreGuru, setHasMoreGuru] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    import("../lib/tables/posts")
      .then(({ DataPosts }) => {
        DataPosts.read(1, 3)
          .then((result) => {
            setAllPosts(
              result.items.map((post) => ({
                slug: post.slug,
                title: post.title,
                date: post.date || post.created,
                author: {
                  name: post.author_name || "Admin",
                  picture: post.author_picture || "",
                },
                coverImage: post.cover_image || "",
                excerpt: post.excerpt || "",
              })),
            );
            setHasMorePosts(result.page < result.totalPages);
          })
          .catch(console.error);
      })
      .catch(console.error);

    DataGallery.read(1, 4)
      .then((result) => {
        setGallery(result.items || []);
        setHasMoreGallery(result.page < result.totalPages);
      })
      .catch(console.error);

    DataEvents.all()
      .then((records: any[]) => {
        setEvents(records);
      })
      .catch(console.error);

    DataTeachers.read(1, 4)
      .then((result) => {
        setGuru(
          (result.items || []).map((r: any) => ({
            Nama: r.nama || "",
            Foto: r.foto || "",
            Mapel: r.mapel || "",
            Facebook: r.facebook || "",
            Twitter: r.twitter || "",
            Instagram: r.instagram || "",
          })),
        );
        setHasMoreGuru(result.page < result.totalPages);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!s?.Popup) return;
    const timer = setTimeout(() => {
      alertModal?.("Info", s.Popup);
    }, 500);
    return () => clearTimeout(timer);
  }, [s?.Popup]);

  const loadMoreGallery = () => {
    if (galleryLoading || !hasMoreGallery) return;
    setGalleryLoading(true);
    const nextPage = galleryPage + 1;
    DataGallery.read(nextPage, 4)
      .then((result) => {
        setGallery((prev) => [...prev, ...(result.items || [])]);
        setGalleryPage(nextPage);
        setHasMoreGallery(result.page < result.totalPages);
      })
      .catch(console.error)
      .finally(() => setGalleryLoading(false));
  };

  const loadMoreGuru = () => {
    if (guruLoading || !hasMoreGuru) return;
    setGuruLoading(true);
    const nextPage = guruPage + 1;
    DataTeachers.read(nextPage, 4)
      .then((result) => {
        setGuru((prev) => [
          ...prev,
          ...(result.items || []).map((r: any) => ({
            Nama: r.nama || "",
            Foto: r.foto || "",
            Mapel: r.mapel || "",
            Facebook: r.facebook || "",
            Twitter: r.twitter || "",
            Instagram: r.instagram || "",
          })),
        ]);
        setGuruPage(nextPage);
        setHasMoreGuru(result.page < result.totalPages);
      })
      .catch(console.error)
      .finally(() => setGuruLoading(false));
  };

  const loadMorePosts = () => {
    if (postsLoading || !hasMorePosts) return;
    setPostsLoading(true);
    const nextPage = postsPage + 1;
    import("../lib/tables/posts")
      .then(({ DataPosts }) => {
        DataPosts.read(nextPage, 3)
          .then((result) => {
            setAllPosts((prev) => [
              ...prev,
              ...result.items.map((post) => ({
                slug: post.slug,
                title: post.title,
                date: post.date || post.created,
                author: {
                  name: post.author_name || "Admin",
                  picture: post.author_picture || "",
                },
                coverImage: post.cover_image || "",
                excerpt: post.excerpt || "",
              })),
            ]);
            setPostsPage(nextPage);
            setHasMorePosts(result.page < result.totalPages);
          })
          .catch(console.error);
      })
      .catch(console.error)
      .finally(() => setPostsLoading(false));
  };

  if (!s) {
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

  return (
    <>
      <Head>
        <title>{s.InfoSekolah.Title}</title>
      </Head>

      <Header s={s} />

      <Slider s={s} />

      {/* Events */}
      {events.length > 0 && (
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
              <h6 className="text-primary text-uppercase mb-2">EVENT</h6>
              <h1 className="display-6 mb-4">Kegiatan & Acara</h1>
            </div>
            <div className="row g-4 justify-content-center">
              {events.slice(0, 3).map((ev: any, i: number) => (
                <div key={i} className="col-lg-4 col-md-6 wow fadeInUp">
                  <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                    {ev.image && (
                      <img
                        className="img-fluid"
                        src={ev.image}
                        alt={ev.title || ""}
                        style={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div className="text-center p-4 pt-0">
                      <h5 className="mb-3 mt-4">{ev.title}</h5>
                      <p>{ev.text}</p>
                      {ev.content && (
                        <button
                          className="btn btn-outline-primary border-2"
                          onClick={() =>
                            alertModal?.(ev.title || "Info", ev.content)
                          }
                        >
                          Selengkapnya
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sekilas Info */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              {s.About.video ? (
                <div
                  className="position-relative"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <iframe
                    src={s.About.video.replace("watch?v=", "embed/")}
                    style={{ width: "100%", height: "350px", border: "none" }}
                    allowFullScreen
                    title="About Video"
                  ></iframe>
                </div>
              ) : s.About.image ? (
                <img
                  className="img-fluid w-100"
                  src={s.About.image}
                  alt="About"
                  style={{
                    borderRadius: "8px",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="text-primary text-uppercase mb-2">SEKILAS INFO</h6>
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: s.InfoSekolah.SekilasInfo.replace(/\n/g, "<br />"),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div
        className="container-xxl courses py-5 pb-0"
        style={{
          background: s.HomeBackground
            ? `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("${s.HomeBackground}") center center / cover no-repeat`
            : undefined,
        }}
      >
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
            <h6 className="text-primary text-uppercase mb-2">BERITA</h6>
            <h1 className="display-6 mb-4">Berita Terbaru Saat Ini</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {allPosts.map((post: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6 wow fadeInUp">
                <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                  <div className="text-center p-4 pt-0">
                    <h5 className="mb-3 mt-4">
                      <a
                        className="text-dark"
                        target={"_blank"}
                        href={`/posts/?slug=${post.slug}`}
                      >
                        {post.title}
                      </a>
                    </h5>
                    <p>{post.excerpt}</p>
                    <ol className="breadcrumb justify-content-center mb-0">
                      <li className="breadcrumb-item small">
                        <i className="fa fa-calendar-alt text-primary me-2"></i>
                        {post.date}
                      </li>
                    </ol>
                  </div>
                  <div className="position-relative mt-auto">
                    <img
                      style={{
                        height: 300,
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="img-fluid object-fit-cover"
                      src={post.coverImage}
                      alt=""
                    />
                    <div className="courses-overlay">
                      <a
                        className="btn btn-outline-primary border-2"
                        target="_blank"
                        href={`/posts/?slug=${post.slug}`}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMorePosts && (
            <div className="text-center mt-4 pb-4">
              <button
                className="btn btn-outline-primary border-2"
                onClick={loadMorePosts}
                disabled={postsLoading}
              >
                {postsLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
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
                  className="col-6 col-md-4 col-lg gallery-col wow fadeInUp"
                  data-wow-delay={`${0.1 + i * 0.05}s`}
                >
                  <div
                    className="position-relative overflow-hidden h-100"
                    style={{ borderRadius: "8px" }}
                  >
                    <img
                      className="img-fluid w-100"
                      src={item.image}
                      alt={item.title || "Gallery"}
                      style={{ height: 180, objectFit: "cover" }}
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
      )}

      {/* About Us */}
      <div className="container-xxl py-6">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{
                visibility: "visible",
                animationDelay: "0.1s",
                animationName: "fadeInUp",
              }}
            >
              <div
                className="position-relative overflow-hidden ps-5 pt-5 h-100"
                style={{ minHeight: "400px" }}
              >
                <img
                  className="position-absolute w-100 h-100"
                  src={s.InfoSekolah.Gambar}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                <img
                  className="position-absolute top-0 start-0 pe-3 pb-3"
                  src={s.InfoSekolah.Gambar2}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.5s"
              style={{
                visibility: "visible",
                animationDelay: "0.5s",
                animationName: "fadeInUp",
              }}
            >
              <div className="h-100">
                <h6 className="text-primary text-uppercase mb-2">About Us</h6>
                <h1 className="display-6 mb-4">
                  Selamat Datang di {s.InfoSekolah.Nama}
                </h1>
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: s.Sambutan.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-6">
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
            <h6 className="text-primary text-uppercase mb-2">
              Tuntutan ilmu, kebijaksanaan, dan inspirasi
            </h6>
            <h1 className="display-6 mb-4">
              Pilar Pendidikan, Pengukir Masa depan
            </h1>
          </div>
          <div className="row g-0 team-items">
            {guru.map((g: any, i: number) => (
              <div
                key={i}
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{
                  visibility: "hidden",
                  animationDelay: "0.1s",
                  animationName: "none",
                }}
              >
                <div className="team-item position-relative">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      src={g.Foto}
                      alt=""
                      style={{ height: 200, width: "100%", objectFit: "cover" }}
                    />
                    <div className="team-social text-center">
                      <a
                        className="btn btn-square btn-outline-primary border-2 m-1"
                        href={g.Facebook}
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-square btn-outline-primary border-2 m-1"
                        href={g.Twitter}
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        className="btn btn-square btn-outline-primary border-2 m-1"
                        href={g.Instagram}
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="bg-light text-center p-4">
                    <h5 className="mt-2">{g.Nama}</h5>
                    <span>{g.Mapel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMoreGuru && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary border-2"
                onClick={loadMoreGuru}
                disabled={guruLoading}
              >
                {guruLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer s={s} />
    </>
  );
}

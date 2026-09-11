import Head from "next/head";
import type { Settings } from "../../lib/tables/settings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { DataSettings } from "../../lib/tables/settings";

export default function BeritaPage() {
  const [s, setS] = useState<Settings | null>(null);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsPage, setPostsPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    import("../../lib/tables/posts")
      .then(({ DataPosts }) => {
        DataPosts.read(1, 12)
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
            setPostsPage(result.page);
            setHasMorePosts(result.page < result.totalPages);
            setLoading(false);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const loadMorePosts = () => {
    if (postsLoading || !hasMorePosts) return;
    setPostsLoading(true);
    const nextPage = postsPage + 1;
    import("../../lib/tables/posts")
      .then(({ DataPosts }) => {
        DataPosts.read(nextPage, 12)
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

  const title = `Berita Terbaru | Official Website ${s.InfoSekolah.Nama}`;

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
            Berita Terbaru
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item text-white">Home</li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Berita
              </li>
            </ol>
          </nav>
        </div>
      </div>

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
                        target="_blank"
                        href={`/posts?slug=${post.slug}`}
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
                        href={`/posts?slug=${post.slug}`}
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
            <div className="text-center mt-4">
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

      <Footer s={s} />
    </>
  );
}

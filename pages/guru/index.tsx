import Head from "next/head";
import type { Settings } from "../../lib/tables/settings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { DataSettings } from "../../lib/tables/settings";
import { DataTeachers } from "../../lib/tables/teachers";

export default function GuruPage() {
  const [s, setS] = useState<Settings | null>(null);
  const [guru, setGuru] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [guruLoading, setGuruLoading] = useState(false);
  const [guruPage, setGuruPage] = useState(1);
  const [hasMoreGuru, setHasMoreGuru] = useState(true);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    DataTeachers.read(1, 16)
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
        setGuruPage(result.page);
        setHasMoreGuru(result.page < result.totalPages);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const loadMoreGuru = () => {
    if (guruLoading || !hasMoreGuru) return;
    setGuruLoading(true);
    const nextPage = guruPage + 1;
    DataTeachers.read(nextPage, 16)
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

  const title = `Guru & Tenaga Pendidik | Official Website ${s.InfoSekolah.Nama}`;

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
            Guru & Tenaga Pendidik
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item text-white">Home</li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Guru
              </li>
            </ol>
          </nav>
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
              Pilar Pendidikan, Pengukir Masa Depan
            </h1>
          </div>
          <div className="row g-0 team-items">
            {guru.map((g: any, i: number) => (
              <div
                key={i}
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.05 * (i % 4)}s`}
                style={{
                  visibility: "hidden",
                  animationDelay: `${0.05 * (i % 4)}s`,
                  animationName: "none",
                }}
              >
                <div className="team-item position-relative">
                  <div className="position-relative">
                     <img
                       className="img-fluid"
                       src={g.Foto}
                       alt={g.Nama}
                       style={{
                         width: "100%",
                         aspectRatio: "3 / 4",
                         objectFit: "cover",
                         objectPosition: "top center",
                       }}
                     />
                    <div className="team-social text-center">
                      {g.Facebook && (
                        <a
                          className="btn btn-square btn-outline-primary border-2 m-1"
                          href={g.Facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      )}
                      {g.Twitter && (
                        <a
                          className="btn btn-square btn-outline-primary border-2 m-1"
                          href={g.Twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {g.Instagram && (
                        <a
                          className="btn btn-square btn-outline-primary border-2 m-1"
                          href={g.Instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
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

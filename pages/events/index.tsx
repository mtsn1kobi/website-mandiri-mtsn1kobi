import Head from "next/head";
import type { Settings } from "../../lib/tables/settings";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { DataSettings } from "../../lib/tables/settings";
import { DataEvents } from "../../lib/tables/events";

export default function EventsPage() {
  const [s, setS] = useState<Settings | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsPage, setEventsPage] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  useEffect(() => {
    DataSettings.loadAll().then(setS).catch(console.error);

    DataEvents.read(1, 12)
      .then((result) => {
        setEvents(result.items || []);
        setEventsPage(result.page);
        setHasMoreEvents(result.page < result.totalPages);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const loadMoreEvents = () => {
    if (eventsLoading || !hasMoreEvents) return;
    setEventsLoading(true);
    const nextPage = eventsPage + 1;
    DataEvents.read(nextPage, 12)
      .then((result) => {
        setEvents((prev) => [...prev, ...(result.items || [])]);
        setEventsPage(nextPage);
        setHasMoreEvents(result.page < result.totalPages);
      })
      .catch(console.error)
      .finally(() => setEventsLoading(false));
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

  const title = `Kegiatan & Acara | Official Website ${s.InfoSekolah.Nama}`;

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
            Kegiatan & Acara
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item text-white">Home</li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Events
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
            <h6 className="text-primary text-uppercase mb-2">EVENT</h6>
            <h1 className="display-6 mb-4">Kegiatan & Acara</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {events.map((ev: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6 wow fadeInUp">
                <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                  {ev.image && (
                    <img
                      className="img-fluid"
                      src={ev.image}
                      alt={ev.title || ""}
                      style={{ height: 200, width: "100%", objectFit: "cover" }}
                    />
                  )}
                  <div className="text-center p-4 pt-0">
                    <h5 className="mb-3 mt-4">{ev.title}</h5>
                    <p>{ev.text}</p>
                    {ev.content && (
                      <button
                        className="btn btn-outline-primary border-2"
                        onClick={() => window.alertModal?.(ev.title || "Info", ev.content)}
                      >
                        Selengkapnya
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMoreEvents && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary border-2"
                onClick={loadMoreEvents}
                disabled={eventsLoading}
              >
                {eventsLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer s={s} />
    </>
  );
}

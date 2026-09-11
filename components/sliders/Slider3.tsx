import type { Settings } from "../../lib/tables/settings";

const Slider3 = ({ s }: { s: Settings }) => {
  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <div
          id="header-carousel-3"
          className="carousel slide pointer-event"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {s.Slider.map((item, i) => (
              <div
                key={i}
                className={`carousel-item position-relative ${i === 0 ? "active" : ""}`}
                style={{ maxHeight: 620, minHeight: 480 }}
              >
                <img
                  className="w-100"
                  style={{
                    height: 620,
                    objectFit: "cover",
                  }}
                  src={item.image}
                  alt="Slide"
                />
                {/* Frosted Glass Left-Aligned Card Overlay */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)",
                  }}
                >
                  <div className="container-xxl px-4 px-md-5">
                    <div className="row">
                      <div className="col-lg-7">
                        <div
                          className="p-4 p-md-5 rounded-4 text-white shadow-lg"
                          style={{
                            backgroundColor: "rgba(30, 58, 138, 0.82)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                          }}
                        >
                          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                            <i className="fa fa-graduation-cap me-2"></i>Pendidikan Berkualitas
                          </span>
                          <h1 className="display-6 fw-bold text-white mb-4 animated slideInDown">
                            {item.text}
                          </h1>
                          <div className="d-flex gap-3 flex-wrap">
                            <a
                              href="/#about"
                              className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2"
                            >
                              Jelajahi Profil
                            </a>
                            <a
                              href="/#kontak"
                              className="btn btn-outline-light rounded-pill px-4 py-2"
                            >
                              Hubungi Kami
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel-3"
            data-bs-slide="prev"
            style={{ width: "6%" }}
          >
            <span
              className="carousel-control-prev-icon rounded-circle p-3"
              style={{ backgroundColor: "#1e3a8a" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel-3"
            data-bs-slide="next"
            style={{ width: "6%" }}
          >
            <span
              className="carousel-control-next-icon rounded-circle p-3"
              style={{ backgroundColor: "#1e3a8a" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Floating Prestige Keunggulan Cards */}
      <div className="container-xxl py-4" style={{ marginTop: "-50px", position: "relative", zIndex: 5 }}>
        <div className="row g-4">
          {s.Keunggulan.slice(0, 3).map((item, index) => (
            <div key={index} className="col-lg-4">
              <div
                className="bg-white rounded-4 shadow p-4 h-100 d-flex align-items-center"
                style={{ borderTop: "4px solid #f59e0b" }}
              >
                <div
                  className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle text-white me-3"
                  style={{ width: 56, height: 56, backgroundColor: "#1e3a8a" }}
                >
                  <i className={`${item.icon || "fa fa-star"} fs-4 text-warning`}></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "#1e3a8a" }}>
                    {item.judul}
                  </h5>
                  <p className="text-muted small mb-0">{item.deskripsi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider3;

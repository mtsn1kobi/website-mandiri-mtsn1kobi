import type { Settings } from "../../lib/tables/settings";

const Slider5 = ({ s }: { s: Settings }) => {
  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <div
          id="header-carousel-5"
          className="carousel slide pointer-event"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {s.Slider.map((item, i) => (
              <div
                key={i}
                className={`carousel-item position-relative ${i === 0 ? "active" : ""}`}
                style={{ maxHeight: 600, minHeight: 460 }}
              >
                <img
                  className="w-100"
                  style={{
                    height: 600,
                    objectFit: "cover",
                  }}
                  src={item.image}
                  alt="Slide"
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(76, 5, 25, 0.4) 0%, rgba(76, 5, 25, 0.85) 100%)",
                  }}
                >
                  <div className="container text-center">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <div
                          className="p-4 p-md-5 rounded-4 text-white shadow-lg d-inline-block"
                          style={{
                            backgroundColor: "rgba(136, 19, 55, 0.8)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                            <i className="fa fa-heart me-2 text-danger"></i>Membina Karakter & Budi Pekerti
                          </span>
                          <h1 className="display-6 fw-bold text-white mb-4 animated slideInDown">
                            {item.text}
                          </h1>
                          <a
                            href="/#about"
                            className="btn text-white fw-bold px-4 py-2 rounded-pill shadow-sm"
                            style={{ backgroundColor: "#e11d48" }}
                          >
                            Selengkapnya <i className="fa fa-arrow-right ms-2"></i>
                          </a>
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
            data-bs-target="#header-carousel-5"
            data-bs-slide="prev"
            style={{ width: "6%" }}
          >
            <span
              className="carousel-control-prev-icon rounded-circle p-3"
              style={{ backgroundColor: "#881337" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel-5"
            data-bs-slide="next"
            style={{ width: "6%" }}
          >
            <span
              className="carousel-control-next-icon rounded-circle p-3"
              style={{ backgroundColor: "#881337" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Warm Floating Keunggulan Cards */}
      <div className="container-xxl py-4" style={{ marginTop: "-45px", position: "relative", zIndex: 5 }}>
        <div className="row g-4">
          {s.Keunggulan.slice(0, 3).map((item, index) => (
            <div key={index} className="col-lg-4">
              <div
                className="bg-white rounded-4 shadow p-4 h-100 d-flex align-items-center"
                style={{ borderBottom: "4px solid #881337" }}
              >
                <div
                  className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle text-white me-3"
                  style={{ width: 56, height: 56, backgroundColor: "#881337" }}
                >
                  <i className={`${item.icon || "fa fa-star"} fs-4 text-warning`}></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "#881337" }}>
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

export default Slider5;

import type { Settings } from "../../lib/tables/settings";

const Slider4 = ({ s }: { s: Settings }) => {
  return (
    <div className="py-4 py-lg-5" style={{ backgroundColor: "#0b0f19" }}>
      <div className="container-xxl">
        <div className="row g-4 align-items-stretch">
          {/* Futuristic Carousel Banner (8 Cols) */}
          <div className="col-lg-8">
            <div
              id="header-carousel-4"
              className="carousel slide h-100 position-relative rounded-4 overflow-hidden"
              data-bs-ride="carousel"
              style={{
                minHeight: "440px",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div className="carousel-inner h-100" style={{ minHeight: "440px" }}>
                {s.Slider.map((item, i) => (
                  <div
                    key={i}
                    className={`carousel-item h-100 ${i === 0 ? "active" : ""}`}
                    style={{ minHeight: "440px" }}
                  >
                    <img
                      className="w-100 h-100 position-absolute top-0 start-0"
                      style={{ objectFit: "cover" }}
                      src={item.image}
                      alt={item.text || "Slide"}
                    />
                    <div
                      className="position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4 p-md-5"
                      style={{
                        top: 0,
                        left: 0,
                        background:
                          "linear-gradient(180deg, rgba(11, 15, 25, 0.1) 0%, rgba(11, 15, 25, 0.95) 100%)",
                      }}
                    >
                      <div className="col-lg-10 mb-2">
                        <span
                          className="badge px-3 py-2 rounded-pill text-uppercase mb-3 d-inline-block fw-bold text-dark"
                          style={{
                            background: "linear-gradient(90deg, #06b6d4, #38bdf8)",
                          }}
                        >
                          <i className="fa fa-microchip me-2"></i>Smart Innovation
                        </span>
                        <h2 className="text-white fw-bold display-6 mb-3 animated slideInDown">
                          {item.text}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#header-carousel-4"
                data-bs-slide="prev"
                style={{ width: "8%" }}
              >
                <span
                  className="carousel-control-prev-icon rounded-circle p-3"
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #06b6d4" }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#header-carousel-4"
                data-bs-slide="next"
                style={{ width: "8%" }}
              >
                <span
                  className="carousel-control-next-icon rounded-circle p-3"
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.8)", border: "1px solid #06b6d4" }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Right Highlights & Keunggulan Sidebar (4 Cols) */}
          <div className="col-lg-4 d-flex flex-column justify-content-between">
            <div
              className="p-3 p-xl-4 rounded-4 text-white mb-3"
              style={{
                backgroundColor: "#1e293b",
                borderLeft: "4px solid #06b6d4",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-info text-uppercase fw-bold tracking-wide">
                    Pilar Keunggulan
                  </small>
                  <h5 className="fw-bold text-white m-0">Ekosistem Digital</h5>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle text-info"
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: "rgba(6, 182, 212, 0.15)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <i className="fa fa-network-wired fs-5"></i>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3 flex-grow-1">
              {s.Keunggulan.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-4 d-flex align-items-start h-100"
                  style={{
                    backgroundColor: "#1e293b",
                    borderLeft: "4px solid #06b6d4",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 text-info me-3"
                    style={{
                      width: 46,
                      height: 46,
                      minWidth: 46,
                      backgroundColor: "rgba(6, 182, 212, 0.15)",
                    }}
                  >
                    <i className={`${item.icon || "fa fa-bolt"} fs-5`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-white mb-1">{item.judul}</h6>
                    <p className="text-white-50 small mb-0" style={{ lineHeight: "1.4" }}>
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cyber Feature Strip */}
        <div className="row g-3 mt-3">
          <div className="col-6 col-md-3">
            <div
              className="rounded-3 p-3 d-flex align-items-center text-white"
              style={{ backgroundColor: "#1e293b", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <i className="fa fa-shield-alt text-info fs-3 me-3"></i>
              <div>
                <strong className="d-block text-white small">Akreditasi A</strong>
                <span className="text-white-50" style={{ fontSize: "0.75rem" }}>Standar Nasional</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div
              className="rounded-3 p-3 d-flex align-items-center text-white"
              style={{ backgroundColor: "#1e293b", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <i className="fa fa-laptop-code text-info fs-3 me-3"></i>
              <div>
                <strong className="d-block text-white small">IT Smart Labs</strong>
                <span className="text-white-50" style={{ fontSize: "0.75rem" }}>Fasilitas Modern</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div
              className="rounded-3 p-3 d-flex align-items-center text-white"
              style={{ backgroundColor: "#1e293b", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <i className="fa fa-code-branch text-info fs-3 me-3"></i>
              <div>
                <strong className="d-block text-white small">Kurikulum Digital</strong>
                <span className="text-white-50" style={{ fontSize: "0.75rem" }}>Berorientasi Masa Depan</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div
              className="rounded-3 p-3 d-flex align-items-center text-white"
              style={{ backgroundColor: "#1e293b", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <i className="fa fa-trophy text-info fs-3 me-3"></i>
              <div>
                <strong className="d-block text-white small">Prestasi Juara</strong>
                <span className="text-white-50" style={{ fontSize: "0.75rem" }}>Nasional & Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider4;

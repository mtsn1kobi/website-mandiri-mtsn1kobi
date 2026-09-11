import type { Settings } from "../../lib/tables/settings";

const Slider2 = ({ s }: { s: Settings }) => {
  return (
    <div className="py-4 py-lg-5" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="container-xxl">
        <div className="row g-4 align-items-stretch">
          {/* Main Carousel Hero Banner (8 Cols) */}
          <div className="col-lg-8">
            <div
              id="header-carousel-2"
              className="carousel slide h-100 position-relative shadow-sm rounded-4 overflow-hidden"
              data-bs-ride="carousel"
              style={{ minHeight: "440px" }}
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
                          "linear-gradient(180deg, rgba(6,78,59,0.1) 0%, rgba(6,78,59,0.9) 100%)",
                      }}
                    >
                      <div className="col-lg-10 mb-2">
                        <span
                          className="badge px-3 py-2 rounded-pill text-uppercase mb-3 d-inline-block fw-bold"
                          style={{ backgroundColor: "#10b981", color: "#ffffff" }}
                        >
                          <i className="fa fa-award me-2"></i>Prestasi & Keunggulan
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
                data-bs-target="#header-carousel-2"
                data-bs-slide="prev"
                style={{ width: "8%" }}
              >
                <span
                  className="carousel-control-prev-icon rounded-circle p-3"
                  style={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#064e3b" }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#header-carousel-2"
                data-bs-slide="next"
                style={{ width: "8%" }}
              >
                <span
                  className="carousel-control-next-icon rounded-circle p-3"
                  style={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#064e3b" }}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Right Highlights & Keunggulan Sidebar (4 Cols) */}
          <div className="col-lg-4 d-flex flex-column justify-content-between">
            <div
              className="p-3 p-xl-4 rounded-4 shadow-sm text-white mb-3"
              style={{ backgroundColor: "#064e3b", borderLeft: "5px solid #10b981" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-warning text-uppercase fw-bold tracking-wide">
                    Kenapa Memilih Kami
                  </small>
                  <h5 className="fw-bold text-white m-0">Program Unggulan</h5>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-white text-success"
                  style={{ width: 44, height: 44 }}
                >
                  <i className="fa fa-award fs-5"></i>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3 flex-grow-1">
              {s.Keunggulan.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-4 shadow-sm d-flex align-items-start h-100"
                  style={{ borderLeft: "4px solid #10b981" }}
                >
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 text-white me-3"
                    style={{
                      width: 46,
                      height: 46,
                      minWidth: 46,
                      backgroundColor: "#064e3b",
                    }}
                  >
                    <i className={`${item.icon || "fa fa-check"} fs-5 text-warning`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">{item.judul}</h6>
                    <p className="text-muted small mb-0" style={{ lineHeight: "1.4" }}>
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick 4-Pillar Features Strip */}
        <div className="row g-3 mt-3">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center border-bottom border-3 border-success">
              <i className="fa fa-shield-alt text-success fs-3 me-3"></i>
              <div>
                <strong className="d-block text-dark small">Akreditasi Unggul</strong>
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>Standar Nasional</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center border-bottom border-3 border-success">
              <i className="fa fa-user-graduate text-success fs-3 me-3"></i>
              <div>
                <strong className="d-block text-dark small">Guru Berdedikasi</strong>
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>Tenaga Profesional</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center border-bottom border-3 border-success">
              <i className="fa fa-laptop-code text-success fs-3 me-3"></i>
              <div>
                <strong className="d-block text-dark small">Fasilitas Modern</strong>
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>Laboratorium & IT</span>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center border-bottom border-3 border-success">
              <i className="fa fa-trophy text-success fs-3 me-3"></i>
              <div>
                <strong className="d-block text-dark small">Prestasi Juara</strong>
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>Akademik & Seni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider2;

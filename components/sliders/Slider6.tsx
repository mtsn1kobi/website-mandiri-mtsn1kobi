import type { Settings } from "../../lib/tables/settings";

const Slider6 = ({ s }: { s: Settings }) => {
  return (
    <>
      <section
        id="slider"
        className="position-relative overflow-hidden"
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          id="header-carousel-6"
          className="carousel slide pointer-event"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {s.Slider.map((item, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <img
                  className="w-100"
                  style={{
                    maxHeight: 600,
                    objectFit: "cover",
                  }}
                  src={item.image}
                  alt={item.text || "Slide"}
                />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7">
                        <h1 className="display-2 text-light mb-5 animated slideInDown">
                          {item.text}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel-6"
            data-bs-slide="prev"
            style={{ width: "6%", zIndex: 20 }}
          >
            <span
              className="carousel-control-prev-icon rounded-circle p-3"
              style={{ backgroundColor: "#10d98e", border: "none" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel-6"
            data-bs-slide="next"
            style={{ width: "6%", zIndex: 20 }}
          >
            <span
              className="carousel-control-next-icon rounded-circle p-3"
              style={{ backgroundColor: "#10d98e", border: "none" }}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Keunggulan Cards Strip */}
      {s.Keunggulan.length > 0 && (
        <div
          className="container py-4"
          style={{ marginTop: "-35px", position: "relative", zIndex: 15 }}
        >
          <style>{`
            .slider6-keunggulan-card {
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          border-color 0.35s ease;
              cursor: pointer;
              will-change: transform;
            }
            .slider6-keunggulan-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 16px 30px rgba(16, 217, 142, 0.22), 0 6px 14px rgba(0, 0, 0, 0.07) !important;
              border-bottom-color: #0eb878 !important;
            }
            .slider6-keunggulan-icon {
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s ease,
                          background-color 0.35s ease;
            }
            .slider6-keunggulan-card:hover .slider6-keunggulan-icon {
              transform: scale(1.12) rotate(6deg);
              box-shadow: 0 6px 16px rgba(16, 217, 142, 0.45);
              background-color: #0eb878 !important;
            }
            .slider6-keunggulan-title {
              transition: color 0.3s ease;
            }
            .slider6-keunggulan-card:hover .slider6-keunggulan-title {
              color: #10d98e !important;
            }
          `}</style>
          <div className="row g-3 justify-content-center">
            {s.Keunggulan.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div
                  className="slider6-keunggulan-card bg-white rounded-3 shadow p-4 h-100 d-flex align-items-center"
                  style={{ borderBottom: "4px solid #10d98e" }}
                >
                  <div
                    className="slider6-keunggulan-icon flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle text-white me-3"
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#10d98e",
                    }}
                  >
                    <i className={`${item.icon || "fa fa-check"} fs-5`}></i>
                  </div>
                  <div>
                    <h6 className="slider6-keunggulan-title fw-bold text-dark mb-1">
                      {item.judul}
                    </h6>
                    <p className="text-muted small mb-0">{item.deskripsi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider6;

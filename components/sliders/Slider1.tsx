import type { Settings } from "../../lib/tables/settings";

const Slider1 = ({ s }: { s: Settings }) => {
  return (
    <>
      <div
        className="container-fluid p-0 wow fadeIn"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
        }}
      >
        <div
          id="header-carousel"
          className="carousel slide pointer-event"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {s.Slider.map((item, i) => {
              return (
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
                    alt="Image"
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
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container-fluid facts pt-5 pt-lg-0">
        <div className="container py-5 pt-lg-0">
          <style>{`
            .slider1-keunggulan-card {
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          border-color 0.35s ease;
              cursor: pointer;
              position: relative;
              will-change: transform;
            }
            .slider1-keunggulan-card:hover {
              transform: translateY(-8px);
              z-index: 2;
              box-shadow: 0 16px 30px rgba(243, 189, 0, 0.25), 0 6px 14px rgba(0, 0, 0, 0.08) !important;
            }
            .slider1-keunggulan-icon {
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s ease;
            }
            .slider1-keunggulan-card:hover .slider1-keunggulan-icon {
              transform: scale(1.12) rotate(6deg);
              box-shadow: 0 6px 16px rgba(243, 189, 0, 0.45);
            }
            .slider1-keunggulan-title {
              transition: color 0.3s ease;
            }
            .slider1-keunggulan-card:hover .slider1-keunggulan-title {
              color: var(--primary, #f3bd00) !important;
            }
          `}</style>
          <div className="row gx-0">
            {s.Keunggulan.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 wow fadeIn"
                  data-wow-delay="0.1s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeIn",
                  }}
                >
                  <div
                    className="slider1-keunggulan-card bg-white shadow d-flex align-items-center h-100 p-4"
                    style={{
                      minHeight: "150px",
                      borderBottom: "4px solid var(--primary, #f3bd00)",
                    }}
                  >
                    <div className="d-flex">
                      <div className="slider1-keunggulan-icon flex-shrink-0 btn-lg-square bg-primary">
                        <i className={`${item.icon} text-white`}></i>
                      </div>
                      <div className="ps-4">
                        <h5 className="slider1-keunggulan-title">{item.judul}</h5>
                        <span>{item.deskripsi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider1;

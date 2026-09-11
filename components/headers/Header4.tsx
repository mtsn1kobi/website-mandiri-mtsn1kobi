import type { Settings } from "../../lib/tables/settings";

const Header4 = (props: { s: Settings }) => {
  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-info" role="status"></div>
      </div>

      {/* Modern Midnight Glassmorphic Header */}
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top py-2 px-3 shadow"
        style={{
          top: "-100px",
          backgroundColor: "#0f172a",
          borderBottom: "2px solid #06b6d4",
          boxShadow: "0 4px 20px rgba(6, 182, 212, 0.15)",
        }}
      >
        <div className="container-xxl">
          <a href="/" className="navbar-brand d-flex align-items-center">
            {props.s.InfoSekolah.Logo ? (
              <img
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
                style={{
                  height: 42,
                  marginRight: 12,
                  filter: "drop-shadow(0 0 8px rgba(6,182,212,0.4))",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center rounded-circle text-white me-3"
                style={{
                  width: 42,
                  height: 42,
                  background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                }}
              >
                <i className="fa fa-atom"></i>
              </div>
            )}
            <div>
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-block rounded-circle bg-info me-2"
                  style={{ width: 8, height: 8, boxShadow: "0 0 6px #06b6d4" }}
                ></span>
                <span className="fw-bold text-white fs-5" style={{ letterSpacing: "-0.3px" }}>
                  {props.s.InfoSekolah.Nama}
                </span>
              </div>
              <small className="text-info d-block" style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                Digital Smart School Campus
              </small>
            </div>
          </a>

          <button
            type="button"
            className="navbar-toggler border-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse4"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse4">
            <div className="navbar-nav ms-auto align-items-lg-center">
              {Object.keys(props.s.Menu).map((k, i) => {
                if (typeof props.s.Menu[k] === "object") {
                  const parentUrl = props.s.Menu[k]._url || "#";
                  const subItems: any[] = [];
                  Object.keys(props.s.Menu[k]).forEach((k2, i2) => {
                    if (k2 === "_url") return;
                    subItems.push(
                      <a
                        key={i2}
                        href={props.s.Menu[k][k2]}
                        className="dropdown-item py-2 text-white-50"
                        style={{ backgroundColor: "#1e293b" }}
                      >
                        <i className="fa fa-code-branch text-info me-2 small"></i>
                        {k2.replace(/_/g, " ")}
                      </a>
                    );
                  });

                  return (
                    <div key={i} className="nav-item dropdown px-2">
                      <a
                        href={parentUrl}
                        className="nav-link dropdown-toggle text-white"
                        data-bs-toggle="dropdown"
                      >
                        {k}
                      </a>
                      <div
                        className="dropdown-menu shadow-lg border-0 m-0 rounded-3 p-2"
                        style={{ backgroundColor: "#1e293b", borderTop: "2px solid #06b6d4" }}
                      >
                        {subItems}
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={i}
                    href={props.s.Menu[k]}
                    className="nav-item nav-link text-white px-2"
                  >
                    {k}
                  </a>
                );
              })}

              <div className="ms-lg-3 mt-3 mt-lg-0">
                <a
                  href="/#kontak"
                  className="btn btn-sm text-dark fw-bold px-4 py-2 rounded-pill shadow"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%)",
                    border: "none",
                  }}
                >
                  <i className="fa fa-laptop-code me-2"></i> Portal Sekolah
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header4;

import type { Settings } from "../../lib/tables/settings";

const Header3 = (props: { s: Settings }) => {
  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow" style={{ color: "#1e3a8a" }} role="status"></div>
      </div>

      {/* Top Banner (Royal Blue) */}
      <div className="text-white py-2 d-none d-lg-block" style={{ backgroundColor: "#1e3a8a" }}>
        <div className="container-xxl">
          <div className="d-flex justify-content-between align-items-center small">
            <div>
              <span className="badge bg-warning text-dark me-2 px-2 py-1 fw-bold">
                <i className="fa fa-star me-1"></i> Terakreditasi
              </span>
              <span>{props.s.InfoSekolah.Alamat || "Lembaga Pendidikan Nasional"}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              {props.s.InfoSekolah.Telepon && (
                <span>
                  <i className="fa fa-phone-alt text-warning me-1"></i> {props.s.InfoSekolah.Telepon}
                </span>
              )}
              {props.s.InfoSekolah.Email && (
                <span>
                  <i className="fa fa-envelope text-warning me-1"></i> {props.s.InfoSekolah.Email}
                </span>
              )}
              <div className="d-flex gap-2 ms-2">
                {props.s.InfoSekolah.Facebook && (
                  <a href={props.s.InfoSekolah.Facebook} className="text-white">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {props.s.InfoSekolah.Instagram && (
                  <a href={props.s.InfoSekolah.Instagram} className="text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {props.s.InfoSekolah.Youtube && (
                  <a href={props.s.InfoSekolah.Youtube} className="text-white">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar (Prestige White with Royal Blue Accents) */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm py-2"
        style={{ top: "-100px", borderBottom: "3px solid #f59e0b" }}
      >
        <div className="container-xxl">
          <a href="/" className="navbar-brand d-flex align-items-center">
            {props.s.InfoSekolah.Logo && (
              <img
                style={{ height: 46, marginRight: 12 }}
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
              />
            )}
            <div>
              <h4 className="m-0 fw-bold" style={{ color: "#1e3a8a", letterSpacing: "-0.5px" }}>
                {props.s.InfoSekolah.Nama}
              </h4>
              <small className="text-muted d-block" style={{ fontSize: "0.78rem" }}>
                Unggul dalam Prestasi, Santun dalam Budi Pekerti
              </small>
            </div>
          </a>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse3">
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
                        className="dropdown-item py-2"
                      >
                        {k2.replace(/_/g, " ")}
                      </a>
                    );
                  });

                  return (
                    <div key={i} className="nav-item dropdown px-2">
                      <a
                        href={parentUrl}
                        className="nav-link dropdown-toggle fw-semibold"
                        data-bs-toggle="dropdown"
                        style={{ color: "#1e3a8a" }}
                      >
                        {k}
                      </a>
                      <div className="dropdown-menu shadow-sm rounded-3 border-0">
                        {subItems}
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={i}
                    href={props.s.Menu[k]}
                    className="nav-item nav-link fw-semibold px-2"
                    style={{ color: "#1e3a8a" }}
                  >
                    {k}
                  </a>
                );
              })}

              <div className="ms-lg-3 mt-3 mt-lg-0">
                <a
                  href="/#kontak"
                  className="btn text-white fw-bold px-4 py-2 rounded-3 shadow-sm"
                  style={{ backgroundColor: "#1e3a8a" }}
                >
                  <i className="fa fa-paper-plane me-2 text-warning"></i> Info Pendaftaran
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header3;

import type { Settings } from "../../lib/tables/settings";

const Header5 = (props: { s: Settings }) => {
  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-danger" role="status"></div>
      </div>

      {/* Top Header Bar (Warm Crimson) */}
      <div className="text-white py-2 d-none d-lg-block" style={{ backgroundColor: "#881337" }}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-lg-6 text-start">
              <small className="me-3">
                <i className="fa fa-map-marker-alt text-warning me-1"></i>
                {props.s.InfoSekolah.Alamat}
              </small>
            </div>
            <div className="col-lg-6 text-end">
              {props.s.InfoSekolah.Telepon && (
                <small className="me-3">
                  <i className="fa fa-phone-alt text-warning me-1"></i>
                  {props.s.InfoSekolah.Telepon}
                </small>
              )}
              {props.s.InfoSekolah.Email && (
                <small className="me-3">
                  <i className="fa fa-envelope text-warning me-1"></i>
                  {props.s.InfoSekolah.Email}
                </small>
              )}
              <div className="d-inline-flex align-items-center gap-1">
                {props.s.InfoSekolah.Facebook && (
                  <a href={props.s.InfoSekolah.Facebook} className="text-white small px-1">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                )}
                {props.s.InfoSekolah.Instagram && (
                  <a href={props.s.InfoSekolah.Instagram} className="text-white small px-1">
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
                {props.s.InfoSekolah.Youtube && (
                  <a href={props.s.InfoSekolah.Youtube} className="text-white small px-1">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top shadow-sm py-2"
        style={{ top: "-100px", borderBottom: "3px solid #881337" }}
      >
        <div className="container-xxl">
          <a href="/" className="navbar-brand d-flex align-items-center">
            {props.s.InfoSekolah.Logo && (
              <img
                style={{ height: 45, marginRight: 12 }}
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
              />
            )}
            <div>
              <h4 className="m-0 fw-bold" style={{ color: "#881337", letterSpacing: "-0.5px" }}>
                {props.s.InfoSekolah.Nama}
              </h4>
              <small className="text-muted d-block" style={{ fontSize: "0.78rem" }}>
                Berkarakter, Berakhlak Mulia & Berprestasi
              </small>
            </div>
          </a>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse5"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse5">
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
                        style={{ color: "#881337" }}
                      >
                        {k}
                      </a>
                      <div className="dropdown-menu shadow-sm border-0">
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
                    style={{ color: "#881337" }}
                  >
                    {k}
                  </a>
                );
              })}

              <div className="ms-lg-3 mt-3 mt-lg-0">
                <a
                  href="/#kontak"
                  className="btn text-white fw-bold px-4 py-2 rounded-pill shadow-sm"
                  style={{ backgroundColor: "#881337" }}
                >
                  <i className="fa fa-user-plus me-2 text-warning"></i> PPDB Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header5;

import type { Settings } from "../../lib/tables/settings";

const Header2 = (props: { s: Settings }) => {
  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-success" role="status"></div>
      </div>

      {/* Top Branding & Contact Header */}
      <div className="bg-white border-bottom py-2 py-lg-3 d-none d-lg-block">
        <div className="container-xxl">
          <div className="row align-items-center">
            {/* School Branding */}
            <div className="col-lg-5">
              <a href="/" className="d-flex align-items-center text-decoration-none">
                {props.s.InfoSekolah.Logo ? (
                  <img
                    src={props.s.InfoSekolah.Logo}
                    alt={props.s.InfoSekolah.Nama}
                    style={{ height: 52, marginRight: 15, objectFit: "contain" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-success text-white rounded-circle me-3 fw-bold"
                    style={{ width: 50, height: 50, fontSize: "1.2rem" }}
                  >
                    <i className="fa fa-graduation-cap"></i>
                  </div>
                )}
                <div>
                  <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.5px" }}>
                    {props.s.InfoSekolah.Nama}
                  </h4>
                  <small className="text-muted d-block" style={{ fontSize: "0.82rem" }}>
                    <i className="fa fa-map-marker-alt text-success me-1"></i>
                    {props.s.InfoSekolah.Alamat || "Lembaga Pendidikan Berkualitas"}
                  </small>
                </div>
              </a>
            </div>

            {/* Quick Contact Cards */}
            <div className="col-lg-7">
              <div className="d-flex justify-content-end align-items-center gap-4">
                {props.s.InfoSekolah.Telepon && (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-light text-success me-3"
                      style={{ width: 44, height: 44, fontSize: "1.1rem" }}
                    >
                      <i className="fa fa-phone-alt"></i>
                    </div>
                    <div className="text-start">
                      <span className="d-block text-muted small" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                        Layanan Informasi
                      </span>
                      <strong className="text-dark small">{props.s.InfoSekolah.Telepon}</strong>
                    </div>
                  </div>
                )}

                {props.s.InfoSekolah.JamKerja && (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-light text-success me-3"
                      style={{ width: 44, height: 44, fontSize: "1.1rem" }}
                    >
                      <i className="far fa-clock"></i>
                    </div>
                    <div className="text-start">
                      <span className="d-block text-muted small" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                        Jam Sekolah
                      </span>
                      <strong className="text-dark small">{props.s.InfoSekolah.JamKerja}</strong>
                    </div>
                  </div>
                )}

                {/* Social Media */}
                <div className="d-flex align-items-center gap-1 ps-2 border-start">
                  {props.s.InfoSekolah.Facebook && (
                    <a
                      href={props.s.InfoSekolah.Facebook}
                      className="btn btn-sm btn-light rounded-circle text-success"
                      style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {props.s.InfoSekolah.Twitter && (
                    <a
                      href={props.s.InfoSekolah.Twitter}
                      className="btn btn-sm btn-light rounded-circle text-success"
                      style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {props.s.InfoSekolah.Instagram && (
                    <a
                      href={props.s.InfoSekolah.Instagram}
                      className="btn btn-sm btn-light rounded-circle text-success"
                      style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {props.s.InfoSekolah.Youtube && (
                    <a
                      href={props.s.InfoSekolah.Youtube}
                      className="btn btn-sm btn-light rounded-circle text-success"
                      style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Full-Width Navigation Bar (Emerald) */}
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top p-0 shadow-sm"
        style={{
          top: "-100px",
          backgroundColor: "#064e3b",
          borderBottom: "3px solid #10b981",
        }}
      >
        <div className="container-xxl px-3 px-lg-0">
          <a href="/" className="navbar-brand d-flex align-items-center d-lg-none py-2">
            {props.s.InfoSekolah.Logo && (
              <img
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
                style={{ height: 36, marginRight: 10 }}
              />
            )}
            <span className="fw-bold fs-6 text-white">{props.s.InfoSekolah.Nama}</span>
          </a>

          <button
            type="button"
            className="navbar-toggler my-2 me-2"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse2"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse2">
            <div className="navbar-nav me-auto p-3 p-lg-0">
              <a
                href="/"
                className="nav-item nav-link d-inline-flex align-items-center text-white px-3"
                style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}
              >
                <i className="fa fa-home me-2 text-warning"></i> Beranda
              </a>

              {Object.keys(props.s.Menu).map((k, i) => {
                if (k.toLowerCase() === "beranda" || k.toLowerCase() === "home") {
                  return null;
                }
                if (typeof props.s.Menu[k] === "object") {
                  const parentUrl = props.s.Menu[k]._url || "#";
                  const subItems: any[] = [];
                  Object.keys(props.s.Menu[k]).forEach((k2, i2) => {
                    if (k2 === "_url") return;
                    subItems.push(
                      <a
                        key={i2}
                        href={props.s.Menu[k][k2]}
                        className="dropdown-item py-2 px-3"
                      >
                        <i className="fa fa-chevron-right text-success me-2 small"></i>
                        {k2.replace(/_/g, " ")}
                      </a>
                    );
                  });

                  return (
                    <div key={i} className="nav-item dropdown">
                      <a
                        href={parentUrl}
                        className="nav-link dropdown-toggle text-white px-3"
                        data-bs-toggle="dropdown"
                      >
                        {k}
                      </a>
                      <div className="dropdown-menu shadow rounded-0 m-0 border-0 bg-white">
                        {subItems}
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={i}
                    href={props.s.Menu[k]}
                    className="nav-item nav-link text-white px-3"
                  >
                    {k}
                  </a>
                );
              })}
            </div>

            <div className="d-none d-lg-flex align-items-center py-2 pe-3">
              <a
                href={props.s.InfoSekolah.Telepon ? `tel:${props.s.InfoSekolah.Telepon}` : "#"}
                className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 small shadow-sm"
              >
                <i className="fa fa-headset me-2"></i> Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header2;

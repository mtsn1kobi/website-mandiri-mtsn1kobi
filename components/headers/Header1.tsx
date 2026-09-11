import type { Settings } from "../../lib/tables/settings";

const Header1 = (props: { s: Settings }) => {
  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary" role="status"></div>
      </div>

      <div className="container-fluid bg-dark text-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <small className="fa fa-map-marker-alt text-primary me-2"></small>
              <small>{props.s.InfoSekolah.Alamat}</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <small className="far fa-clock text-primary me-2"></small>
              <small>{props.s.InfoSekolah.JamKerja}</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <small className="fa fa-phone-alt text-primary me-2"></small>
              <small>{props.s.InfoSekolah.Telepon}</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center mx-n2">
              <a
                className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary"
                href={props.s.InfoSekolah.Facebook}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary"
                href={props.s.InfoSekolah.Twitter}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary"
                href={props.s.InfoSekolah.Youtube}
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                className="btn btn-square btn-link rounded-0"
                href={props.s.InfoSekolah.Instagram}
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0"
        style={{ top: "-100px" }}
      >
        <a
          href="/"
          className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5"
        >
          <h2 className="m-0">
            {props.s.InfoSekolah.Logo && (
              <img
                style={{ height: 40, marginRight: 10 }}
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
              />
            )}
            {props.s.InfoSekolah.Nama}
          </h2>
        </a>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            {Object.keys(props.s.Menu).map((k, i) => {
              const x: any[] = [];
              if (typeof props.s.Menu[k] === "object") {
                const parentUrl = props.s.Menu[k]._url || "#";
                Object.keys(props.s.Menu[k]).forEach((k2, i2) => {
                  if (k2 === "_url") return;
                  x.push(
                    <a
                      key={i2}
                      href={props.s.Menu[k][k2]}
                      className="dropdown-item"
                    >
                      {k2.replace(/_/g, " ")}
                    </a>
                  );
                });

                return (
                  <div key={i} className="nav-item dropdown">
                    <a
                      href={parentUrl}
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {k}
                    </a>
                    <div className="dropdown-menu bg-light m-0">{x}</div>
                  </div>
                );
              }

              return (
                <a key={i} href={props.s.Menu[k]} className="nav-item nav-link">
                  {k}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header1;

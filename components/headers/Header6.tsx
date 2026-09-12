import { useState } from "react";
import type { Settings } from "../../lib/tables/settings";

const Header6 = (props: { s: Settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-grow"
          style={{ color: "#10d98e" }}
          role="status"
        ></div>
      </div>

      <header
        id="header"
        className="w-100 position-relative"
        style={{ zIndex: 1020 }}
      >
        {/* Top Bar (Brand Green) */}
        <div
          className="text-white py-2 px-3 px-lg-5 d-flex align-items-center justify-content-between bg-green-800"
          style={{ fontSize: "0.875rem" }}
        >
          <div className="d-flex align-items-center">
            <span className="fw-semibold me-3 d-none d-sm-inline">
              Follow Us On :
            </span>
            <div className="d-flex align-items-center gap-3">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="text-white text-decoration-none"
                  style={{ opacity: 0.9 }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="text-white text-decoration-none"
                  style={{ opacity: 0.9 }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="text-white text-decoration-none"
                  style={{ opacity: 0.9 }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="text-white text-decoration-none"
                  style={{ opacity: 0.9 }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          <div className="d-none d-md-flex align-items-center gap-3 small">
            {props.s.InfoSekolah.Telepon && (
              <span>
                <i className="fa fa-phone-alt me-1"></i>{" "}
                {props.s.InfoSekolah.Telepon}
              </span>
            )}
            {props.s.InfoSekolah.Email && (
              <span>
                <i className="fa fa-envelope me-1"></i>{" "}
                {props.s.InfoSekolah.Email}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div
          className="bg-white shadow-sm py-3 px-3 px-lg-5 d-flex justify-content-between align-items-center sticky-top"
          style={{ top: "-100px" }}
        >
          {/* Logo & School Name Area */}
          <a
            href="/"
            className="d-flex align-items-center text-decoration-none"
          >
            {props.s.InfoSekolah.Logo ? (
              <img
                src={props.s.InfoSekolah.Logo}
                alt={props.s.InfoSekolah.Nama}
                style={{
                  height: 48,
                  width: 48,
                  objectFit: "contain",
                  marginRight: 12,
                }}
              />
            ) : (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#059669",
                  border: "2px solid #fbbf24",
                }}
              >
                <i className="fa fa-graduation-cap fs-5 text-warning"></i>
              </div>
            )}
            <h1
              className="m-0 fw-bold text-dark fs-4"
              style={{
                letterSpacing: "-0.5px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {props.s.InfoSekolah.Nama}
            </h1>
          </a>

          {/* Desktop Menu Links */}
          <nav className="d-none d-md-flex align-items-center gap-4 fw-medium text-secondary">
            <a
              href="/"
              className="position-relative text-decoration-none fw-bold"
              style={{ color: "#10d98e" }}
            >
              Beranda
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
                      className="dropdown-item py-2"
                    >
                      {k2.replace(/_/g, " ")}
                    </a>,
                  );
                });

                return (
                  <div key={i} className="dropdown">
                    <a
                      href={parentUrl}
                      className="dropdown-toggle text-dark text-decoration-none"
                      data-bs-toggle="dropdown"
                    >
                      {k}
                    </a>
                    <div className="dropdown-menu shadow-sm border-0 rounded-3 m-0">
                      {subItems}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={i}
                  href={props.s.Menu[k]}
                  className="text-dark text-decoration-none"
                  style={{ transition: "color 0.2s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#10d98e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#212529")
                  }
                >
                  {k}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="d-md-none btn btn-light border-0"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fa fa-bars fs-4"></i>
          </button>
        </div>

        {/* Mobile Dropdown Collapse */}
        {mobileMenuOpen && (
          <div className="d-md-none bg-white border-top shadow-sm px-4 py-3">
            <div className="d-flex flex-column gap-2">
              <a
                href="/"
                className="text-decoration-none fw-bold"
                style={{ color: "#10d98e" }}
              >
                Home
              </a>
              {Object.keys(props.s.Menu).map((k, i) => {
                if (k.toLowerCase() === "beranda" || k.toLowerCase() === "home")
                  return null;
                if (typeof props.s.Menu[k] === "object") {
                  return (
                    <div key={i} className="py-1">
                      <div className="fw-semibold text-dark">{k}</div>
                      <div className="ps-3 d-flex flex-column gap-1 mt-1">
                        {Object.keys(props.s.Menu[k]).map((k2, i2) => {
                          if (k2 === "_url") return null;
                          return (
                            <a
                              key={i2}
                              href={props.s.Menu[k][k2]}
                              className="text-muted small text-decoration-none"
                            >
                              {k2.replace(/_/g, " ")}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <a
                    key={i}
                    href={props.s.Menu[k]}
                    className="text-dark text-decoration-none py-1"
                  >
                    {k}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header6;

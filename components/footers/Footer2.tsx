import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer2 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  return (
    <footer style={{ backgroundColor: "#064e3b", color: "#e2e8f0" }} className="mt-5 pt-5">
      <div className="container-xxl">
        {/* Top Contact Strip */}
        <div
          className="p-4 rounded-4 mb-5 shadow-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div className="row g-4 align-items-center text-center text-md-start">
            <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                style={{ width: 48, height: 48, backgroundColor: "#10b981", color: "#ffffff" }}
              >
                <i className="fa fa-phone-alt fs-5"></i>
              </div>
              <div>
                <small className="text-white-50 d-block">Telepon & Layanan</small>
                <strong className="text-white">{props.s.InfoSekolah.Telepon || "(021) 1234-5678"}</strong>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                style={{ width: 48, height: 48, backgroundColor: "#10b981", color: "#ffffff" }}
              >
                <i className="fa fa-envelope fs-5"></i>
              </div>
              <div>
                <small className="text-white-50 d-block">Email Resmi</small>
                <strong className="text-white">{props.s.InfoSekolah.Email || "info@sekolah.sch.id"}</strong>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0"
                style={{ width: 48, height: 48, backgroundColor: "#10b981", color: "#ffffff" }}
              >
                <i className="fa fa-map-marker-alt fs-5"></i>
              </div>
              <div>
                <small className="text-white-50 d-block">Lokasi Kampus</small>
                <strong className="text-white small">{props.s.InfoSekolah.Alamat}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="row g-5 pb-5">
          {/* Col 1: Identity */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              {props.s.InfoSekolah.Logo && (
                <img
                  src={props.s.InfoSekolah.Logo}
                  alt={props.s.InfoSekolah.Nama}
                  style={{ height: 44, marginRight: 12 }}
                />
              )}
              <h5 className="text-white fw-bold m-0">{props.s.InfoSekolah.Nama}</h5>
            </div>
            <p className="text-white-50 small mb-4" style={{ lineHeight: "1.7" }}>
              {props.s.InfoSekolah.SekilasInfo
                ? props.s.InfoSekolah.SekilasInfo.slice(0, 160) + "..."
                : "Mendidik generasi unggul, berkarakter, dan berdaya saing global melalui lingkungan belajar yang inspiratif."}
            </p>
            <div className="d-flex gap-2">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="btn btn-sm rounded-circle text-white"
                  style={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="btn btn-sm rounded-circle text-white"
                  style={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="btn btn-sm rounded-circle text-white"
                  style={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="btn btn-sm rounded-circle text-white"
                  style={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Visi & Misi */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Visi & Nilai
            </h6>
            <p className="text-white-50 small mb-3">{props.s.VisiMisi.Visi}</p>
            <ul className="list-unstyled text-white-50 small">
              {props.s.VisiMisi.Misi.slice(0, 3).map((m, i) => (
                <li key={i} className="mb-2 d-flex align-items-start">
                  <i className="fa fa-check text-warning me-2 mt-1 small"></i>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Menu / Navigasi */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Menu Utama
            </h6>
            <div className="d-flex flex-column gap-2 small">
              {Object.keys(props.s.Menu).slice(0, 5).map((key, i) => (
                <a
                  key={i}
                  href={typeof props.s.Menu[key] === "object" ? props.s.Menu[key]._url || "#" : props.s.Menu[key]}
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="fa fa-chevron-right text-success me-2" style={{ fontSize: "0.7rem" }}></i>
                  {key}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Popular Links & Live Counter */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Tautan Terpopuler
            </h6>
            <div className="d-flex flex-column gap-2 small mb-4">
              {Object.keys(props.s.PopularLinks).slice(0, 4).map((key, index) => (
                <a
                  key={index}
                  href={props.s.PopularLinks[key]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-link text-success me-2" style={{ fontSize: "0.7rem" }}></i>
                  {key}
                </a>
              ))}
            </div>

            {/* Visitor Badge */}
            <div
              className="p-3 rounded-3 d-flex align-items-center justify-content-between"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
            >
              <div className="d-flex align-items-center">
                <i className="fa fa-users text-warning fs-4 me-3"></i>
                <div>
                  <small className="text-white-50 d-block" style={{ fontSize: "0.7rem" }}>TOTAL PENGUNJUNG</small>
                  <strong className="text-white fs-6">{visitor.toLocaleString()}</strong>
                </div>
              </div>
              <span className="badge bg-success small">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{ backgroundColor: "#022c22", borderTop: "1px solid rgba(255,255,255,0.05)" }} className="py-3">
        <div className="container-xxl">
          <div className="row align-items-center small text-white-50">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              © {new Date().getFullYear()} <strong className="text-white">{props.s.InfoSekolah.Nama}</strong>. Hak Cipta Dilindungi.
            </div>
            <div className="col-md-6 text-center text-md-end">
              Website Sekolah Powered by <a href="https://bimasoft.web.id/" className="text-warning text-decoration-none">Bimasoft</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;

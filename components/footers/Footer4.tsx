import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer4 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#070a13",
        color: "#94a3b8",
        borderTop: "2px solid #06b6d4",
      }}
      className="mt-5 pt-5"
    >
      <div className="container-xxl">
        <div className="row g-5 pb-5">
          {/* Identity & Cyber Branding */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              {props.s.InfoSekolah.Logo && (
                <img
                  src={props.s.InfoSekolah.Logo}
                  alt={props.s.InfoSekolah.Nama}
                  style={{
                    height: 40,
                    marginRight: 12,
                    filter: "drop-shadow(0 0 6px rgba(6,182,212,0.5))",
                  }}
                />
              )}
              <h5 className="text-white fw-bold m-0">{props.s.InfoSekolah.Nama}</h5>
            </div>
            <p className="small mb-4" style={{ lineHeight: "1.7" }}>
              Portal resmi institusi pendidikan berbasis teknologi modern dan pembelajaran digital terpadu.
            </p>
            <div className="d-flex gap-2">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="btn btn-sm rounded-circle text-info"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(6,182,212,0.3)",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="btn btn-sm rounded-circle text-info"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(6,182,212,0.3)",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="btn btn-sm rounded-circle text-info"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(6,182,212,0.3)",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="btn btn-sm rounded-circle text-info"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(6,182,212,0.3)",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-info text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Navigasi
            </h6>
            <div className="d-flex flex-column gap-2 small">
              {Object.keys(props.s.Menu).slice(0, 5).map((key, i) => (
                <a
                  key={i}
                  href={typeof props.s.Menu[key] === "object" ? props.s.Menu[key]._url || "#" : props.s.Menu[key]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-angle-right text-info me-2"></i> {key}
                </a>
              ))}
            </div>
          </div>

          {/* Popular Links */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-info text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Tautan Eksternal
            </h6>
            <div className="d-flex flex-column gap-2 small">
              {Object.keys(props.s.PopularLinks).slice(0, 4).map((k, idx) => (
                <a
                  key={idx}
                  href={props.s.PopularLinks[k]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-external-link-alt text-info me-2" style={{ fontSize: "0.75rem" }}></i>
                  {k}
                </a>
              ))}
            </div>
          </div>

          {/* Live Cyber Counter & Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-info text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              Smart Metrics
            </h6>
            <div
              className="p-3 rounded-3 mb-3 text-white"
              style={{
                backgroundColor: "#111827",
                border: "1px solid rgba(6,182,212,0.3)",
                boxShadow: "0 0 15px rgba(6,182,212,0.1)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="small text-info">LIVE TRAFFIC</span>
                <span
                  className="d-inline-block rounded-circle bg-success"
                  style={{ width: 8, height: 8 }}
                ></span>
              </div>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fs-4 fw-bold font-monospace text-white">
                  {visitor.toLocaleString()}
                </span>
                <span className="small text-white-50">Total Views</span>
              </div>
            </div>

            <div className="small text-white-50">
              <i className="fa fa-map-marker-alt text-info me-2"></i>
              {props.s.InfoSekolah.Alamat}
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#030712" }} className="py-3 border-top border-dark">
        <div className="container-xxl text-center text-white-50 small">
          © {new Date().getFullYear()} {props.s.InfoSekolah.Nama} • Digital Smart System
        </div>
      </div>
    </footer>
  );
};

export default Footer4;

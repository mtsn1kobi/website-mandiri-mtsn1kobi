import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer5 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  return (
    <footer style={{ backgroundColor: "#4c0519", color: "#ffe4e6" }} className="mt-5 pt-5">
      <div className="container-xxl">
        {/* Warm Motto Ribbon */}
        <div
          className="p-4 rounded-4 mb-5 text-center text-white shadow-sm"
          style={{
            backgroundColor: "#881337",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <h5 className="fw-bold mb-1">Membina Generasi Unggul, Berbudi Luhur & Berkarakter</h5>
          <p className="mb-0 text-white-50 small">
            Bersama mewujudkan pendidikan bermakna dan berlandaskan kearifan nilai luhur bangsa.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="row g-5 pb-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center">
              {props.s.InfoSekolah.Logo && (
                <img
                  src={props.s.InfoSekolah.Logo}
                  alt={props.s.InfoSekolah.Nama}
                  style={{ height: 40, marginRight: 10 }}
                />
              )}
              {props.s.InfoSekolah.Nama}
            </h5>
            <p className="text-white-50 small mb-3">
              {props.s.InfoSekolah.Alamat}
            </p>
            <div className="d-flex flex-column gap-2 small text-white-50 mb-4">
              <div>
                <i className="fa fa-phone-alt text-warning me-2"></i>
                {props.s.InfoSekolah.Telepon}
              </div>
              <div>
                <i className="fa fa-envelope text-warning me-2"></i>
                {props.s.InfoSekolah.Email}
              </div>
            </div>
            <div className="d-flex gap-2">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Visi & Misi</h6>
            <p className="text-white-50 small mb-2">{props.s.VisiMisi.Visi}</p>
            <ul className="text-white-50 small list-unstyled">
              {props.s.VisiMisi.Misi.slice(0, 3).map((m, i) => (
                <li key={i} className="mb-1 d-flex align-items-start">
                  <i className="fa fa-heart text-danger me-2 mt-1 small"></i>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Menu</h6>
            <div className="d-flex flex-column gap-2 small">
              {Object.keys(props.s.Menu).slice(0, 5).map((key, i) => (
                <a
                  key={i}
                  href={typeof props.s.Menu[key] === "object" ? props.s.Menu[key]._url || "#" : props.s.Menu[key]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-chevron-right text-warning me-2" style={{ fontSize: "0.7rem" }}></i>
                  {key}
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Tautan & Pengunjung</h6>
            <div className="d-flex flex-column gap-2 small mb-4">
              {Object.keys(props.s.PopularLinks).slice(0, 3).map((k, idx) => (
                <a
                  key={idx}
                  href={props.s.PopularLinks[k]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-link text-warning me-2" style={{ fontSize: "0.7rem" }}></i>
                  {k}
                </a>
              ))}
            </div>

            <div
              className="p-3 rounded-3"
              style={{ backgroundColor: "#881337", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="small text-white-50">JUMLAH KUNJUNGAN</div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <span className="fs-5 fw-bold text-white">{visitor.toLocaleString()}</span>
                <i className="fa fa-eye text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#2e020d" }} className="py-3 border-top border-secondary">
        <div className="container-xxl text-center text-white-50 small">
          © {new Date().getFullYear()} {props.s.InfoSekolah.Nama}. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer5;

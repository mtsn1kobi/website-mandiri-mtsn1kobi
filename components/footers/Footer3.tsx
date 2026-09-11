import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer3 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  return (
    <footer style={{ backgroundColor: "#172554", color: "#f8fafc" }} className="mt-5 pt-5">
      <div className="container-xxl">
        {/* Top Highlight Banner */}
        <div
          className="p-4 rounded-4 mb-5 text-white d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow"
          style={{ backgroundColor: "#1e3a8a", borderLeft: "6px solid #f59e0b" }}
        >
          <div>
            <h5 className="fw-bold mb-1">Siap Bergabung Bersama Kami?</h5>
            <p className="mb-0 text-white-50 small">
              Kunjungi kampus kami atau hubungi tim informasi sekolah untuk pendaftaran dan konsultasi.
            </p>
          </div>
          <a
            href="/#kontak"
            className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 flex-shrink-0"
          >
            <i className="fa fa-phone-alt me-2"></i> Kontak Sekolah
          </a>
        </div>

        {/* 4 Columns */}
        <div className="row g-5 pb-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center">
              {props.s.InfoSekolah.Logo && (
                <img
                  src={props.s.InfoSekolah.Logo}
                  alt={props.s.InfoSekolah.Nama}
                  style={{ height: 38, marginRight: 10 }}
                />
              )}
              {props.s.InfoSekolah.Nama}
            </h5>
            <p className="text-white-50 small mb-3">
              {props.s.InfoSekolah.Alamat}
            </p>
            <div className="small text-white-50 d-flex flex-column gap-2 mb-4">
              <div>
                <i className="fa fa-phone-alt text-warning me-2"></i>
                {props.s.InfoSekolah.Telepon || "(021) 1234-5678"}
              </div>
              <div>
                <i className="fa fa-envelope text-warning me-2"></i>
                {props.s.InfoSekolah.Email || "info@sekolah.sch.id"}
              </div>
              <div>
                <i className="far fa-clock text-warning me-2"></i>
                {props.s.InfoSekolah.JamKerja || "Senin - Jumat 07.00 - 16.00 WIB"}
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Visi & Misi</h6>
            <p className="text-white-50 small mb-2">{props.s.VisiMisi.Visi}</p>
            <ol className="text-white-50 small ps-3">
              {props.s.VisiMisi.Misi.slice(0, 3).map((m, i) => (
                <li key={i} className="mb-1">{m}</li>
              ))}
            </ol>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Akses Cepat</h6>
            <div className="d-flex flex-column gap-2 small">
              {Object.keys(props.s.Menu).slice(0, 5).map((k, i) => (
                <a
                  key={i}
                  href={typeof props.s.Menu[k] === "object" ? props.s.Menu[k]._url || "#" : props.s.Menu[k]}
                  className="text-white-50 text-decoration-none"
                >
                  <i className="fa fa-caret-right text-warning me-2"></i> {k}
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-warning text-uppercase fw-bold mb-3">Sosial Media & Trafik</h6>
            <div className="d-flex gap-2 mb-4">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 36, height: 36, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 36, height: 36, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 36, height: 36, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: 36, height: 36, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>

            <div
              className="p-3 rounded-3"
              style={{ backgroundColor: "rgba(30, 58, 138, 0.6)", border: "1px solid rgba(245, 158, 11, 0.3)" }}
            >
              <div className="small text-white-50">STATISTIK KUNJUNGAN</div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <span className="fs-5 fw-bold text-warning">{visitor.toLocaleString()}</span>
                <span className="badge bg-primary text-white small">Hits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#0f172a" }} className="py-3 border-top border-secondary">
        <div className="container-xxl text-center text-white-50 small">
          © {new Date().getFullYear()} {props.s.InfoSekolah.Nama}. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
};

export default Footer3;

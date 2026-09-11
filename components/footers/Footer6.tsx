import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer6 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  const popularKeys = Object.keys(props.s.PopularLinks);
  // Combine PopularLinks and QuickLinks
  const combinedLinks: { name: string; url: string }[] = [];
  const addedNames = new Set<string>();

  if (props.s.PopularLinks) {
    for (const [name, url] of Object.entries(props.s.PopularLinks)) {
      if (name && !addedNames.has(name)) {
        addedNames.add(name);
        combinedLinks.push({ name, url });
      }
    }
  }

  if (props.s.QuickLinks) {
    for (const [name, url] of Object.entries(props.s.QuickLinks)) {
      if (name && !addedNames.has(name)) {
        addedNames.add(name);
        combinedLinks.push({ name, url });
      }
    }
  }

  if (combinedLinks.length === 0 && props.s.Menu) {
    for (const [name, val] of Object.entries(props.s.Menu)) {
      if (name) {
        const url = typeof val === "object" ? val._url || "#" : val;
        combinedLinks.push({ name, url });
      }
    }
  }

  // Default fallback links if none configured
  const defaultLinks = [
    { name: "Kementerian Agama RI", url: "https://kemenag.go.id" },
    { name: "Raport Digital", url: "#" },
    { name: "Simpatika", url: "https://simpatika.kemenag.go.id" },
    { name: "Dirjen Pendis", url: "https://pendis.kemenag.go.id" },
    { name: "Perpustakaan", url: "#" },
    { name: "Sipka", url: "#" },
    { name: "Kementerian Agama Jateng", url: "https://jateng.kemenag.go.id" },
    { name: "Laporan Kinerja", url: "#" },
    { name: "E-Monev Bappenas", url: "https://e-monev.bappenas.go.id" },
    { name: "Kementerian Agama Kudus", url: "#" },
    { name: "EMIS 4.0", url: "https://emis.kemenag.go.id" },
    { name: "Submit Tugas", url: "#" },
  ];

  const quickLinksToDisplay =
    combinedLinks.length > 0 ? combinedLinks : defaultLinks;

  return (
    <footer
      id="footer"
      className="bg-white pt-5 pb-0 border-top mt-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`
        .footer6-quicklink-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          color: #ffffff !important;
          font-weight: 500;
          text-align: center;
          text-decoration: none !important;
          background: linear-gradient(to right, #059669, #84cc16);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 56px;
          line-height: 1.35;
        }
        .footer6-quicklink-btn:hover {
          color: #ffffff !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="container py-4">
        {/* Link Penting / Quick Link Section */}
        <div className="mb-5 pb-4 border-bottom">
          <div className="d-flex align-items-center gap-2 mb-4">
            <h2 className="fs-4 fw-bold text-dark m-0">Link Penting</h2>
          </div>

          <div className="row g-3 g-md-4">
            {quickLinksToDisplay.map((link, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <a
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="footer6-quicklink-btn"
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* About & Contact Row */}
        <div className="row g-5 mb-5">
          {/* Column 1: About & Vision */}
          <div className="col-lg-7 col-md-6">
            <div className="d-flex align-items-center mb-4">
              {props.s.InfoSekolah.Logo ? (
                <img
                  src={props.s.InfoSekolah.Logo}
                  alt={props.s.InfoSekolah.Nama}
                  style={{
                    height: 44,
                    width: 44,
                    objectFit: "contain",
                    marginRight: 12,
                  }}
                />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#059669",
                    border: "2px solid #fbbf24",
                  }}
                >
                  <i className="fa fa-graduation-cap text-warning small"></i>
                </div>
              )}
              <span className="text-secondary fw-semibold fs-5">
                {props.s.InfoSekolah.Nama}
              </span>
            </div>

            <div className="text-muted small">
              {props.s.VisiMisi.Visi && (
                <p className="mb-3">
                  <strong className="text-dark">Visi : </strong>
                  {props.s.VisiMisi.Visi}
                </p>
              )}

              {props.s.VisiMisi.Misi && props.s.VisiMisi.Misi.length > 0 && (
                <div>
                  <strong className="text-dark d-block mb-1">Misi :</strong>
                  <ol className="ps-3 mb-0" style={{ lineHeight: "1.8" }}>
                    {props.s.VisiMisi.Misi.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-2 pt-4">
              {props.s.InfoSekolah.Facebook && (
                <a
                  href={props.s.InfoSekolah.Facebook}
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary text-decoration-none"
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#f3f4f6",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#10d98e";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.color = "#6c757d";
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {props.s.InfoSekolah.Twitter && (
                <a
                  href={props.s.InfoSekolah.Twitter}
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary text-decoration-none"
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#f3f4f6",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#10d98e";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.color = "#6c757d";
                  }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {props.s.InfoSekolah.Instagram && (
                <a
                  href={props.s.InfoSekolah.Instagram}
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary text-decoration-none"
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#f3f4f6",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#10d98e";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.color = "#6c757d";
                  }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {props.s.InfoSekolah.Youtube && (
                <a
                  href={props.s.InfoSekolah.Youtube}
                  className="rounded-circle d-flex align-items-center justify-content-center text-secondary text-decoration-none"
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#f3f4f6",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#10d98e";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.color = "#6c757d";
                  }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="col-lg-5 col-md-6">
            <h5
              className="fw-bold text-dark mb-4"
              style={{ fontSize: "1.1rem" }}
            >
              Contact US
            </h5>
            <p className="text-muted small leading-relaxed mb-4">
              Jika ada pertanyaan, bisa menghubungi kami melalui email{" "}
              {props.s.InfoSekolah.Email ? (
                <a
                  href={`mailto:${props.s.InfoSekolah.Email}`}
                  className="text-primary text-decoration-underline"
                >
                  {props.s.InfoSekolah.Email}
                </a>
              ) : (
                <span className="text-dark">info@sekolah.sch.id</span>
              )}{" "}
              atau Telepon/Whatsapp{" "}
              {props.s.InfoSekolah.Telepon ? (
                <a
                  href={`tel:${props.s.InfoSekolah.Telepon}`}
                  className="text-primary text-decoration-underline d-block mt-1"
                >
                  {props.s.InfoSekolah.Telepon}
                </a>
              ) : (
                <span className="text-dark d-block mt-1">
                  +62 (021) 1234-5678
                </span>
              )}
            </p>

            <div className="small text-muted">
              <i
                className="fa fa-map-marker-alt me-2"
                style={{ color: "#10d98e" }}
              ></i>
              {props.s.InfoSekolah.Alamat}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Brand Green) */}
      <div
        className="text-white text-center py-3"
        style={{
          backgroundColor: "#10d98e",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        <div className="container-xxl d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>Designed and Developed by Bimasoft</span>
          <span className="small opacity-90">
            <i className="fa fa-eye me-1"></i> Total Pengunjung:{" "}
            <strong>{visitor.toLocaleString()}</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer6;

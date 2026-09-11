import { useEffect, useState } from "react";
import { getTenantId } from "../../lib/db";
import type { Settings } from "../../lib/tables/settings";
import { DataVisitor } from "../../lib/visitor";

const Footer1 = (props: { s: Settings }) => {
  const [visitor, setVisitor] = useState<number>(0);

  useEffect(() => {
    DataVisitor.get(getTenantId()).then(setVisitor).catch(console.error);
  }, []);

  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer my-6 mb-0 py-6 wow fadeIn"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
        }}
      >
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Get In Touch</h4>
              <h2 className="text-primary mb-4">
                <div style={{ float: "left" }}>
                  {props.s.InfoSekolah.Logo && (
                    <img
                      style={{ height: 40, marginRight: 15 }}
                      src={props.s.InfoSekolah.Logo}
                      alt={props.s.InfoSekolah.Nama}
                    />
                  )}
                </div>
                <div>{props.s.InfoSekolah.Nama}</div>
              </h2>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>
                {props.s.InfoSekolah.Alamat}
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>
                {props.s.InfoSekolah.Telepon}
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>
                {props.s.InfoSekolah.Email}
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Visi</h4>
              <p>{props.s.VisiMisi.Visi}</p>
              <h4 className="text-light mb-4">Misi</h4>
              <div>
                <ol>
                  {props.s.VisiMisi.Misi.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Popular Links</h4>
              {Object.keys(props.s.PopularLinks).map((key, index) => {
                return (
                  <a
                    key={index}
                    className="btn btn-link"
                    href={props.s.PopularLinks[key]}
                  >
                    {key}
                  </a>
                );
              })}
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Follow Us</h4>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-square btn-outline-light me-1"
                  href={props.s.InfoSekolah.Twitter}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light me-1"
                  href={props.s.InfoSekolah.Facebook}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light me-1"
                  href={props.s.InfoSekolah.Youtube}
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light me-0"
                  href={props.s.InfoSekolah.Instagram}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid copyright text-light py-4 wow fadeIn"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeIn",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              © <a href="/">{props.s.InfoSekolah.Nama}</a>, All Right Reserved.
              Jumlah Pengunjung
              <span className="ms-3">
                <i className="fa fa-eye me-1"></i>
                <span className="text-primary font-bold">
                  {visitor.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              Themes Powered By <a href="https://bimasoft.web.id/">Bimasoft</a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        style={{ display: "none" }}
      >
        <i className="bi bi-arrow-up"></i>
      </a>
    </>
  );
};

export default Footer1;

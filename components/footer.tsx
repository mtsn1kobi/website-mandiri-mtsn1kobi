import { getTenantId } from "../lib/db";
import { SiteSettings } from "../lib/tables/settings";
import Footer1 from "./footers/Footer1";
import Footer6 from "./footers/Footer6";

const Footer = (props: { s: SiteSettings }) => {
  const id = getTenantId();
  return (
    <>
      {id === "ailsyta6k6p7xcb" ? (
        <Footer6 {...props} />
      ) : (
        <Footer1 {...props} />
      )}
    </>
  );
};

export default Footer;

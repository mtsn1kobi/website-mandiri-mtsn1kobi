import { getTenantId } from "../lib/db";
import { SiteSettings } from "../lib/tables/settings";
import Slider1 from "./sliders/Slider1";
import Slider6 from "./sliders/Slider6";

const Slider = (props: { s: SiteSettings }) => {
  const id = getTenantId();
  return (
    <>
      {id === "ailsyta6k6p7xcb" ? (
        <Slider6 {...props} />
      ) : (
        <Slider1 {...props} />
      )}
    </>
  );
};

export default Slider;

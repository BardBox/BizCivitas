// components/PixelTracker.ts
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
const PixelTracker = () => {
  useEffect(() => {
    const pixelId = "727341753116820";
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);
  return null;
};
export default PixelTracker;
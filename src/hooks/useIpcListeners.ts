import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useIpcListeners = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // preloader strips the event before sending it to the renderer
    const handleOpenOrder = async (orderId: string) => {
      navigate(`/orders/details?order_id=${orderId}`);
    };
    window.electron.on("open-order", handleOpenOrder);

    window.electron.on("update-available", () => {
      console.log("update available");
    })

    window.electron.on("update-downloaded", () => {
      console.log("update downloaded");
    })
    return () => {
      window.electron.removeListener("open-order", handleOpenOrder);
    };
  }, []);
};

export default useIpcListeners;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/global";
import { useSupabase } from "@/lib/supabase/context";

const useIpcListeners = () => {
  const navigate = useNavigate();
  const {
    actions: { update, photoshop },
  } = useGlobalContext();

  const { setIpcSession } = useSupabase();

  useEffect(() => {
    // ? preloader strips the event before sending it to the renderer
    const handleOpenOrder = async (orderId: string) => {
      navigate(`/orders/${orderId}`);
    };

    window.electron.on("open-order", handleOpenOrder);

    window.electron.on("current-plugin-version", (version) => {
      console.log("received current plugin version from electron", version);
      photoshop.setVersion(version);
    });

    window.electron.on("update-session", (session) => {
      console.log("updating session via ipc");
      setIpcSession(session);
    });

    window.electron.on("checking-for-update", () => {
      console.log("checking for update 123");
      update.setStatus("checking-for-update");
    });

    window.electron.on("update-available", () => {
      console.log("update available");
      update.setStatus("update-available");
    });

    window.electron.on("update-downloaded", () => {
      console.log("update downloaded");
      update.setStatus("update-downloaded");
    });

    window.electron.on("update-not-available", () => {
      console.log("update not available");
      update.setStatus("update-not-available");
    });

    window.electron.on("plugin-message", ({ message }) => {
      console.log("plugin message", message);
    });

    window.electron.on("download-progress", (event) => {
      console.log("download progress", event);
      update.setProgress(event);
    });

    window.electron.on("update-error", (error) => {
      console.log("update error", error);
      update.setError(error);
    });

    return () => {
      window.electron.removeListener("open-order", handleOpenOrder);
    };
  }, []);
};

export default useIpcListeners;

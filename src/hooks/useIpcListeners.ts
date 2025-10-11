import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/global";
import { useSupabase } from "@/lib/supabase/context";
import { createLogger } from "@/lib/logging";

const useIpcListeners = () => {
  const navigate = useNavigate();
  const {
    actions: { update, photoshop },
  } = useGlobalContext();
  const { session } = useSupabase();

  const logger = useMemo(() => {
    if (session?.user?.id) {
      return createLogger("ipc-renderer", {
        sessionUser: session.user.id,
      });
    }
    return createLogger("ipc-renderer");
  }, [session?.user?.id]);

  useEffect(() => {
    // ? preloader strips the event before sending it to the renderer
    const handleOpenOrder = async (orderId: string) => {
      logger.info("open-order", { orderId });
      navigate(`/orders/${orderId}`);
    };

    const handlePluginVersion = (version: string) => {
      logger.info("plugin-version", { version });
      photoshop.setVersion(version);
    };

    const handleMainLog = (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        logger.debug("main-process-log", parsedMessage);
      } catch (error) {
        logger.warn("main-process-log-parse-error", { raw: message, error });
      }
    };

    const handleCheckingForUpdate = () => {
      logger.info("update-checking");
      update.setStatus("checking-for-update");
    };

    const handleUpdateAvailable = () => {
      logger.info("update-available");
      update.setStatus("update-available");
    };

    const handleUpdateDownloaded = () => {
      logger.info("update-downloaded");
      update.setStatus("update-downloaded");
    };

    const handleUpdateNotAvailable = () => {
      logger.info("update-not-available");
      update.setStatus("update-not-available");
    };

    const handlePluginMessage = ({ message }: { message: unknown }) => {
      logger.debug("plugin-message", message);
    };

    const handleDownloadProgress = (event: {
      percent?: number;
      transferred?: number;
      total?: number;
    }) => {
      logger.debug("download-progress", {
        percent: event.percent,
        transferred: event.transferred,
        total: event.total,
      });
      update.setProgress(event);
    };

    const handleUpdateError = (error: unknown) => {
      logger.error("update-error", error);
      update.setError(error);
    };

    window.electron.on("open-order", handleOpenOrder);
    window.electron.on("current-plugin-version", handlePluginVersion);
    window.electron.on("log", handleMainLog);
    window.electron.on("checking-for-update", handleCheckingForUpdate);
    window.electron.on("update-available", handleUpdateAvailable);
    window.electron.on("update-downloaded", handleUpdateDownloaded);
    window.electron.on("update-not-available", handleUpdateNotAvailable);
    window.electron.on("plugin-message", handlePluginMessage);
    window.electron.on("download-progress", handleDownloadProgress);
    window.electron.on("update-error", handleUpdateError);

    return () => {
      window.electron.removeListener("open-order", handleOpenOrder);
      window.electron.removeListener(
        "current-plugin-version",
        handlePluginVersion
      );
      window.electron.removeListener("log", handleMainLog);
      window.electron.removeListener(
        "checking-for-update",
        handleCheckingForUpdate
      );
      window.electron.removeListener("update-available", handleUpdateAvailable);
      window.electron.removeListener(
        "update-downloaded",
        handleUpdateDownloaded
      );
      window.electron.removeListener(
        "update-not-available",
        handleUpdateNotAvailable
      );
      window.electron.removeListener("plugin-message", handlePluginMessage);
      window.electron.removeListener(
        "download-progress",
        handleDownloadProgress
      );
      window.electron.removeListener("update-error", handleUpdateError);
    };
  }, [logger, navigate, photoshop, session?.user?.id, update]);
};

export default useIpcListeners;

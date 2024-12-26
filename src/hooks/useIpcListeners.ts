import { useEffect } from "react";

const useIpcListeners = () => {
  useEffect(() => {
    const handleDataRequest = async (args) => {
      // Logic to handle the IPC message from the main process
      // For example, fetching data and sending it back
      // const data = await fetchData(args);
      // send('data-response', data);
    };

    window.electron.on("data-request", async () => {});

    return () => {
      window.electron.removeListener("data-request", handleDataRequest);
    };
  }, []);
};

export default useIpcListeners;

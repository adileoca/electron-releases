import { useEffect } from "react";

const useIpcRenderer = () => {
  useEffect(() => {
    const { send, removeListener, on } = window.electron;

    const handleDataRequest = async (args) => {
      // Logic to handle the IPC message from the main process
      // For example, fetching data and sending it back
      // const data = await fetchData(args);
      // send('data-response', data);
    };

    on("data-request", handleDataRequest);

    return () => {
      removeListener("data-request", handleDataRequest);
    };
  }, []);
};

export default useIpcRenderer;

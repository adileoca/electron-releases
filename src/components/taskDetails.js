import { getTimestamp } from "../utils";
import { useEffect } from "react";

const ipcRenderer = window.require("electron").ipcRenderer;

const TaskDetails = ({ selectedTask }) => {
  const { thumbnail, name, size, details } = selectedTask.order_item;
  const { width_cm, height_cm, width_in, height_in } = size;

  useEffect(() => {
    console.log("item", selectedTask.order_item);
  }, [selectedTask.order_item]);

  return (
    <div className="p-8">
      <div className="flex">
        <img src={thumbnail} className="h-60 rounded-xl" alt="" />
        <div className="ml-8 flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <h2 className="text-xl font-semibold text-neutral-600">
              {`${width_cm} x ${height_cm} cm - ${width_in}" x ${height_in}"`}
            </h2>
          </div>
          <div className="pb-8">
            <h3 className="text-sm font-semibold">Ultima actualizare </h3>
            <h3 className=" text-sm font-semibold text-neutral-600">
              {getTimestamp(selectedTask.created_at)}
            </h3>
          </div>
          <div>
            <button
              onClick={() =>
                ipcRenderer.send("download-and-open-in-photoshop", {
                  image: selectedTask.order_item.image,
                  background: selectedTask.order_item.background,
                  
                })
              }
              className="inline-flex rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Deschide in Photoshop
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <h2 className="inline text-lg font-semibold">Cerinte:</h2>
        <span className="font-base text-lg">&nbsp;{details}</span>
      </div>
    </div>
  );
};

export default TaskDetails;

import React, { useEffect } from "react";

import { useGetItemsQuery, SalesTasks, SalesItems } from "@/types/graphql";
import { getTimestamp } from "@/utils";

const ipcRenderer = window.require("electron").ipcRenderer;

const EditTask: React.FC<{ selectedTask: SalesTasks }> = ({ selectedTask }) => {
  const { data, loading } = useGetItemsQuery({
    variables: { item_id: selectedTask.item_id },
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  
  return (
    <div className="p-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <Task item={data.sales_items[0] as SalesItems} task={selectedTask} />
        )
      )}
    </div>
  );
};

export default EditTask;

const Task: React.FC<{ item: SalesItems; task: SalesTasks }> = ({
  item,
  task,
}) => {
  return (
    <>
      <div className="flex">
        <img src={item.options.thumbnail} className="h-60 rounded-xl" alt="" />
        {/* // todo: replace with item.versions */}
        <div className="ml-8 flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-bold">{item.name}</h1>
            <h2 className="text-xl font-semibold text-neutral-600">
              {`${item.options.width} x ${item.options.height} cm`}
            </h2>
          </div>
          <div className="pb-8">
            <h3 className="text-sm font-semibold">Ultima actualizare </h3>
            <h3 className=" text-sm font-semibold text-neutral-600">
              {getTimestamp(task.created_at)}
            </h3>
          </div>
          <div>
            <button
              onClick={() =>
                ipcRenderer.send("download-and-open-in-photoshop", {
                  image: item.options.image.url,
                  background: item.options.background.url,
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
        <span className="font-base text-lg">&nbsp;{item.options.details}</span>
      </div>
    </>
  );
};

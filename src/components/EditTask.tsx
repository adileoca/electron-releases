import React, { useEffect } from "react";

import {
  useGetItemsByItemIdQuery,
  SalesTasks,
  SalesItems,
} from "@/types/graphql";
import { getTimestamp } from "@/utils";

const { ipcRenderer } = window.require("electron");

const EditTask: React.FC<{ selectedTask: SalesTasks }> = ({ selectedTask }) => {
  const { data, loading } = useGetItemsByItemIdQuery({
    variables: { item_id: selectedTask.item_id },
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div className="px-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        data && <Task item={data.sales_items[0]} task={selectedTask} />
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
        <img
          src={item.configuration!.thumbnail_url!}
          className="h-60 rounded-xl"
          alt=""
        />
        {/* // todo: replace with item.versions */}
        <div className="ml-8 flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-bold">{item.name}</h1>
            <h2 className="text-xl font-medium text-neutral-600">
              {/* {getTimestamp(task.created_at)} */}
              {`${item.configuration?.size?.width_cm} x ${item.configuration?.size?.height_cm} cm`}
            </h2>
          </div>
          <div className="pb-8">
            <h3 className=" text-sm font-medium text-neutral-600">
              Requirements: {item.configuration?.details}
            </h3>
          </div>
          <div>
            <button
              onClick={() =>
                ipcRenderer.send("download-and-open-in-photoshop", {
                  image: item.configuration!.main_url,
                  background: item.configuration!.background_url,
                })
              }
              className="inline-flex rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Deschide in Photoshop
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <h2 className="inline text-lg font-medium">Cerinte:</h2>
        <span className="font-base text-lg">
          &nbsp;{item.configuration?.details}
        </span>
      </div>
    </>
  );
};

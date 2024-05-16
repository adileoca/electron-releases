import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import Button from "./button";
import clsx from "clsx";

const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Oana Tiu" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  // {
  //   id: 4,
  //   type: "commented",
  //   person: {
  //     name: "Chelsea Hagon",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //   },
  //   comment:
  //     "Called client, they reassured me the invoice would be paid by the 25th.",
  //   date: "3d ago",
  //   dateTime: "2023-01-23T15:56",
  // },

  {
    id: 6,
    type: "paid",
    person: { name: "Clientul" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];

const OrderTimeline = ({ userSrc }) => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <div className="mb-5 flex items-center justify-between border-b border-neutral-200 pb-3">
        <h2 className="text-xl font-medium">Istoric</h2>
        <Button
          Icon={PencilSquareIcon}
          onClick={() => setEdit(!edit)}
          label="Adauga"
        />
      </div>
      <ul className="space-y-6">
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id} className="relative flex gap-x-4">
            <div
              className={clsx(
                activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="w-px bg-neutral-200" />
            </div>
            {activityItem.type === "commented" ? (
              <>
                <img
                  src={activityItem.person.imageUrl}
                  alt=""
                  className="relative mt-3 h-6 w-6 flex-none rounded-full bg-neutral-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-neutral-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5  leading-5 text-neutral-500">
                      <span className="font-medium text-neutral-900">
                        {activityItem.person.name}
                      </span>{" "}
                      commented
                    </div>
                    <time
                      dateTime={activityItem.dateTime}
                      className="flex-none py-0.5  leading-5 text-neutral-500"
                    >
                      {activityItem.date}
                    </time>
                  </div>
                  <p className=" leading-6 text-neutral-500">
                    {activityItem.comment}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white">
                  {activityItem.type === "paid" ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-100 ring-1 ring-neutral-300" />
                  )}
                </div>
                <p className="flex-auto py-0.5  leading-5 text-neutral-500">
                  <span className="font-medium text-neutral-900">
                    {activityItem.person.name}
                  </span>{" "}
                  {activityItem.type} the invoice.
                </p>
                <time
                  dateTime={activityItem.dateTime}
                  className="flex-none py-0.5  leading-5 text-neutral-500"
                >
                  {activityItem.date}
                </time>
              </>
            )}
          </li>
        ))}
      </ul>

      {edit && (
        <div className="mt-6 flex gap-x-3">
          <img
            src={userSrc}
            alt=""
            className="h-6 w-6 flex-none rounded-full bg-neutral-50"
          />
          <form action="#" className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-neutral-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <textarea
                rows={2}
                name="comment"
                id="comment"
                className="sm: block w-full resize-none border-0 bg-transparent py-1.5 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:leading-6"
                placeholder="Adauga comentariu..."
                defaultValue={""}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <button className="rounded-md bg-white px-2.5 py-1.5  font-medium text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50">
                Comment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;

"use client";

import { useState } from "react";
import { Paperclip, PlusCircle } from "lucide-react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";

import clsx from "clsx";

import { formatDate } from "@/lib/utils/format";
import Spinner from "@/static/spinner.svg";
import Button from "./Button";

type ActivityTypes = "positive" | "monitor" | "critical";

export type ActivityItem = {
  id?: string;
  Content: React.ReactNode;
  Details?: React.ReactNode;
  date: string;
  type: ActivityTypes;
  image?: string;
  user_id?: string;
  content?: string;
  category?: "file" | "general";
};

const ActivityFeed: React.FC<{
  activities: ActivityItem[] | null;
}> = ({ activities }) => {
  return (
    <>
      <FeedTimeline activities={activities} />
      <AddCommentArea />
    </>
  );
};

export default ActivityFeed;

const FeedTimeline: React.FC<{
  activities: ActivityItem[] | null;
}> = ({ activities }) => {
  const [selectedActivityIdx, setSelectedActivityIdx] = useState<number | null>(
    null
  );
  return (
    <>
      {activities ? (
        <div className="flex ">
          <ul
            role="list"
            className="flex-1 -space-y-px divide-y divide-white/10  pb-4"
          >
            {activities.map((activityItem, activityItemIdx) => (
              <li
                key={activityItemIdx}
                onClick={() => setSelectedActivityIdx(activityItemIdx)}
                className={clsx(
                  selectedActivityIdx === activityItemIdx &&
                    "bg-white/5 text-white/80",
                  "relative flex cursor-pointer gap-x-3 py-[9px] text-white/60 hover:bg-white/5"
                )}
              >
                <ActivityDot activityType={activityItem.type} />
                {/* <span className="font-semibold text-white/80">
                  {activityItemIdx + 1}
                </span> */}
                <div className="flex w-full justify-between">
                  {activityItem.Content}
                  <Timestamp
                    date={activityItem.date}
                    withPadding={Boolean(selectedActivityIdx !== null)}
                  />
                </div>
              </li>
            ))}
          </ul>
          {selectedActivityIdx !== null && (
            <div style={{ width: "32.5%" }}>
              <div className="h-full border-l border-white/10 text-neutral-200">
                <div className="flex items-center justify-between py-2 pl-3">
                  <div className="flex items-center space-x-3">
                    <button>
                      <ViewfinderCircleIcon className="size-5 text-white/60 hover:cursor-pointer hover:text-white" />
                    </button>
                    <h2 className=" font-medium capitalize text-white/80">
                      Category:&nbsp;
                      <span className="text-white/60">
                        {activities[selectedActivityIdx].category}
                      </span>
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <div className=" flex items-center space-x-2 border-r border-white/10 pr-4">
                      <ChevronUpIcon
                        onClick={() => {
                          setSelectedActivityIdx(
                            selectedActivityIdx !== activities.length - 1
                              ? selectedActivityIdx + 1
                              : 0
                          );
                        }}
                        className="size-5 text-white/60 hover:cursor-pointer hover:text-white"
                      />
                      <button
                        onClick={() => {
                          setSelectedActivityIdx(
                            selectedActivityIdx === 0
                              ? activities.length - 1
                              : selectedActivityIdx - 1
                          );
                        }}
                      >
                        <ChevronDownIcon className="size-5 text-white/60 hover:cursor-pointer hover:text-white" />
                      </button>
                    </div>
                    <div className=" border-l border-transparent px-2.5 pr-0 ">
                      <button onClick={() => setSelectedActivityIdx(null)}>
                        <XMarkIcon className="size-5 text-white/60 hover:cursor-pointer hover:text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pl-3">
                  {activities[selectedActivityIdx].Details ? (
                    activities[selectedActivityIdx].Details
                  ) : (
                    <div>caca</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <img className="h-12 w-12" src={Spinner} />
        </div>
      )}
    </>
  );
};

const Timestamp: React.FC<{ date: string; withPadding: boolean }> = ({
  date,
  withPadding,
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const relativeDate = formatDate(date, { relative: true, locale: "ro-RO" });
  const absoluteDate = formatDate(date, {
    hour: "numeric",
    minute: "2-digit",
    locale: "ro-RO",
  });
  return (
    <span
      className={clsx(
        withPadding ? "px-2.5" : "",
        "flex-none py-0.5 leading-5 text-white/80 hover:cursor-context-menu"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {hovered || clicked ? absoluteDate : relativeDate}
    </span>
  );
};

const ActivityDot: React.FC<{
  activityType: ActivityTypes;
}> = ({ activityType }) => {
  const activityColors: {
    [key in typeof activityType]: string;
  } = {
    positive: "shadow-green-600 outline-green-500 bg-green-600",
    monitor: "shadow-amber-600 outline-amber-500 bg-amber-600",
    critical: "shadow-red-600 outline-red-500 bg-red-600",
  };

  return (
    <div className="relative flex h-6 w-4 flex-none items-center justify-center">
      <div
        className={clsx(
          activityColors[activityType],
          "size-2 rounded-full outline outline-1 outline-offset-2"
        )}
      />
      {/* <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="size-6 rounded-full"
      /> */}
    </div>
  );
};

const AddCommentArea = () => {
  return (
    <div className="flex gap-x-3">
      <div className="relative flex-auto">
        <div className="overflow-hidden rounded-md border border-neutral-700 bg-neutral-800 pb-12 shadow shadow-black/20">
          <textarea
            id="comment"
            name="comment"
            rows={2}
            placeholder="Adaugǎ comentariu..."
            className="block w-full resize-none border-0 bg-transparent p-3 py-1.5 text-white/80 placeholder:text-neutral-400 focus:ring-0 sm:leading-6"
            defaultValue={""}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-end space-x-3 p-3">
          <div>
            <button
              onClick={() => {}}
              className="rounded-full border border-neutral-700 hover:text-white  hover:border-neutral-600 py-[3px] pl-2 pr-3 text-sm font-semibold text-white/80"
            >
              <div className="flex items-center space-x-1 ">
                <Paperclip size={14} strokeWidth={1.8} className="-rotate-45" />
                <span>Ataşeazǎ fişiere</span>
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => {}}
              className="rounded-full border border-neutral-700 hover:text-white  hover:border-neutral-600 py-[3px] pl-2 pr-3 text-sm font-semibold text-white/80"
            >
              <div className="flex items-center space-x-1 ">
                <PlusCircle size={14} strokeWidth={1.8} />
                <span>Adaugǎ notǎ</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

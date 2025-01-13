"use client";

import { useState } from "react";
import { Paperclip, PlusCircle } from "lucide-react";
import clsx from "clsx";

import { formatDate } from "@/lib/utils/format";
import Spinner from "@/static/spinner.svg";

type ActivityTypes = "positive" | "monitor" | "critical";

export type ActivityItem = {
  Content: React.ReactNode;
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
      <div className="p-3">
        <FeedTimeline activities={activities} />
      </div>
      <AddCommentArea />
    </>
  );
};

export default ActivityFeed;

const FeedTimeline: React.FC<{
  activities: ActivityItem[] | null;
}> = ({ activities }) => {
  return (
    <ul role="list" className="space-y-6">
      {activities ? (
        activities.map((activityItem, activityItemIdx) => (
          <li
            key={activityItemIdx}
            className="relative flex  gap-x-3"
          >
            <div
              className={clsx(
                activityItemIdx === 0 && activities.length > 1
                  ? "top-4 h-10"
                  : "",
                activityItemIdx === activities.length - 1 ? "" : "-bottom-8",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="w-[3px] bg-neutral-700 shadow" />
            </div>
            <MiscelaneousContent activityItem={activityItem} />
          </li>
        ))
      ) : (
        <div className="flex justify-center">
          <img className="h-12 w-12" src={Spinner} />
        </div>
      )}
    </ul>
  );
};

const MiscelaneousContent: React.FC<{ activityItem: ActivityItem }> = ({
  activityItem,
}) => {
  return (
    <>
      <ActivityDot activityType={activityItem.type} />
      <div className="flex justify-between w-full">
      {activityItem.Content}
      <Timestamp date={activityItem.date} />
      </div>
    </>
  );
};

const Timestamp: React.FC<{ date: string }> = ({ date }) => {
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
      className="flex-none py-0.5 pl-2 leading-5 text-white/80 hover:cursor-context-menu"
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
    positive: "shadow-green-600 ring-green-500 bg-green-600",
    monitor: "shadow-amber-600 ring-amber-500 bg-amber-600",
    critical: "shadow-red-600 ring-red-500 bg-red-600",
  };

  return (
    <div className="relative flex h-6 w-6 flex-none items-center justify-center">
      <div
        className={clsx(
          activityColors[activityType],
          "size-3 rounded-full shadow ring-1"
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
    <div className="mt-1.5 flex gap-x-3">
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden border-t border-white/15 bg-white/5 pb-12 shadow-sm ">
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
            <button className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/20 py-1 pl-2 pr-3 text-sm font-semibold text-white/80 shadow-sm transition hover:bg-neutral-50 hover:bg-white/30">
              <Paperclip size={16} strokeWidth={1.8} className="-rotate-45" />
              <span>Ataşeazǎ fişiere</span>
            </button>
          </div>
          <div>
            <button className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/20 py-1 pl-2 pr-3 text-sm font-semibold text-white/80 shadow-sm transition hover:bg-neutral-50 hover:bg-white/30">
              <PlusCircle size={16} strokeWidth={1.8} />
              <span>Adaugǎ notǎ</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

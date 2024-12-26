"use client";

import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
// import { PaperClipIcon } from "@heroicons/react/20/solid";
import { DbEnums, OrderDetailedType } from "@/lib/supabase/database";
import { formatDate } from "@/utils/format";
import { Paperclip, PlusCircle } from "lucide-react";

const ActivityFeed: React.FC<{
  activities: OrderDetailedType["activities"];
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
  activities: OrderDetailedType["activities"];
}> = ({ activities }) => {
  return (
    <ul role="list" className="space-y-6">
      {activities.map((activityItem, activityItemIdx) => (
        <li key={activityItemIdx} className="relative flex gap-x-3">
          <div
            className={clsx(
              activityItemIdx === 0 && activities.length > 1
                ? "top-4 h-10"
                : "",
              activityItemIdx === activities.length - 1 ? "" : "-bottom-8",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <div className="w-1 bg-neutral-700 shadow" />
          </div>
          {activityItem.comment ? (
            <CommentContent activityItem={activityItem} />
          ) : (
            <MiscelaneousContent activityItem={activityItem} />
          )}
        </li>
      ))}
    </ul>
  );
};

const CommentContent: React.FC<{
  activityItem: OrderDetailedType["activities"][0];
}> = ({ activityItem }) => {
  return (
    <>
      <img
        alt=""
        // src={activityItem.person.imageUrl}
        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-neutral-50"
      />
      <div className="flex-auto rounded-md bg-neutral-700 p-3 ring-1 ring-inset ring-neutral-600">
        <div className="flex justify-between gap-x-4">
          <div className="py-0.5 text-sm leading-5 text-neutral-300">
            <span className="font-medium text-neutral-300">
              {activityItem.user_id}
            </span>{" "}
            commented
          </div>
          <time
            dateTime={activityItem.created_at}
            className="flex-none py-0.5 leading-5 text-neutral-300"
          >
            {formatDate(activityItem.created_at, { relative: true })}
          </time>
        </div>
        <p className="leading-6 text-neutral-300">{activityItem.comment}</p>
      </div>
    </>
  );
};

const MiscelaneousContent: React.FC<{
  activityItem: OrderDetailedType["activities"][0];
}> = ({ activityItem }) => {
  return (
    <>
      <div className="relative flex h-6 w-6 flex-none items-center justify-center ">
        {!activityItem.type ? (
          <CheckCircleIcon className="h-6 w-6 rounded-full bg-green-500 text-white" />
        ) : (
          <ActivityDot activityType={activityItem.type} />
        )}
      </div>
      <p className="flex-auto py-0.5 leading-5 text-neutral-300">
        {activityItem.user && (
          <>
            <a
              href="/"
              className="font-medium text-neutral-300 hover:underline"
            >
              {activityItem.user!.name!}
            </a>
            &nbsp;
          </>
        )}
        {activityItem.description}
      </p>
      <time
        dateTime={activityItem.created_at}
        className="flex-none py-0.5 leading-5 text-white/80"
      >
        {formatDate(activityItem.created_at, { relative: true })}
      </time>
    </>
  );
};

const ActivityDot: React.FC<{
  activityType: DbEnums["order_activity_types"];
}> = ({ activityType }) => {
  const activityColors: {
    [key in typeof activityType]: string;
  } = {
    positive: "shadow-green-600 ring-green-500 bg-green-600",
    monitor: "shadow-amber-600 ring-amber-500 bg-amber-600",
    critical: "shadow-red-600 ring-red-500 bg-red-600",
  };

  return (
    <div
      className={clsx(
        activityColors[activityType],
        "size-3 rounded-full shadow ring-1"
      )}
    />
  );
};

const AddCommentArea = () => {
  return (
    <div className="mt-1.5 flex gap-x-3">
      {/* <img
        alt=""
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="h-6 w-6 flex-none rounded-full bg-neutral-50"
      /> */}
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden border-t border-white/15 bg-white/5 pb-12 shadow-sm ">
          <textarea
            id="comment"
            name="comment"
            rows={2}
            placeholder="Add your comment..."
            className="block w-full resize-none border-0 bg-transparent p-3 py-1.5 text-white/80 placeholder:text-neutral-400 focus:ring-0 sm:leading-6"
            defaultValue={""}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-end space-x-3 p-3">
          <div>
            <button className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/20 py-1.5 pl-3 pr-4 text-sm font-medium text-white/80 shadow-sm hover:bg-neutral-50 hover:bg-white/30 transition">
              <Paperclip size={16} strokeWidth={1.8} className="-rotate-45" />
              <span>Ataseaza fisiere</span>
            </button>
          </div>
          <div>
            <button className="flex items-center space-x-1 rounded-md border border-white/10 bg-white/20 py-1.5 pl-3 pr-4 text-sm font-medium text-white/80 shadow-sm hover:bg-neutral-50 hover:bg-white/30 transition">
              <PlusCircle size={16} strokeWidth={1.8} />
              <span>Adauga nota</span>

            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

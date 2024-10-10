"use client";

import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Chelsea Hagon" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "edited",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "sent",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "viewed",
    person: { name: "Alex Curren" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "paid",
    person: { name: "Alex Curren" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];

export default function ActivityFeed() {
  return (
    <div>
      <FeedTimeline />
      <AddCommentArea />
    </div>
  );
}

const FeedTimeline = () => {
  return (
    <ul role="list" className="space-y-6">
      {activity.map((activityItem, activityItemIdx) => (
        <li key={activityItem.id} className="relative flex gap-x-4">
          <div
            className={clsx(
              activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <div className="w-px bg-neutral-500" />
          </div>
          {activityItem.type === "commented" ? (
            <CommentContent activityItem={activityItem} />
          ) : (
            <MiscelaneousContent activityItem={activityItem} />
          )}
        </li>
      ))}
    </ul>
  );
};

const CommentContent = ({ activityItem }) => {
  return (
    <>
      <img
        alt=""
        src={activityItem.person.imageUrl}
        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-neutral-50"
      />
      <div className="flex-auto rounded-md bg-neutral-700 p-3 ring-1 ring-inset ring-neutral-600">
        <div className="flex justify-between gap-x-4">
          <div className="py-0.5 text-sm leading-5 text-neutral-300">
            <span className="font-medium text-neutral-300">
              {activityItem.person.name}
            </span>{" "}
            commented
          </div>
          <time
            dateTime={activityItem.dateTime}
            className="flex-none py-0.5  leading-5 text-neutral-300"
          >
            {activityItem.date}
          </time>
        </div>
        <p className="leading-6 text-neutral-300">{activityItem.comment}</p>
      </div>
    </>
  );
};

const MiscelaneousContent = ({ activityItem }) => {
  return (
    <>
      <div className="relative flex h-6 w-6 flex-none items-center justify-center ">
        {activityItem.type === "paid" ? (
          <CheckCircleIcon className="h-6 w-6 rounded-full bg-white text-blue-500" />
        ) : (
          <div className="size-3 rounded-full bg-neutral-400 ring-1 ring-neutral-500" />
        )}
      </div>
      <p className="flex-auto py-0.5 leading-5 text-neutral-300">
        <span className="font-medium text-neutral-300">
          {activityItem.person.name}
        </span>{" "}
        {activityItem.type} the invoice.
      </p>
      <time
        dateTime={activityItem.dateTime}
        className="flex-none py-0.5  leading-5 text-neutral-300"
      >
        {activityItem.date}
      </time>
    </>
  );
};

const AddCommentArea = () => {
  return (
    <div className="mt-6 flex gap-x-3">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="h-6 w-6 flex-none rounded-full bg-neutral-50"
      />
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden rounded-lg bg-neutral-700 pb-12 shadow-sm ring-1 ring-inset ring-neutral-600 focus-within:ring-2 focus-within:ring-indigo-600">
          <textarea
            id="comment"
            name="comment"
            rows={2}
            placeholder="Add your comment..."
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex items-center space-x-5">
            <div className="flex items-center">
              <button
                type="button"
                className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-500"
              >
                <PaperClipIcon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Attach a file</span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

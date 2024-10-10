import {
  HomeIcon,
  RectangleStackIcon,
  FolderIcon,
  DocumentIcon,
  ChartPieIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import React from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Tasks", href: "/tasks", icon: RectangleStackIcon },
  { name: "Orders", href: "/orders", icon: FolderIcon },
  { name: "Emails", href: "/emails", icon: EnvelopeIcon },
  { name: "Documente", href: "/documents", icon: DocumentIcon },
  { name: "Rapoarte", href: "/reports", icon: ChartPieIcon },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="absolute left-0 top-0">
      <div className="fixed flex h-screen w-60 flex-col overflow-y-auto border-r border-neutral-300 dark:border-black">
        <div className="draggable py-6" />
        <nav className="flex flex-1 flex-col px-5 pb-5 pt-2">
          <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={clsx(
                    location.pathname === item.href
                      ? "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10 dark:text-white"
                      : "text-neutral-700 hover:bg-black hover:bg-opacity-5 dark:text-neutral-200 dark:hover:bg-white  dark:hover:bg-opacity-5",
                    "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6"
                  )}
                >
                  <item.icon className="size-5 shrink-0 text-blue-600 dark:text-blue-500" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

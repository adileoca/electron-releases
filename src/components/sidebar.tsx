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
      <div className="fixed flex h-screen w-48 flex-col overflow-y-auto ">
        <div className="draggable py-6" />
        <nav className="flex flex-1 flex-col px-5 pb-5 pt-1.5">
          <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={clsx(
                    location.pathname === item.href
                      ? "bg-black/10 dark:bg-white/10 dark:text-white/90"
                      : "text-white/60 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5",
                    "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  )}
                >
                  <item.icon className="size-5 shrink-0 " />
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

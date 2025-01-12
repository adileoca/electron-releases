import React from "react";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DocumentTextIcon,
  ChartPieIcon,
  PrinterIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

import { useDatabase } from "@/lib/supabase/context";

// todo: look at user data to decide what should be available based on role
const navigation = [
  { name: "Acasǎ", href: "/", icon: HomeIcon },
  // { name: "Tasks", href: "/tasks", icon: RectangleStackIcon },
  { name: "Comenzi", href: "/orders", icon: FolderIcon },
  { name: "Printuri", href: "/prints", icon: PrinterIcon },
  // { name: "Emails", href: "/emails", icon: EnvelopeIcon },
  { name: "Rapoarte", href: "/reports", icon: ChartPieIcon },
  { name: "Documente", href: "/documents", icon: DocumentTextIcon },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useDatabase();
  return (
    <div className="absolute left-0 top-0">
      <div className="fixed flex h-screen w-48 flex-col overflow-y-auto ">
        <div className="draggable py-6" />
        <nav className="flex flex-1 flex-col justify-between px-2 pb-2 pt-1.5">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={clsx(
                    location.pathname === item.href
                      ? "bg-black/10 dark:bg-white/10 dark:text-white/90"
                      : "text-white/60 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5",
                    "group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 focus-visible:outline-none"
                  )}
                >
                  <item.icon className="size-5 shrink-0 " />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <button className="flex w-full items-center gap-x-3 rounded-md p-2 hover:bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-6 rounded-full"
            />

            <h1 className=" text-sm font-semibold text-white/80">Adi Leoca</h1>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

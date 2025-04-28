import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import clsx from "clsx";

import {
  DocumentTextIcon,
  ChartPieIcon,
  MapIcon,
  PrinterIcon,
  BuildingStorefrontIcon,
  FolderIcon,
  ArchiveBoxIcon,
  HomeIcon,
  Cog8ToothIcon,
  UserCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

import { useDatabase } from "@/lib/supabase/context";
import { useGlobalContext } from "@/context/global";

// todo: look at user data to decide what should be available based on role
const navigation = [
  { name: "Acasǎ", href: "/", icon: HomeIcon },
  // { name: "Tasks", href: "/tasks", icon: RectangleStackIcon },
  { name: "Comenzi", href: "/orders", icon: FolderIcon },
  { name: "Printuri", href: "/prints", icon: PrinterIcon },
  // { name: "Emails", href: "/emails", icon: EnvelopeIcon },
  { name: "Produse", href: "/products", icon: ListBulletIcon },
  { name: "Rapoarte", href: "/reports", icon: ChartPieIcon },
  { name: "Sesiuni", href: "/sessions", icon: BuildingStorefrontIcon },
  // { name: "Documente", href: "/documents", icon: DocumentTextIcon },
  { name: "Sabloane", href: "/templates", icon: Cog8ToothIcon },
  { name: "Setǎri", href: "/settings", icon: Cog8ToothIcon },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, userProfile } = useDatabase();

  const {
    state: { update },
  } = useGlobalContext();

  return (
    <div className="absolute left-0 top-0">
      <div className="fixed flex h-screen w-48 flex-col overflow-y-auto">
        <div className="draggable py-6" />
        <nav className="flex flex-1 flex-col justify-between p-2">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={clsx(
                    location.pathname === item.href
                      ? "bg-black/10 dark:bg-white/10 dark:text-white/90"
                      : "text-white/60 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5",
                    "group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm font-semibold leading-6 focus-visible:outline-none"
                  )}
                >
                  <item.icon className="size-5 shrink-0 " />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div>
            {/* <div className="bg-red-500">
              update status: {update.status}
              <button
                className="rounded bg-neutral-600"
                onClick={() => window.electron.send("check-updates")}
              >
                check for updates
              </button>
            </div> */}
            <button
              onClick={() => navigate("/profile")}
              className={clsx(
                location.pathname === "/profile"
                  ? "bg-black/10 dark:bg-white/10 dark:text-white/90"
                  : "text-white/60 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5",
                "group flex w-full items-center gap-x-2 rounded-md p-2 text-sm font-semibold leading-6 focus-visible:outline-none"
              )}
            >
              <div className="relative h-5 w-5 flex-none overflow-hidden rounded-full">
                <UserCircleIcon className="absolute left-0 top-0 z-10 size-5 text-white/80" />
                {/* <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-5 absolute top-0 left-0 z-20 rounded-full"
                /> */}
              </div>
              <h1 className="truncate text-sm font-semibold text-white/80">
                {userProfile?.name || session?.user.id}
              </h1>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

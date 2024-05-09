import {
  Cog6ToothIcon,
  HomeIcon,
  RectangleStackIcon,
  FolderIcon,
  DocumentIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Sarcini", href: "/tasks", icon: RectangleStackIcon },
  { name: "Comenzi", href: "/orders", icon: FolderIcon },
  { name: "Documente", href: "/documents", icon: DocumentIcon },
  { name: "Rapoarte", href: "/reports", icon: ChartPieIcon },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-60 bg-neutral-50">
      <div className="fixed flex h-screen w-60 flex-col overflow-y-auto">
        <div className="draggable py-9" />
        <nav className="flex flex-1 flex-col px-5 pb-5">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.href)}
                      className={clsx(
                        location.pathname === item.href
                          ? "bg-neutral-50 text-blue-600"
                          : "text-neutral-700 hover:bg-neutral-50 hover:text-blue-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          location.pathname === item.href
                            ? "text-blue-600"
                            : "text-neutral-400 group-hover:text-blue-600",
                          "h-6 w-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={() => navigate("/settings")}
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-neutral-700 hover:bg-neutral-50 hover:text-blue-600"
              >
                <Cog6ToothIcon
                  className="h-6 w-6 shrink-0 text-neutral-400 group-hover:text-blue-600"
                  aria-hidden="true"
                />
                Setari
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

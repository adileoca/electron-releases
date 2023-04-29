//Dashboard, Sarcini, Activitate, Notite, Setari, Profil
import TaskButton from "./task-button";
import { CogIcon } from "@heroicons/react/24/outline";
export default function Sidebar() {
  return (
    <div className="z-20 flex w-72 flex-col">
      <div className="fixed flex h-screen w-72 flex-grow flex-col overflow-y-auto border-r border-neutral-300 ">
        <div className="draggable pb-7 pt-7" />
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-2 px-5">
            <h1 className="text-md font-semibold text-neutral-600">
              Sarcini în desfășurare
            </h1>
            <TaskButton name="Retușare" number="284535" status="Urgent" />
            <h1 className="text-md pt-5 font-semibold text-neutral-600">
              Sarcini sugerate
            </h1>
            <TaskButton name="Retușare" number="284536" />
            <TaskButton name="Retușare" number="284537" />
            <TaskButton name="Retușare" number="284538" />
          </div>
        </div>
        <div className="px-5 pb-5">
          <h1 className="text-md pb-2 font-semibold text-neutral-600">
            Contul meu
          </h1>
          <div className="flex w-full items-center justify-between overflow-hidden rounded-md bg-white text-neutral-900 shadow duration-500 ">
            <button className="flex w-full items-center gap-x-3 px-3 py-2 transition hover:bg-blue-600 hover:text-white">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="text-sm font-semibold">Tom Cook</span>
            </button>
            <button className="border-l border-neutral-200 p-3 text-neutral-400 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
              <CogIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  XMarkIcon,
  MinusIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { useGlobalContext } from "@/context/global";

const ViewHeaderWrapper = ({ children }) => {
  const {
    state: { platform },
  } = useGlobalContext();
  return (
    <div className="draggable flex h-12 w-full items-center space-x-5  ">
      <div className="flex h-full w-full items-center justify-between">
        {children}
        {platform === "win32" && (
          <>
            <div className="flex space-x-4 pr-2">
              <button
                onClick={() => window.electron.minimize()}
                className=" clickable p-1 pl-0.5 text-white/80 hover:text-white disabled:text-white/40"
              >
                <MinusIcon className="size-5 stroke-2" />
              </button>

              <button
                onClick={() => window.electron.maximize()}
                className=" clickable p-1 pl-0.5 text-white/80 hover:text-white disabled:text-white/40"
              >
                <Square2StackIcon className="size-5 -scale-x-100 stroke-2" />
              </button>
              <button
                onClick={() => window.electron.close()}
                className=" clickable p-1 pl-0.5 text-white/80 hover:text-white disabled:text-white/40"
              >
                <XMarkIcon className="size-5 stroke-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewHeaderWrapper;

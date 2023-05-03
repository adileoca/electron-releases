import ButtonWithDropdown from "./components/button-with-dropdown";
import Sidebar from "./components/sidebar";
import "./styles/App.css";

export default function App() {
  return (
    <div className="relative flex h-screen">
      <Sidebar />
      <main className="flex flex-1 flex-col bg-white">
        <div className="draggable sticky top-0 z-10 flex h-14 flex-shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-100 bg-opacity-70 px-5  backdrop-blur">
          <div className="flex items-center">
            <div className="pointer-events-none mr-4 inline-flex select-none items-center text-lg">
              <h1 className=" inline-flex font-semibold">Retușare</h1>
              <h2 className="inline-flex  font-medium">&nbsp;/ 284535</h2>
            </div>
            <span className="pointer-events-none inline-flex select-none items-center gap-x-1.5 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              <svg
                className="h-1.5 w-1.5 fill-red-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Urgent
            </span>
          </div>
          <div>
            <ButtonWithDropdown />
          </div>
        </div>
        <ul className="bg-white">
          <li className="flex border-b border-neutral-200 p-5">
            <img
              src="https://django-static-872.s3.eu-south-1.amazonaws.com/media/FOWGS-frame.png"
              className="h-40 rounded-lg"
              alt=""
            />
            <div className="ml-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Oval Boemia cu fir de aur
                </h1>
                <div>
                  <button
                    type="button"
                    className="inline-flex rounded bg-blue-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Editează
                  </button>
                </div>
              </div>
              <h2 className="pb-1.5 text-base font-medium text-neutral-500">
                9 x 11 cm - Vertical
              </h2>
              <p className="border-t border-neutral-100 pt-1.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                nibh imperdiet, accumsan purus vel, aliquet elit. Sed ut mauris
                quis nisi placerat condimentum. Integer a cursus felis. Sed a
                erat ut justo euismod euismod.
              </p>
            </div>
          </li>
          <li className="flex border-b border-neutral-200 p-5">
            <img
              src="https://django-static-872.s3.eu-south-1.amazonaws.com/media/FOWGS-frame.png"
              className="h-40 rounded-lg"
              alt=""
            />
            <div className="ml-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Oval Boemia cu fir de aur
                </h1>
                <div>
                  <button
                    type="button"
                    className="inline-flex rounded bg-blue-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Editează
                  </button>
                </div>
              </div>
              <h2 className="pb-1.5 text-base font-medium text-neutral-500">
                9 x 11 cm - Vertical
              </h2>
              <p className="border-t border-neutral-100 pt-1.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                nibh imperdiet, accumsan purus vel, aliquet elit. Sed ut mauris
                quis nisi placerat condimentum. Integer a cursus felis. Sed a
                erat ut justo euismod euismod.
              </p>
            </div>
          </li>
          <li className="flex border-b border-neutral-200 p-5">
            <img
              src="https://django-static-872.s3.eu-south-1.amazonaws.com/media/FOWGS-frame.png"
              className="h-40 rounded-lg"
              alt=""
            />
            <div className="ml-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Oval Boemia cu fir de aur
                </h1>
                <div>
                  <button
                    type="button"
                    className="inline-flex rounded bg-blue-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Editează
                  </button>
                </div>
              </div>
              <h2 className="pb-1.5 text-base font-medium text-neutral-500">
                9 x 11 cm - Vertical
              </h2>
              <p className="border-t border-neutral-100 pt-1.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                nibh imperdiet, accumsan purus vel, aliquet elit. Sed ut mauris
                quis nisi placerat condimentum. Integer a cursus felis. Sed a
                erat ut justo euismod euismod.
              </p>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}

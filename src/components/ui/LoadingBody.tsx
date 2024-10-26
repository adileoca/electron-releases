import Spinner from "@/static/spinner.svg";

const LoadingBody = () => (
  <div style={{ width: "calc(100% - 192px)" }} className="fixed h-full">
    <div className="flex h-full items-center justify-center">
      <img
        className="mb-14 block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
        src={Spinner}
        alt=""
        loading="eager"
      />
    </div>
  </div>
);

export default LoadingBody;

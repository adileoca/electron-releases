import CardWrapper from "@/components/ui/CardWrapper";
import { useGlobalContext } from "@/context/global";
import Spinner from "@/static/spinner.svg";
import Button from "@/components/ui/Button";
const ViewBody = () => {
  const {
    state: { update },
  } = useGlobalContext();

  return (
    <div className="p-4">
      <div className="flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-neutral-200">
            Actualizǎri {update.status}
          </h1>
          <div>
            <Button
              onClick={() => {
                window.electron.send("check-updates", null);
              }}
            >
              Reverifică
            </Button>
          </div>
        </div>
        <div className="flex items-center py-2">
          <span className="ml-1 font-medium text-neutral-300">
            Sunteți la ultima versiune disponibilǎ: 1.0.2 (12 martie 2022)
          </span>
        </div>
        <div className="flex items-center py-2">
          <img
            className="block h-8 w-auto rounded-full ring-offset-2 transition hover:ring-2 "
            src={Spinner}
            alt=""
            loading="eager"
          />
          <span className="ml-1 font-medium text-neutral-300">
            Verific daca exista actualizari disponibile...
          </span>
        </div>
        {update.progress && (
          <div className="my-3 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-1.5 rounded-full bg-green-600"
              style={{ width: update.progress.total }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBody;

import CardWrapper from "@/components/ui/CardWrapper";
import { useGlobalContext } from "@/context/global";
import Button from "@/components/ui/Button";
import UpdateStatus from "./components/UpdateStatus";
const ViewBody = () => {
  const {
    state: { update, plugin },
    actions: { update: actions },
  } = useGlobalContext();

  return (
    <div className="p-4">
      <div className="flex-col ">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-lg font-semibold text-neutral-200">
            Actualizǎri
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              disabled={update.progress}
              onClick={() => {
                window.electron.send("check-updates", null);
              }}
            >
              Reverifică
            </Button>{" "}
            <Button
            className="text-nowrap"
              disabled={update.progress}
              onClick={() => {
                window.electron.send("install-plugin", null);
              }}
            >
              <span className="whitespace-nowrap">Instaleaza plugin</span>

            </Button>
          </div>
        </div>
        <UpdateStatus status={update.status} />
      </div>
    </div>
  );
};

export default ViewBody;

import { UpdateStatusType } from "@/context/global/types";

const UpdateStatus = ({ status }: { status: UpdateStatusType }) => {
  if (!status || status === "checking-for-update") {
    return (
      <div className="flex items-center py-2">
        <span className="ml-1 font-medium text-neutral-300">
          Verific daca exista actualizari disponibile...
        </span>
      </div>
    );
  }

  if (status === "update-available") {
    return (
      <div className="flex items-center py-2">
        <span className="ml-1 font-medium text-neutral-300">
          O noua actualizare este disponibila
        </span>
      </div>
    );
  }

  if (status === "update-downloaded") {
    return (
      <div className="flex items-center py-2">
        <span className="ml-1 font-medium text-neutral-300">
          Actualizarea a fost descarcata. Reporniti aplicatia pentru a instala
        </span>
      </div>
    );
  }

  if (status === "update-not-available") {
    return (
      <div className="flex items-center py-2">
        <span className="ml-1 font-medium text-neutral-300">
          Nu exista actualizari disponibile
        </span>
      </div>
    );
  }

  return null;
};

export default UpdateStatus;

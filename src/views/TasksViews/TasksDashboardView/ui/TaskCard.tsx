import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

const TaskCard = () => {
  return (
    <div className="h-20 rounded-lg border bg-neutral-700/50 p-2 shadow shadow-black/20 dark:border-neutral-600/60">
      <div className="flex justify-between">
        <h1 className="font-semibold dark:text-white/80">Prepare package</h1>
        <OrderStatusBadge text="Pending" />
      </div>
    </div>
  );
};

export default TaskCard;

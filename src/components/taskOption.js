import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

const TaskOption = ({ task, isSelected }) => {
  const taskClass = clsx(
    isSelected ? "text-blue-600" : "text-neutral-900",
    "w-full cursor-pointer border-b transition-all hover:bg-slate-200"
  );

  return (
    <RadioGroup.Option key={task.id} value={task}>
      <div className={taskClass}>
        <div className="relative flex items-center justify-between overflow-hidden py-2.5">
          <div className="flex">
            <h1 className="text-sm font-semibold">{task.type}</h1>
            <span className="text-sm font-normal">&nbsp;/ {task.id}</span>
          </div>
        </div>
      </div>
    </RadioGroup.Option>
  );
};

export default TaskOption;

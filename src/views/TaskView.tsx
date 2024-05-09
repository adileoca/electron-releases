import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import EditTask from "@/components/EditTask";
import { useGetTasksSubscription } from "@/types/graphql";
import { SalesTasks } from "@/types/graphql";
import clsx from "clsx";

const taskDetailsComponents = {
  EDIT: EditTask,
};

export default function TaskView() {
  const [selectedTask, setSelectedTask] = useState<SalesTasks | null>(null);

  const TaskDetailsComponent = selectedTask
    ? taskDetailsComponents[selectedTask.type]
    : null;

  return (
    <div className="mx-10 flex h-full border-t border-neutral-200 py-10">
      <div className="w-60 border-r border-neutral-200">
        <ListSuggestedTasks
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      </div>
      {selectedTask && TaskDetailsComponent && (
        <TaskDetailsComponent selectedTask={selectedTask} />
      )}
    </div>
  );
}

const ListSuggestedTasks: React.FC<{
  selectedTask: SalesTasks | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<SalesTasks | null>>;
}> = ({ selectedTask, setSelectedTask }) => {
  const { data, loading } = useGetTasksSubscription();

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <RadioGroup
      value={selectedTask}
      onChange={(task: SalesTasks | null) => setSelectedTask(task)}
    >
      <RadioGroup.Label
        as="div"
        className="py-2.5  text-sm font-semibold text-neutral-600"
      >
        SARCINI SUGERATE
      </RadioGroup.Label>
      <div className="border-t border-neutral-200">
        {loading
          ? "Loading tasks..."
          : data?.sales_tasks.map((task) => (
              <RadioGroup.Option key={task.id} value={task}>
                <div
                  className={clsx(
                    "w-full cursor-pointer border-b transition-all hover:bg-neutral-50",
                    selectedTask?.id === task.id
                      ? "text-blue-600"
                      : "text-neutral-900"
                  )}
                >
                  <div className="relative flex items-center justify-between overflow-hidden py-2.5 pl-2">
                    <div className="flex">
                      <h1 className="text-sm font-semibold">{task.type}</h1>
                      <span className="text-sm font-normal">
                        &nbsp;/ {task.id}
                      </span>
                    </div>
                  </div>
                </div>
              </RadioGroup.Option>
            ))}
      </div>
    </RadioGroup>
  );
};

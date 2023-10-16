import { useEffect, useState, useMemo } from "react";
import { RadioGroup } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import TaskOption from "../components/taskOption";
import TaskDetails from "../components/taskDetails";
import "../styles/App.css";

export default function TaskView() {
  const auth0 = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await auth0.getAccessTokenSilently();
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/tasks/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("tasks", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
    const intervalId = setInterval(fetchTasks, 30000);
    return () => clearInterval(intervalId);
  }, [auth0]);

  const renderedTasks = useMemo(
    () =>
      tasks.map((task) => (
        <TaskOption
          key={task.id}
          task={task}
          isSelected={selectedTask?.id === task.id}
        />
      )),
    [tasks, selectedTask]
  );

  return (
    <div className="mx-10 flex h-full border-t border-neutral-200 pb-10">
      <div className="w-60 border-r border-neutral-200">
        <RadioGroup
          value={selectedTask}
          onChange={(task) => {
            setSelectedTask(task);
          }}
        >
          <RadioGroup.Label
            as="div"
            className="pb-2.5 pt-8 text-sm font-semibold text-neutral-600"
          >
            SARCINI SUGERATE
          </RadioGroup.Label>
          <div className="border-t border-neutral-200 ">{renderedTasks}</div>
        </RadioGroup>
      </div>
      {selectedTask && <TaskDetails selectedTask={selectedTask} />}
    </div>
  );
}

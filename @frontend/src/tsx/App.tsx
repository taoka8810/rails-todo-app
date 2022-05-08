import React, { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import { CreateTaskForm } from "./CreateTaskForm";
import axios from "axios";

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<
    { name: string; is_done: boolean; id: number }[]
  >([]);
  const fetch = async () => {
    const res = await axios.get("http://localhost:3010/tasks");
    setTasks(res.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <main>
      <div className="l-task-list">
        {tasks.map((task, index) => {
          return (
            <TaskCard
              key={index}
              taskId={task.id}
              title={task.name}
              isDone={task.is_done}
              fetch={fetch}
            />
          );
        })}
      </div>
      <div className="l-create-task">
        <CreateTaskForm fetch={fetch} />
      </div>
    </main>
  );
};

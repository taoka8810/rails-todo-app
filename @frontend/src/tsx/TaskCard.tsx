import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

type TaskCardProps = {
  title: string;
  taskId: number;
  isDone: boolean;
  fetch: () => void;
};

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.isDone);

  // タスク完了処理
  const updateTask = async (id: number) => {
    await axios.put(`http://localhost:3010/tasks/${id}`, {
      is_done: !isChecked,
    });
    props.fetch();
  };

  // タスクの削除
  const destroyTask = async (id: number) => {
    await axios.delete(`http://localhost:3010/tasks/${id}`);
    props.fetch();
  };
  return (
    <div className="c-task-card">
      <div className="c-task-card__checkbox">
        <div
          className="c-task-card__checkbox-button"
          onClick={() => {
            setIsChecked(!isChecked);
            updateTask(props.taskId);
          }}
        >
          <FontAwesomeIcon
            className="c-task-card__checkbox-button-icon"
            icon={faCheck}
          />
        </div>
        <span className="c-task-card__checkbox-text">{props.title}</span>
      </div>
      <div className="c-task-card__delete-button">
        <FontAwesomeIcon
          className="c-task-card__delete-button-icon"
          icon={faTrash}
          onClick={() => destroyTask(props.taskId)}
        />
      </div>
    </div>
  );
};

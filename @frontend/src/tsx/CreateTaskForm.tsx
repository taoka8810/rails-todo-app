import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

type CreateTaskFormProps = {
  fetch: () => void;
};

export const CreateTaskForm: React.FC<CreateTaskFormProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const createTask = async () => {
    await axios.post("http://localhost:3010/tasks", {
      name: name,
      is_done: false,
    });
    setName("");
    props.fetch();
  };
  return (
    <div className="p-create-task">
      <button
        className={
          isFormOpen
            ? "p-create-task__open-button--hide"
            : "p-create-task__open-button"
        }
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <FontAwesomeIcon
          className="p-create-task__open-button-icon"
          icon={faPlus}
        />
      </button>

      <div
        className={
          isFormOpen ? "p-create-task__form" : "p-create-task__form--hide"
        }
      >
        <button
          className="p-create-task__submit-button"
          onClick={() => {
            createTask();
            setIsFormOpen(!isFormOpen);
          }}
        >
          <FontAwesomeIcon
            className="p-create-task__submit-button-icon"
            icon={faCheck}
          />
        </button>

        <input
          type="text"
          className="p-create-task__input-text"
          value={name}
          placeholder="タスク名を入力"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

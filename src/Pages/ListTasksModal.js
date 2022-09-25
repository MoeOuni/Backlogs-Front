import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import GlobalContext from "../contexts/GlobalContext";
import axios from "axios";
import TaskUpdateModal from "./TaskUpdateModal";

const ListTasksModal = (props) => {
  const { modal, toggle, backlog, setBacklog, setModal } = props;

  const [list, setList] = useState([]);
  const [modalTask, setModalTask] = useState(false);
  const [Task, setTask] = useState({});

  React.useEffect(() => {
    async function fetchAll() {
      const { data } = await axios.get("http://localhost:5000/api/v1/backlogs");

      setList(data);

      return data;
    }

    fetchAll();
  }, []);
  const toggleTask = () => {
    setModalTask(!modalTask);
  };

  return (
    <div>
      <TaskUpdateModal
        modalTask={modalTask}
        setModalTask={setModalTask}
        toggleTask={toggleTask}
        Task={Task}
        setTask={setTask}
        setList={setBacklog}
        list={backlog}
      />
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalBody>
          <ul>
            {list.map((l, index) => {
              return (
                <li
                  onClick={() => {
                    setModalTask(!modalTask);
                    setModal(false);
                    setTask(l);
                  }}
                  key={index}
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    backgroundColor: "lightgray",
                    marginTop: "13px",
                    padding: "20px 20px ",
                    borderRadius: "13px",
                  }}
                >
                  {l.title}{" "}
                </li>
              );
            })}
          </ul>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ListTasksModal;

import React, { useState } from "react";

import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import Accordion from "react-bootstrap/Accordion";
import ModalInput from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../contexts/GlobalContext";
import axios from "axios";
import UpdateTaskBacklogModal from "./UpdateTaskBacklogModal";

const Backlog = () => {
  const [modal, setModal] = React.useState(false);
  const [newBacklog, setNewBackLog] = useState("");
  const [list, setList] = useState([]);
  const [updateTaskBacklogModal, setUpdateTaskBacklogModal] = useState("");
  // const { list, setList } = React.useContext(GlobalContext);

  const toggle = () => {
    setModal(!modal);
  };

  React.useEffect(() => {
    async function fetchAll() {
      const { data } = await axios.get("http://localhost:5000/api/v1/backlogs");
      console.log(data);
      setList(data);

      return data;
    }

    fetchAll();
  }, []);

  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const handleSort = () => {
    let storyList = [...list];
    const draggedItemContent = storyList.splice(dragItem.current, 1)[0];
    storyList.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(storyList);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/v1/backlogs/" + id);

      const newArray = list.filter((l) => l._id !== id);

      setList(newArray);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleUpdate = () => {
    console.log("update");
  };

  const updateTaskBacklogToggle = (object) => {
    setUpdateTaskBacklogModal(!updateTaskBacklogModal);
    setSingleTask(object);
  };

  //   const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: Number) => {
  //     console.log("drag started", index);
  //   };
  //   const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: Number) => {
  //     console.log("drag enter", index);
  //   };
  //   const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //     console.log("drag end");
  //   };
  const [singleTask, setSingleTask] = useState({});

  return (
    <div>
      <UpdateTaskBacklogModal
        singleTask={singleTask}
        setSingleTask={setSingleTask}
        setList={setList}
        list={list}
        updateTaskBacklogModal={updateTaskBacklogModal}
        setUpdateTaskBacklogModal={setUpdateTaskBacklogModal}
        updateTaskBacklogToggle={updateTaskBacklogToggle}
      />
      <ModalInput
        modal={modal}
        setModal={setModal}
        userStory={newBacklog}
        setUserStory={setNewBackLog}
        setList={setList}
        list={list}
      />
      <Accordion
        defaultActiveKey="1"
        style={{
          marginBottom: 15,

          marginTop: "5rem",
          marginInline: "3rem",
        }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <h5> Backlog P.O </h5>
              </div>

              <div
                style={{
                  backgroundColor: "#EA4949",
                  border: "none",
                  borderRadius: "0.7rem",
                  width: "4.3rem",
                  height: "2rem",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "0.2rem",
                }}
                onClick={toggle}
              >
                Add US
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              {list.map((l, index) => {
                return (
                  <Row>
                    <Col lg="10">
                      <li
                        onDragStart={(e) => {
                          dragItem.current = index;
                          console.log("Drag strat: ", index);
                        }}
                        onDragEnter={(e) => {
                          dragOverItem.current = index;
                          console.log("Drag strat: ", index);
                        }}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                        draggable
                        key={index}
                        style={{
                          cursor: "move",
                          listStyle: "none",
                          backgroundColor: "lightgray",
                          marginTop: "13px",
                          padding: "20px 20px",
                          borderRadius: "13px",
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: "1rem" }}
                          icon={faList}
                        />{" "}
                        {l.title}{" "}
                      </li>
                    </Col>
                    <Col
                      lg="1"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "0.2rem",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => updateTaskBacklogToggle(l)}
                    >
                      <FontAwesomeIcon icon={faPenSquare} />
                    </Col>
                    <Col
                      lg="1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleDelete(l._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Col>
                  </Row>
                );
              })}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Backlog;

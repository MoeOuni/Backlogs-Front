import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Accordion from "react-bootstrap/Accordion";
import { Button, Table, Col, Row, Container } from "reactstrap";
import Cart from "./Cart";
import ListTasksModal from "./ListTasksModal";
import TaskUpdateModal from "./TaskUpdateModal";
import axios from "axios";

const Sprint = () => {
  const [modal, setModal] = useState(false);
  const [backlog, setBacklog] = useState([]);
  const [started, setStarted] = useState(true);
  const [sprint, setSprint] = useState(true);

  useEffect(() => {
    async function fetchSprints() {
      const { data } = await axios.get("http://localhost:5000/api/v1/sprints");

      setBacklog(data);

      return data;
    }

    fetchSprints();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    console.log(backlog);
  }, [backlog]);

  return (
    <Container>
      <div style={{ marginTop: "2rem" }}>
        <ListTasksModal
          backlog={backlog}
          setBacklog={setBacklog}
          toggle={toggle}
          modal={modal}
          setModal={setModal}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            borderBottom: "1px solid black",
          }}
        >
          <Button
            style={{
              backgroundColor: "#87CEFA",
              color: "white",
              marginBottom: ".5rem",
              border: "none",
            }}
            onClick={toggle}
          >
            <FontAwesomeIcon icon={faPlus} /> Ajouter nouvelle Task
          </Button>
          <div>
            <Button
              style={{
                backgroundColor: "white",
                color: "grey",
                border: "none",
              }}
              onClick={() => setStarted(true)}
            >
              Start sprint
            </Button>
            <Button
              disabled={!started}
              style={{
                backgroundColor: "white",
                color: "grey",
                border: "none",
              }}
              onClick={() => {
                setStarted(false);
                setSprint(true);
              }}
            >
              End sprint
            </Button>
          </div>
        </div>

        {started && (
          <Table>
            <Row>
              <Col xs="12" lg="2">
                <div
                  style={{
                    backgroundColor: "#00BFFF",
                    width: "100%",
                    borderRadius: "13px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Backlog
                </div>

                {backlog.map((b, index) => {
                  if (!b.status)
                    return (
                      <Cart
                        List={backlog}
                        setList={setBacklog}
                        backlog={b}
                        setBacklog={setBacklog}
                        index={index}
                        key={index}
                      />
                    );
                })}
              </Col>
              <Col xs="12" lg="2">
                <div
                  style={{
                    backgroundColor: "#800080",
                    borderRadius: "13px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  To Do
                </div>
                {backlog.map((b, index) => {
                  if (b.status === "Todo")
                    return (
                      <Cart
                        backlog={b}
                        List={backlog}
                        setList={setBacklog}
                        setBacklog={setBacklog}
                        index={index}
                        key={index}
                      />
                    );
                })}
              </Col>
              <Col xs="12" lg="2">
                <div
                  style={{
                    backgroundColor: "#FF8C00",
                    borderRadius: "13px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  In Progress
                </div>
                {backlog.map((b, index) => {
                  if (b.status === "In progress")
                    return (
                      <Cart
                        backlog={b}
                        List={backlog}
                        setList={setBacklog}
                        setBacklog={setBacklog}
                        index={index}
                        key={index}
                      />
                    );
                })}
              </Col>
              <Col xs="12" lg="2">
                <div
                  style={{
                    backgroundColor: "#FF1493",
                    borderRadius: "13px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  To Test
                </div>
                {backlog.map((b, index) => {
                  if (b.status === "To test")
                    return (
                      <Cart
                        backlog={b}
                        List={backlog}
                        setList={setBacklog}
                        setBacklog={setBacklog}
                        index={index}
                        key={index}
                      />
                    );
                })}
              </Col>
              <Col xs="12" lg="2">
                <div
                  style={{
                    backgroundColor: "#228B22",
                    borderRadius: "13px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Done
                </div>
                {backlog.map((b, index) => {
                  if (b.status === "Done")
                    return (
                      <Cart
                        backlog={b}
                        List={backlog}
                        setList={setBacklog}
                        setBacklog={setBacklog}
                        index={index}
                        key={index}
                      />
                    );
                })}
              </Col>{" "}
            </Row>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default Sprint;

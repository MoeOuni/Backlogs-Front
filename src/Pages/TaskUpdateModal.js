import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  Label,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";

function TaskUpdateModal(props) {
  const { modalTask, setModalTask, toggleTask, list, setList, Task, setTask } =
    props;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/sprints/",
        Task
      );

      setList((list) => [...list, data]);

      setModalTask(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Modal size="lg" isOpen={modalTask} toggle={toggleTask}>
      <ModalHeader toggle={toggleTask}>
        <h4
          style={{
            fontFamily: "sansSerif",
            color: "#2E8B57",
            fontSize: "1.5rem",
          }}
        >
          Update your task :
        </h4>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col xs="12" lg="4">
              <Label for="name">Name task :</Label>
            </Col>
            <Col xs="12" lg="8">
              <Input
                name="email"
                id="name"
                value={Task.title}
                onChange={(e) => {
                  setTask({ ...Task, title: e.target.value });
                }}
              />
            </Col>
          </Row>

          <Row style={{ paddingBlock: "1rem" }}>
            <Col xs="12" lg="4">
              <Label for="description">Description :</Label>
            </Col>
            <Col xs="12" lg="8">
              <Input
                type="textarea"
                value={Task.description}
                onChange={(e) => {
                  setTask({ ...Task, description: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="4">
              <Label for="dateCreation">Date Creation :</Label>
            </Col>
            <Col xs="12" lg="8">
              <Input
                type="date"
                name="email"
                value={Task.date}
                onChange={(e) => {
                  setTask({ ...Task, date: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: ".5rem" }}>
            <Col xs="12" lg="4">
              <Label for="dateCreation">Status :</Label>
            </Col>
            <Col xs="12" lg="8">
              <Input
                className="mb-3"
                type="select"
                onChange={(e) => {
                  setTask({ ...Task, status: e.target.value });
                }}
              >
                <option></option>
                <option value="Todo">Todo</option>
                <option value="In progress">In progress</option>
                <option value="To test">To test</option>
                <option value="Done">Done</option>
              </Input>
            </Col>
          </Row>
          {/* <Input
        placeholder="add youd user story"
        onChange={handleChange}
      ></Input> */}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSubmit}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default TaskUpdateModal;

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
import moment from "moment";

function UpdateModal(props) {
  const { modalTask, setModalTask, toggleTask, Task, setTask, setList, List } =
    props;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/v1/sprints/" + Task._id,
        Task
      );

      setList((List) => {
        return List.filter((l) => (l._id !== Task._id ? l : Task));
      });

      setModalTask(false);
    } catch (error) {
      console.log(error);
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
                value={moment(Task.date).format("YYYY-MM-DD")}
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
                defaultValue={Task.status}
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

export default UpdateModal;

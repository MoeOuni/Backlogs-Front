import axios from "axios";
import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const UpdateTaskBacklogModal = (props) => {
  const {
    updateTaskBacklogModal,
    setUpdateTaskBacklogModal,
    updateTaskBacklogToggle,
    singleTask,
    setSingleTask,
    list,
    setList,
  } = props;

  const handleUpdate = async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/v1/backlogs/" + singleTask._id,
        singleTask
      );

      setList((list) => {
        return list.filter((l) => (l._id === singleTask._id ? singleTask : l));
      });

      updateTaskBacklogToggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const temp = e.target.value;
  };
  return (
    <Modal size="lg" isOpen={updateTaskBacklogModal}>
      <ModalHeader toggle={updateTaskBacklogToggle}>
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
              <Label for="name">Task Name :</Label>
            </Col>
            <Col xs="12" lg="8">
              <Input
                name="email"
                id="name"
                value={singleTask.title}
                onChange={(e) => {
                  setSingleTask({ ...singleTask, title: e.target.value });
                }}
              />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleUpdate}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTaskBacklogModal;

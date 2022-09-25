import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import axios from "axios";

const ModalInput = (props) => {
  const { modal, setModal, userStory, setUserStory, setList, list } = props;

  const handleChange = (e) => {
    setUserStory(e.target.value);
  };

  const toggle = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/backlogs/",
        { title: userStory }
      );
      setList((list) => [...list, data]);
      setModal(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Modal size="lg" isOpen={modal}>
      <ModalBody>
        <Input
          placeholder="add youd user story"
          onChange={handleChange}
        ></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalInput;

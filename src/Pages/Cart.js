import moment from "moment/moment";
import React, { useState } from "react";
import { List } from "reactstrap";
import UpdateModal from "./UpdateModal";

const Cart = (props) => {
  const { List, setList } = props;
  const [modal, setModal] = useState(false);

  const [backlog, setBacklog] = useState(props.backlog);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div
      onClick={toggle}
      style={{
        margin: "10px auto",
        borderRadius: "13px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 0 5px  black",
      }}
    >
      <UpdateModal
        List={List}
        setList={setList}
        modalTask={modal}
        setModalTask={setModal}
        toggleTask={toggle}
        Task={backlog}
        setTask={setBacklog}
      />
      <h5>{backlog.title}</h5>
      <h6>{backlog.description}</h6>
      <h6>{moment(backlog.date).format("DD-MM-YYYY")}</h6>
    </div>
  );
};

export default Cart;

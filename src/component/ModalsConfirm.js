import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import { deleteUsers } from "../service/userService";
import { toast } from "react-toastify";
const ModalsConfirm = (props) => {
  const { show, handleClose, dataDeleteUsers, handleDeleteUserFromModal } = props;

  const handleClickDelete = async () => {
    let res = await deleteUsers(dataDeleteUsers.id);
    if (res && res.statusCode === 204) {
      toast.success("Delete success");
      handleClose();
      handleDeleteUserFromModal(dataDeleteUsers);
    } else {
      toast.error("Error when deleting user");
    }
    console.log(">>>check res", res);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Delete users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Do u want delete users ?
            <br />
            <b>Email : {dataDeleteUsers.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClickDelete()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalsConfirm;

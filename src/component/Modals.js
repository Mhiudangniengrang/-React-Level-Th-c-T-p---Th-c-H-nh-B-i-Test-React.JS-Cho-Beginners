import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postNewUsers } from "../service/userService";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modals = (props) => {
  const { handleUpdateUsers } = props;
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    job: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClickSubmit = async () => {
    let res = await postNewUsers(formData.name, formData.job);
    if (res && res.id) {
      //succes
      handleClose();
      setformData("");
      handleUpdateUsers({ first_name: formData.name, id: res.id });
    } else {
      //error
    }
    console.log("Submit success", res);
    toast.success("Add new user success");
  };

  return (
    <>
      <Button className="btn btn-success" onClick={handleShow}>
        <FontAwesomeIcon icon={faCirclePlus} /> Add new
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Add new users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                name="job"
                placeholder="Job"
                value={formData.job}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClickSubmit()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;

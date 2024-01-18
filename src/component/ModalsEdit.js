import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putUpdateUsers } from "../service/userService";

const ModalsEdit = (props) => {
  const { show, handleClose, dataUsers } = props;
  const [formData, setformData] = useState({
    name: "",
    job: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleClickEdit = async () => {
    let res = await putUpdateUsers(formData.name, formData.job);
    console.log(res);
  };

  useEffect(() => {
    if (show) {
      setformData(() => ({
        name: dataUsers.first_name,
      }));
    }
  }, [dataUsers]);

//   console.log(dataUsers);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a users</Modal.Title>
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
          <Button variant="primary" onClick={() => handleClickEdit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalsEdit;

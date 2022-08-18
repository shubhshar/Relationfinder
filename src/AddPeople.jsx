import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const AddPeople = ({ addPeople }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  };

  const peopleAdd = () => {
    setName("");
    setShow(true);
  };
  const peopleAddClose = () => {
    addPeople({ name });
    setShow(false);
  };

  const peopleAddClosenosave = () => {
    setShow(false);
  };

  return (
    <>
      <Button style={{ background: "#435f4b" }} onClick={peopleAdd}>
        Add people
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add people</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Name"
            autoComplete="off"
            value={name}
            onChange={onChange}
          />
        </Modal.Body>
        <Modal.Footer className="modalFooterbutton">
          <Button variant="secondary" onClick={peopleAddClosenosave}>
            Close
          </Button>
          <Button variant="success" onClick={peopleAddClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddPeople;

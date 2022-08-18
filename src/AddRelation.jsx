import { Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";

import React, { useState } from "react";

const AddRelation = ({ people, addRelation }) => {
  const [show, setShow] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState({});

  const relationAdd = () => setShow(true);
  const relationAddClose = () => setShow(false);

  const relationAddCloseNoSave = () => {
    setSelectedPeople({});
    setShow(false);
  };
  const relationAddCloseSave = () => {
    addRelation(selectedPeople.people1, selectedPeople.people2);
    setShow(false);
    setSelectedPeople({});
  };

  const onChange = (e, name) => {
    setSelectedPeople((prev) => ({ ...prev, [name]: e }));
  };
  return (
    <div className="relationFrame">
      <Button variant="light" onClick={relationAdd}>
        Add Relation
      </Button>
      <Modal show={show} onHide={relationAddClose}>
        <Modal.Header>
          <Modal.Title>Add relation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="relationAdder">
            <DropdownButton
              variant="light"
              id="dropdown-basic-button"
              name="people1"
              title={selectedPeople?.people1 || "Add people"}
              onSelect={(e) => onChange(e, "people1")}
            >
              {people?.map((data) => (
                <Dropdown.Item eventKey={data.name}>{data.name}</Dropdown.Item>
              ))}
            </DropdownButton>
            <h6>will be friend of</h6>
            <DropdownButton
              id="dropdown-basic-button"
              name="people2"
              variant="light"
              title={selectedPeople?.people2 || "Add people"}
              onSelect={(e) => onChange(e, "people2")}
            >
              {people?.map((data) => (
                <Dropdown.Item eventKey={data.name}>{data.name}</Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooterbutton">
          <Button
            style={{ background: "#b04040" }}
            onClick={relationAddCloseNoSave}
          >
            Close
          </Button>
          <Button variant="success" onClick={relationAddCloseSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddRelation;

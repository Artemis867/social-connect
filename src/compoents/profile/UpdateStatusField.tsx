import React, { useEffect, useState } from "react";
import { Row, Col, Card, FormControl, Button } from "react-bootstrap";

function UpdateStatusField({status, onProcessStatus, onProcessDeleteStatus}) {

  const [value, setValue] = useState('');
  const [onUpdateField, setOnUpdateField] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleUpdateStatus = () => {
    onProcessStatus(status.statusId, value);
    setOnUpdateField(false);
  }

  const handleDeleteStatus = () => {
    onProcessDeleteStatus(status.statusId);
  }

  const handleOnUpdateField = () => {
    setOnUpdateField(!onUpdateField);
  }

  return (
    <>
      <Row>
        <Col sm="8">
          { onUpdateField ? (
            <FormControl 
              type="text" 
              placeholder="Enter text" 
              defaultValue={status.statusContent} 
              onChange={e => handleChange(e)} 
            />
          ) : 
          (
            <span className="p-2">
              {status.statusContent}
            </span>
          )}
        </Col>
        <Col sm="4">
          {onUpdateField ? (
            <Button variant="primary" onClick={e => handleUpdateStatus()}>Update</Button>
          ) : (
            <>
              <Button variant="primary" onClick={e => handleOnUpdateField()} className="m-1">Edit</Button>
              <Button variant="primary" onClick={e => handleDeleteStatus()} className="m-1">Delete</Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default UpdateStatusField;
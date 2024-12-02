import React, { useEffect, useState } from "react";
import { Row, Col, Card, FormControl, Button } from "react-bootstrap";
import StatusData from "./Status.interface";
import axios from "axios";


function UpdateStatusField({id ,status, onProcessStatus, onProcessDeleteStatus} : {
  id: string | number,
  status: StatusData,
  onProcessStatus: (statusId: number, status: string) => void
  onProcessDeleteStatus: (statusId: number) => void 
}) {

  const [value, setValue] = useState('');
  const [onUpdateField, setOnUpdateField] = useState(false);

  const handleUpdateStatus = async () => {
    onProcessStatus(status.statusId, value);
    setOnUpdateField(false);

    await axios.post("http://localhost:4000/status/update", {id, newStatus: value});
  }

  const handleDeleteStatus = async () => {
    onProcessDeleteStatus(status.statusId);
    await axios.post("http://localhost:4000/status/delete", {id});
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
              onChange={e => setValue(e.target.value)} 
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
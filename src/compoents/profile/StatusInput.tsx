import React, {useState, useEffect, useCallback} from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface StatusData {
  statusId: number,
  status: string,
};


function StatusInput ({onSetStatus} : {onSetStatus: (status: string | number) => void}) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data: StatusData) => {
    onSetStatus(data.status); 
    reset();
  }

  return(
    <>
      <Container className="m-2">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Task Field */}
          <Form.Group as={Row} controlId="formName">
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="add dumbshit opinion here"
                {...register('status', { required: true })}
              />
              {errors.name && <Form.Text className="text-danger">Status is required</Form.Text>}
            </Col>
            <Col sm="2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default StatusInput;
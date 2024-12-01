import React, {useState, useCallback, useEffect } from "react";
import { Card, Form, FormControl, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage () {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [isShaking, setIsShaking] = useState(false);

  const navigate = useNavigate();

  const CardStyle = {
    width: "400px",
    animation: isShaking ? 'shake 0.5s' : 'none',
    animationIterationCount: 'infinite',
  };

  const shakeAction = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  };


  const keyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;

  const onSubmit = async (data) => {
    console.log('FORMDATA');
    console.log(data);
    const response = await axios.post('http://localhost:4000/user/login', data);

    const { token, success } = response.data;
    // Store the token in local storage or cookies
    localStorage.setItem('token', token);

    if(success) {
      navigate('/profile');
    } else {
      shakeAction();
      reset();
    }
  }

  return(
    <>
      <style>
       {keyframes} 
      </style>
      <Container fluid="lg"
        className="d-flex justify-content-center align-items-center vh-100 p-2"
      >
        <Card className="p-4" style={CardStyle}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                className="m-1"
                {...register('username', { required: true })}
              />
              {errors.name && <Form.Text className="text-danger">Username is required</Form.Text>}
              <Form.Control
                type="password"
                placeholder="Password"
                className="m-1"
                {...register('password', { required: true })}
              />
              {errors.name && <Form.Text className="text-danger">Password is required</Form.Text>}
              <Button className="w-100 m-1" variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  )
}

export default LoginPage;
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const Register = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);


  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    // alert(`Name: ${name} Email: ${email} Password: ${password}`);
    // clear the form
    fetch("http://localhost:4000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRegister(true);
        console.log(data);
        cookies.set("UserMail", email, {
          path: "/",
        });
        cookies.set("UserName", name, {
          path: "/",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* name */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {register ? (
        <p className="text-success">You Are Registered Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Registered</p>
      )}
    </>
  );
};

export default Register;

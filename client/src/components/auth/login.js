import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

const cookies = new Cookies();


const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Login, setLogin] = useState(false);


  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    fetch("http://localhost:4000/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        cookies.set("UserMail", email, {
          path: "/",
        });

        setLogin(true);

        

        // console.log(data);
        
          window.location.href = "/";
      })
      .catch((err) => {
        console.log(err.message);
      });





  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
      {Login ? (
        <p className="text-success">You Are Loged Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Loged</p>
      )}
    </>
  );
};

export default Login;

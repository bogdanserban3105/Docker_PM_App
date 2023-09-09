import { Container, Col, Row } from "react-bootstrap";
import Register from "./register";
import Login from "./login";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const logout = () => {
    // destroy the cookie
    cookies.remove("UserMail", { path: "/" });
    cookies.remove("UserName", { path: "/" });
    window.location.href = "/auth/";
}

const mailCookies = cookies.get("UserMail");
const userCookies = cookies.get("UserName");

function AuthOld() {



    const [message, setMessage] = useState("");


    useEffect(() => {
        if (mailCookies) {
            setMessage( userCookies +"You are already logged in with your email address " + mailCookies);
        }
        else {
            setMessage("");
        }
    }
        , []);


    return (
        <>

            {!mailCookies ? (
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Register />
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <Login />
                        </Col>
                    </Row>

                </Container>
            ) : (
                <Container >
                    <h3 className="text-center text-danger">{message}</h3>
                    <div className="col-md-12 text-center">
                        <Button type="submit" variant="danger" onClick={() => logout()}>
                            Logout
                        </Button>
                    </div>
                </Container>
            )}
        </>
    );
}

export default AuthOld;
import React, { useState, useEffect } from "react";
import "./App.css";
import ItemProvider from "./providers/itemProvider/provider";
import Input from "./components/input/input";
import Tabel from "./components/tabel/tabel";

import { Container, Button } from "react-bootstrap";

import Cookies from "universal-cookie";



const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");

const roleCookies = cookies.get("UserRole");



const userCookies = cookies.get("UserName");

const logout = () => {
    // destroy the cookie
    cookies.remove("UserMail", { path: "/" });
    cookies.remove("UserName", { path: "/" });
    cookies.remove("UserRole", { path: "/" });
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/auth/";
}

const Home = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {

        sessionStorage.setItem("isCheckedMine", false);

        if (mailCookies) {

            setMessage(userCookies + ", You are logged in with your email address " + mailCookies + " and you have the role of " + roleCookies + ".");
           
        } else {
            // <Navigate to="/auth/" />
            setMessage("as a guest u should not seing this, it will redirect you to the auth page");
            window.location.href = "/auth/";
        }


    }, []);

    return (
        <>
            <Container >
                <h4 className="text-center text-danger">{message}</h4>

            </Container>

            <ItemProvider>
                <div className="app">
                    <h1 className="title">Tasks List</h1>
                    
                    <Input />

                    <Tabel />

                </div>
            </ItemProvider>

            <div className="col-md-12 text-center">
                <Button type="submit" variant="danger" onClick={() => logout()}>
                    Logout
                </Button>
            </div>
            <br />
        </>
    );
};

export default Home;
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';

// import { BsArrowLeft } from "bootstrap-icons";

import emailjs from "@emailjs/browser";

import "./singleTask.css";

import { jsPDF } from 'jspdf';

import { AddToCalendarButton } from 'add-to-calendar-button-react';


import Cookies from "universal-cookie";
const cookies = new Cookies();

const usernameCookies = cookies.get("UserName");

// const usernameCookies = cookies.get("UserName");
// const roleCookies = cookies.get("UserRole");

const roleCookies = cookies.get("UserRole");

const mailCookies = cookies.get("UserMail");

function useInterval(callback, delay) {
    const savedCallback = useRef();



    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function SingleTask() {

    // const [roleCookies, setRoleCookies] = useState(roleCookiesOrigin);


    const { id } = useParams();
    function formatDate(date) {
        const currentMonth = date.getMonth() + 1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${dateString}-${monthString}-${date.getFullYear()}`;
    }
    function formatCalendar(date) {
        const currentMonth = date.getMonth() + 1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        console.log(`${date.getFullYear()}-${monthString}-${dateString}`);
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }
    const [nameTask, setNameTask] = useState("");
    const [descriptionTask, setDescriptionTask] = useState("");
    const [dateTask, setDateTask] = useState(Date.now());
    const [isCheckedTask, setisCheckedTask] = useState(false);
    const [assignedTask, setassignedTask] = useState(null);
    const [status, setStatus] = useState("Not Started");

    var curr = new Date();
    curr.setDate(curr.getDate() + 1);
    var date = curr.toISOString().substring(0, 10);

    const [deadlineTask, setDeadline] = useState(date);

    const [fetchDone, setFetchDone] = useState(false);

    function defaultDedline(curr) {
        if (curr === null)
            return "";
        curr = new Date(curr);
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substring(0, 10);
        return date;
    }

    /* The above code is using the `useInterval` function to repeatedly execute a block of code every
    1000 milliseconds (1 second). */
    useInterval(() => {
        /* The above code is making a GET request to the URL "http://localhost:4000/tasks/" + id, where "id" is
        a variable representing the task ID. It is setting the "Content-Type" header to "application/json". */
        fetch("http://localhost:4000/tasks/" + id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {


                /* The above code is making a GET request to the "http://localhost:4000/users/email/" endpoint with the
                value of the "mailCookies" variable appended to the URL. It is setting the "Content-Type" header to
                "application/json". */
                // fetch("http://localhost:4000/users/email/" + mailCookies, {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         usernameCookies = data.name;
                //         setRoleCookies(data.role);
                //         cookies.set("UserRole", roleCookies, {
                //             path: "/",
                //         });
                //     })
                //     .catch((err) => {
                //         console.log(err.message);
                //     }
                //     )
                setNameTask(data.name);
                setDescriptionTask(data.description);
                setDateTask(formatDate(new Date(data.created)));
                setisCheckedTask(data.isChecked);
                setassignedTask(data.assigned);
                setStatus(data.status);
                setDeadline(data.deadline);

                if (fetchDone === false) {

                    if (descriptionTempTask === "")
                        setTempDescriptionTask(data.description);
                    if (nameTempTask === "")
                        setTempNameTask(data.name);
                    if (!tempDeadline)
                        setTempDeadline(data.deadline);
                }
                setFetchDone(true);



            })
            .catch((err) => {
                console.log(err.message);
            });



    }, 1000);



    useEffect(() => {


        document.body.classList.add('bodyTask');

        return () => {
            document.body.classList.remove('bodyTask');
        };
    });

    function addWrappedText({ text, textWidth, doc, fontSize = 10, fontType = 'normal', lineSpacing = 7, xPosition = 10, initialYPosition = 10, pageWrapInitialYPosition = 10 }) { // functia de adaugare a textului in format pdf
        var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
        var pageHeight = doc.internal.pageSize.height;        // Get page height, well use this for auto-paging
        doc.setFont(fontType); // seteaza fontul
        doc.setFontSize(fontSize); // seteaza dimensiunea fontului

        var cursorY = initialYPosition; // Set the initial Y axis position. This is the distance from top, not from bottom.

        textLines.forEach(lineText => { // Iterate through the lines and add them to the doc
            if (cursorY > pageHeight) { // Auto-paging
                doc.addPage(); // Add a new page
                cursorY = pageWrapInitialYPosition; // Set the new Y axis position
            }
            doc.text(xPosition, cursorY, lineText); // Add the text
            cursorY += lineSpacing; // Move the Y axis down
        })
    }

    const handleDownload = () => { // functia de download a taskului in format pdf
        const doc = new jsPDF(); // se creeaza un nou document
        doc.setFontSize(20); // se seteaza dimensiunea fontului
        doc.text("Task Details", 90, 10); // se adauga titlul
        doc.setFontSize(14); // se seteaza dimensiunea fontului
        doc.setFont("normal"); // se seteaza tipul fontului
        doc.text("Task Date: " + dateTask, 10, 20); // se adauga data taskului
        doc.text((Date.now() - new Date(deadlineTask) < 0 ? ("Task deadline: " + formatDate(new Date(deadlineTask))) : "Deadline depasit/Nesetat"), 10, 30); // se adauga deadline-ul taskului
        doc.text("Task Title: " + nameTask, 10, 40); // se adauga titlul taskului
        doc.text("Admin feedback: " + (isCheckedTask === false ? ('Not Completed') : ('Completed')), 10, 50); // se adauga feedback-ul adminului
        doc.text("Task Assigned: " + assignedTask, 10, 60); // se adauga persoana care a primit taskul
        doc.text("Task User status: " + status, 10, 70); // se adauga statusul taskului
        addWrappedText({ // se adauga descrierea taskului
            text: descriptionTask !== "" ? ("Task Description: " + descriptionTask) : ("Acest task (inca) nu are o descriere"),
            textWidth: 170,
            doc,

            // Optional
            fontSize: '14',
            fontType: 'normal',
            lineSpacing: 7,               // Space between lines
            xPosition: 10,                // Text offset from left of document
            initialYPosition: 80,         // Initial offset from top of document; set based on prior objects in document
            pageWrapInitialYPosition: 10  // Initial offset from top of document when page-wrapping
        });

        doc.save("Task_" + nameTask + ".pdf");
    }

    useEffect(() => emailjs.init("5uVkon-v2jeVV0ySf"), []);


    const handleSendMail = () => { // functia de trimitere a mailului cu taskul

        const serviceID = "service_0jgs0dl"; // id-ul serviciului de email
        const templateID = "template_ope6g5k"; // id-ul template-ului de email

        const templateParams = { // parametrii template-ului de email
            from_name: nameTask,
            to_name: usernameCookies,
            recipient: mailCookies,
            // eslint-disable-next-line 
            message: "Task Details: \n" + "Task Date: " + dateTask + "\n" + (Date.now() - new Date(deadlineTask) < 0 ? ("Task deadline: " + formatDate(new Date(deadlineTask))) : "Deadline depasit/Nesetat") + "\n" + "Task Title: " + nameTask + "\n" + "Admin Feedback: " + (isCheckedTask === false ? ('Not Completed') : ('Completed')) + "\n" + "Task Assigned: " + assignedTask + "\n" + "Task User status: " + status + "\n" + (descriptionTask !== "" ? ("Task Description: " + descriptionTask) : ("Acest task (inca) nu are o descriere")), // mesajul mailului
        }

        emailjs.send(serviceID, templateID, templateParams) // se trimite mailul
            .then((response) => { // se afiseaza un mesaj de succes sau de eroare
                console.log("SUCCESS!", response.status, response.text);
                alert("Mail sent successfully!");
            }
            )
            .catch((err) => {
                console.log(err.message);
                alert("Mail not sent!");
            }
            )



    }

    const handleRemoveAssign = () => { // functia de stergere a persoanei care a primit taskul

        fetch("http://localhost:4000/tasks/" + id, { // se face un request de tip PUT catre server pentru a sterge persoana care a primit taskul
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: null
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleTake = () => { // functia de preluare a taskului

        fetch("http://localhost:4000/tasks/" + id, { // se face un request de tip PUT catre server pentru a prelua taskul
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: usernameCookies
            }),
        })
            .catch((err) => { // se afiseaza un mesaj de succes sau de eroare
                console.log(err.message);
            });
    }

    const handleCheckboxChange = (string) => { // functia de schimbare a statusului taskului
        const _id = string;

        const status = !isCheckedTask;

        fetch("http://localhost:4000/tasks/" + _id, { // se face un request de tip PUT catre server pentru a schimba statusul taskului
            method: "PUT",
            headers: { // se seteaza tipul de continut al requestului
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ // se trimite noul status
                isChecked: status
            }),
        })
            .catch((err) => { // se afiseaza un mesaj de succes sau de eroare
                console.log(err.message);
            });
    };

    const handleDelete = () => { // functia de stergere a taskului

        fetch("http://localhost:4000/tasks/" + id, { // se face un request de tip DELETE catre server pentru a sterge taskul
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => { // se afiseaza un mesaj de succes sau de eroare
                console.log(err.message);
            });
        window.location.href = "/";
    };

    const [showEdit, SetshowEdit] = useState(false);
    const handleEdit = () => {
        SetshowEdit(!showEdit);
    }

    const [nameTempTask, setTempNameTask] = useState(nameTask);
    const [descriptionTempTask, setTempDescriptionTask] = useState(descriptionTask);
    function handleInputTitle(event) {
        setTempNameTask(event.target.value);
    }
    function handleInputDesc(event) {
        setTempDescriptionTask(event.target.value);
    }

    const [tempDeadline, setTempDeadline] = useState(deadlineTask);
    function handleInputDDLChange(event) {
        if (event.target.value !== "") {
            if (new Date(event.target.value) < new Date()) {
                alert("You cannot set a deadline in the past");
                var curr = new Date();
                curr.setDate(curr.getDate() + 1);
                var date = curr.toISOString().substring(0, 10);
                setTempDeadline(date);
            }
            else
                setTempDeadline(event.target.value);
        }
        else {
            setTempDeadline(null);
        }
    }

    const onSelect = (eventKey, event) => {
        event.preventDefault();
        event.persist();
        event.stopPropagation();
        console.log(eventKey) // selected event will trigger

        fetch("http://localhost:4000/tasks/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: eventKey
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });

    }

    return (
        <>
            <div className="SingleTask">
                <Link to="/" ><div className="img_pod">

                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </div></Link>
                <div className="container_copy">

                    {fetchDone ? (
                        <>
                            <h3 className="singleTask__date">Task Date: {dateTask}</h3>
                            <h3 className="singleTask__deadline">
                                {/* {deadlineTask < Date.now ? ("Task deadline: " + formatDate(new Date(deadlineTask))) : "Deadline depăsit/Nesetat"} */}
                                {Date.now() - new Date(deadlineTask) < 0 ? ("Task deadline: " + formatDate(new Date(deadlineTask))) : "Deadline depăsit/Nesetat"}
                            </h3>
                            <h1 className="singleTask__title">{nameTask}</h1>
                            <p className="singleTask__description">{descriptionTask}</p>
                            {/* <h3>Task Status:  {isCheckedTask === false ? ('Not Completed') : ('Completed')}</h3> */}

                            <label className="singleTask__label" htmlFor="isCheckedTask">Status:</label>

                            {/* {(assignedTask === usernameCookies) || (roleCookies === "admin") ? */}
                            {(roleCookies === "admin") ?
                                (<>
                                    <input
                                        type="checkbox"
                                        name="isCheckedTask"
                                        checked={isCheckedTask}
                                        onChange={() =>
                                            handleCheckboxChange(id)
                                        }
                                    />

                                    <i> {isCheckedTask === false ? ('Not Completed') : ('Completed')}</i>

                                </>
                                ) : (<>
                                    <input
                                        type="checkbox"
                                        name="isCheckedTask"
                                        disabled
                                        checked={isCheckedTask}
                                    /> {isCheckedTask === false ? ('Not Completed') : ('Completed')}
                                </>
                                )
                            }
                            {assignedTask === null ? (
                                <h3>Task Assigned: none</h3>
                            ) : (

                                <h3>Task Assigned: {assignedTask}</h3>
                            )}

                            <div className="singleTask__buttons">


                                {roleCookies === "admin" ? assignedTask ?
                                    <Button variant="danger" type="submit" onClick={handleRemoveAssign}>{assignedTask}</Button> : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button> :
                                    assignedTask ? "" : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>

                                }
                                <br />
                                <br />
                                {/* {((assignedTask === usernameCookies)) ? (

                            console.log("are taskul asignat")

                        ) : (
                            <>
                                {roleCookies === "admin" ? (
                                    console.log("are rol de admin DAR NU ARE ASIGNAT")
                                ) : (
                                    console.log("nu are taskul asignat si nu e admin")
                                )}
                            </>
                        )}
                        {(assignedTask === usernameCookies || roleCookies === "admin") ? (


                            console.log("are taskul asignat sau e admin"),
                            console.log(deadlineTask),
                            console.log(Date.now() + " " + new Date(deadlineTask)),
                            console.log(Date.now() - new Date(deadlineTask)),
                            console.log(Date.now() - new Date(deadlineTask) < 0 ? "nu e depasit" : "e depasit"),
                            console.log(Date.now())
                        ) : (
                            console.log("nu are taskul asignat si nu e admin")
                        )
                        } */}



                                {(assignedTask === usernameCookies || roleCookies === "admin") ?
                                    <>

                                        <Container
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: "center",
                                            }
                                            }
                                        >
                                            <Row>
                                                <Col>
                                                    <Dropdown onSelect={onSelect}>
                                                        <Dropdown.Toggle variant={status === "Not Started" ? "danger" : status.includes("In progress") ? "warning" : "success"} id="dropdown-basic" disabled={isCheckedTask}>
                                                            {status ? status : "Not started"}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                                            {/* <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item> */}

                                                            <Dropdown onSelect={onSelect}>
                                                                <Dropdown.Toggle variant="light">
                                                                    In Progress
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item eventKey={"In progress 10%"} >10%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 20%"} >20%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 30%"} >30%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 40%"} >40%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 50%"} >50%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 60%"} >60%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 70%"} >70%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 80%"} >80%</Dropdown.Item>
                                                                    <Dropdown.Item eventKey={"In progress 90%"} >90%</Dropdown.Item>

                                                                </Dropdown.Menu>
                                                            </Dropdown>


                                                            <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </Col>
                                                <Col>

                                                    {Date.now() - new Date(deadlineTask) < 0 ? (

                                                        <>
                                                            <AddToCalendarButton

                                                                name={nameTask}
                                                                startDate={formatCalendar(new Date(deadlineTask))}
                                                                location="Online"
                                                                description={descriptionTask}
                                                                options={['Apple', 'Google', 'iCal', 'Outlook.com', 'Microsoft 365', 'Microsoft Teams', 'Yahoo']}
                                                                inline
                                                                listStyle="modal"
                                                                timeZone="Europe/Bucharest"
                                                                styleLight="--btn-background: #0d6efd; --btn-text: #fff; --btn-shadow: none; "
                                                                buttonStyle="3d"
                                                            ></AddToCalendarButton>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}

                                                </Col>
                                                <Col>

                                                    <Button variant="primary" onClick={handleSendMail}>Send Mail</Button>
                                                </Col>
                                            </Row>
                                        </Container>

                                    </>
                                    :
                                    (
                                        <>

                                            <Dropdown onSelect={onSelect}>
                                                <Dropdown.Toggle variant={status === "Not Started" ? "danger" : status.includes("In progress") ? "warning" : "success"} id="dropdown-basic" disabled>
                                                    {status ? status : "Not started"}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                                    {/* <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item> */}
                                                    <Dropdown onSelect={onSelect}>
                                                        <Dropdown.Toggle variant="light">
                                                            In Progress
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey={"In progress 10%"} >10%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 20%"} >20%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 30%"} >30%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 40%"} >40%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 50%"} >50%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 60%"} >60%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 70%"} >70%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 80%"} >80%</Dropdown.Item>
                                                            <Dropdown.Item eventKey={"In progress 90%"} >90%</Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </>)
                                }

                                <br />
                                <Container
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }
                                    }
                                >
                                    <Row >
                                        <Col >

                                            <Button variant="primary" onClick={handleDownload}>Download</Button>
                                        </Col>
                                    </Row>
                                </Container>

                                <br />
                                <br />




                                {roleCookies === "admin" ? (<>
                                    <div className="adminZone">
                                        <Button className="" variant="primary" onClick={handleEdit} >Edit</Button>
                                        <Button className="" variant="danger" onClick={handleDelete} >Delete</Button>
                                    </div>
                                    <br />

                                    {showEdit ? (
                                        <>
                                            <br />
                                            <Form className="formAdmin">
                                                <Form.Group controlId="form">
                                                    <Form.Label>Schimba titlul</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter new Title" defaultValue={nameTask} onChange={handleInputTitle} />
                                                </Form.Group>

                                                <Form.Group controlId="form">
                                                    <Form.Label>Schimba descrierea</Form.Label>
                                                    <Form.Control as="textarea" rows={4} cols={40} type="text" placeholder="Enter new Description" defaultValue={descriptionTask} onChange={handleInputDesc} />
                                                </Form.Group>

                                                <Form.Group controlId="ddl">
                                                    <Form.Label >Change the deadline</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="ddl"
                                                        placeholder={defaultDedline(deadlineTask)}
                                                        // value={defaultDedline(deadlineTask)}
                                                        onChange={handleInputDDLChange}

                                                    />
                                                </Form.Group>



                                            </Form>
                                            <Button className="" variant="info" onClick={() => {
                                                fetch("http://localhost:4000/tasks/" + id, {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        name: nameTempTask,
                                                        description: descriptionTempTask,
                                                        deadline: tempDeadline

                                                    }),
                                                })
                                                    .catch((err) => {
                                                        console.log(err.message);
                                                    });
                                                SetshowEdit(!showEdit);
                                            }} >Save</Button>
                                            <br />
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    <br />

                                </>) : (
                                    <></>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <i>Task is loading...</i>
                        </>
                    )}

                </div>


            </div>

        </>
    );
}

export default SingleTask;
import React from "react";
import "./item.css";

import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const mailCookies = cookies.get("UserMail");

/**
 * The function `formatDate` takes a date object as input and returns a formatted string in the format
 * "dd-mm-yyyy".
 * @param date - The `date` parameter is a JavaScript `Date` object, which represents a specific date
 * and time.
 * @returns The formatted date string in the format "DD-MM-YYYY".
 */
function formatDate(date) {
    const currentMonth = date.getMonth() + 1;
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${dateString}-${monthString}-${date.getFullYear()}`;
}

let usernameCookies;
let roleCookies;


const Item = (props) => {
    /**
     * The `handleDelete` function filters out the item with a specific id from the `props.items` array and
     * updates the `props.setItems` function with the filtered array.
     */

    const handleDelete = () => {
        const filteredItems = props.items.filter(
            (item) => item._id !== props.item._id
        );
        // console.log(props.item._id);
        fetch("http://localhost:4000/tasks/" + props.item._id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => {
                console.log(err.message);
            });
        props.setItems(filteredItems);
    };

    const handleTake = () => {

        fetch("http://localhost:4000/tasks/" + props.item._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assigned: usernameCookies
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
    }


    const handleRemoveAssign = () => {

        fetch("http://localhost:4000/tasks/" + props.item._id, {
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
    /* The code snippet is making a GET request to the server at "http://localhost:4000/users/email/" +
    mailCookies to retrieve user data based on the email stored in the mailCookies variable. It includes
    the email as a parameter in the URL and specifies the request method as GET. The request also
    includes the "Content-Type" header set to "application/json". */
    fetch("http://localhost:4000/users/email/" + mailCookies, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            usernameCookies = data.name;
            roleCookies = data.role;
            cookies.set("UserRole", roleCookies, {
                path: "/",
            });
        })
        .catch((err) => {
            console.log(err.message);
        }
        )

    const onSelect = (eventKey, event) => {
        event.preventDefault();
        event.persist();
        event.stopPropagation();
        console.log(eventKey) // selected event will trigger

        fetch("http://localhost:4000/tasks/" + props.item._id, {
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

    let showOthers = sessionStorage.getItem("isCheckedMine");

    return (
        <>
            {showOthers === "false" ? (

                <tr>
                    {/* <td>
                    {props.item._id}
                </td> */}
                    <td>
                        <span
                            className={`itemContent ${props.item.isChecked ? "crossed" : ""
                                }`}
                        >

                            <Link to={"/task/" + props.item._id}>{props.item.name}</Link>
                        </span>
                    </td>
                    <td>
                        {props.item.deadline < Date.now ? formatDate(new Date(props.item.deadline)) : "N/A"}
                        { }
                    </td>
                    {/* <td>
                    {formatDate(new Date(props.item.created))}
                </td> */}
                    <td className="assigned">


                        {/* The code snippet is rendering a `<span>` element with the class name "assignedContent". Inside the
`<span>`, it checks the value of the `roleCookies` variable. If the value is "admin", it checks if
the `props.item.assigned` value is truthy. If it is, it renders a `<Button>` element with the
variant "danger" and an `onClick` event handler that calls the `handleRemoveAssign` function. If
`props.item.assigned` is falsy, it renders a `<Button>` element with the variant "primary" and an
`onClick` event handler that calls the `handleTake` function. */}
                        <span className="assignedContent">

                            {roleCookies === "admin" ? props.item.assigned ?
                                <Button variant="danger" type="submit" onClick={handleRemoveAssign}>{props.item.assigned}</Button> : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button> :
                                props.item.assigned ? props.item.assigned : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>

                            }
                        </span>
                    </td>


                    <td>
                        {/* {(props.item.assigned === usernameCookies) || (roleCookies === "admin") ? */}
                        {(roleCookies === "admin") ?
                            <input
                                type="checkbox"
                                checked={props.item.isChecked}
                                onChange={() =>
                                    props.handleCheckboxChange(props.item._id)
                                }
                            /> : <input
                                type="checkbox"
                                disabled
                                checked={props.item.isChecked}
                            />
                        }
                    </td>
                    <td>
                        {(props.item.assigned === usernameCookies) || (roleCookies === "admin") ?
                            <>
                                <Dropdown onSelect={onSelect}>
                                    <Dropdown.Toggle variant={props.item.status === "Not Started" ? "danger" : props.item.status.includes("In progress") ? "warning" : "success"} id="dropdown-basic" disabled={props.item.isChecked}>
                                        {props.item.status ? props.item.status : "Not started"}
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

                            </>
                            :
                            <>
                                <Dropdown onSelect={onSelect}>
                                    <Dropdown.Toggle variant={props.item.status === "Not Started" ? "danger" : props.item.status.includes("In progress")  ? "warning" : "success"} id="dropdown-basic" disabled>
                                        {props.item.status ? props.item.status : "Not started"}
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

                            </>
                        }
                    </td>
                    <td>
                        {/* <button className="sortIcon">
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={{ color: "#1a2b4e" }}
                            onClick={handleDelete}
                        />
                    </button> */}

                        {roleCookies === "admin" ?
                            (
                                <Button variant="danger" className="btn-close" onClick={handleDelete}></Button>
                            ) : (
                                <Button variant="danger" className="btn-close" onClick={handleDelete} disabled></Button>
                            )}


                    </td>
                </tr>
            ) : (
                (props.item.assigned === usernameCookies) || (roleCookies === "admin") || (!props.item.assigned) ? (
                    <tr>
                        {/* <td>
                        {props.item._id}
                    </td> */}
                        <td>
                            <span
                                className={`itemContent ${props.item.isChecked ? "crossed" : ""
                                    }`}
                            >

                                <Link to={"/task/" + props.item._id}>{props.item.name}</Link>
                            </span>
                        </td>
                        <td>
                            {props.item.deadline < Date.now ? formatDate(new Date(props.item.deadline)) : "N/A"}
                            { }
                        </td>
                        {/* <td>
                        {formatDate(new Date(props.item.created))}
                    </td> */}
                        <td className="assigned">


                            {/* The code snippet is rendering a `<span>` element with the class name "assignedContent". Inside the
    `<span>`, it checks the value of the `roleCookies` variable. If the value is "admin", it checks if
    the `props.item.assigned` value is truthy. If it is, it renders a `<Button>` element with the
    variant "danger" and an `onClick` event handler that calls the `handleRemoveAssign` function. If
    `props.item.assigned` is falsy, it renders a `<Button>` element with the variant "primary" and an
    `onClick` event handler that calls the `handleTake` function. */}
                            <span className="assignedContent">

                                {roleCookies === "admin" ? props.item.assigned ?
                                    <Button variant="danger" type="submit" onClick={handleRemoveAssign}>{props.item.assigned}</Button> : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button> :
                                    props.item.assigned ? props.item.assigned : <Button variant="primary" type="submit" onClick={handleTake}>Take Task</Button>

                                }
                            </span>
                        </td>


                        <td>
                            {/* {(props.item.assigned === usernameCookies) || (roleCookies === "admin") ? */}
                            {(roleCookies === "admin") ?
                                <input
                                    type="checkbox"
                                    checked={props.item.isChecked}
                                    onChange={() =>
                                        props.handleCheckboxChange(props.item._id)
                                    }
                                /> : <input
                                    type="checkbox"
                                    disabled
                                    checked={props.item.isChecked}
                                />
                            }
                        </td>
                        <td>
                            {(props.item.assigned === usernameCookies) || (roleCookies === "admin") ?
                                <>
                                    <Dropdown onSelect={onSelect}>
                                        <Dropdown.Toggle variant={props.item.status === "Not Started" ? "danger" : props.item.status === "In progress" ? "warning" : "success"} id="dropdown-basic" disabled={props.item.isChecked}>
                                            {props.item.status ? props.item.status : "Not started"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                            <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item>
                                            <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>

                                </>
                                :
                                <>
                                    <Dropdown onSelect={onSelect}>
                                        <Dropdown.Toggle variant={props.item.status === "Not Started" ? "danger" : props.item.status === "In progress" ? "warning" : "success"} id="dropdown-basic" disabled>
                                            {props.item.status ? props.item.status : "Not started"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey={"Not Started"} >Not Started</Dropdown.Item>

                                            <Dropdown.Item eventKey={"In progress"} >In progress</Dropdown.Item>
                                            <Dropdown.Item eventKey={"Completed"} >Completed</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>

                                </>
                            }
                        </td>
                        <td>
                            {/* <button className="sortIcon">
                            <FontAwesomeIcon
                                icon={faXmark}
                                style={{ color: "#1a2b4e" }}
                                onClick={handleDelete}
                            />
                        </button> */}

                            {roleCookies === "admin" ?
                                (
                                    <Button variant="danger" className="btn-close" onClick={handleDelete}></Button>
                                ) : (
                                    <Button variant="danger" className="btn-close" onClick={handleDelete} disabled></Button>
                                )}


                        </td>
                    </tr>
                ) : (
                    <></>
                )
            )
            }
        </>
    );
};

export default Item;

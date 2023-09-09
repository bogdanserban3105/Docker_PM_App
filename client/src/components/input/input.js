import React, { useState, useContext } from "react";
import { ItemContext } from "../../providers/itemProvider/provider";
import "./input.css";

import { Form } from "react-bootstrap";



function Input(props) {
    const { items, setItems } = useContext(ItemContext);
    const [inputValue, setInputValue] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    var curr = new Date();
    curr.setDate(curr.getDate()+1);
    var date = curr.toISOString().substring(0, 10);
    const [inputDDL, setInputDDL] = useState(date);



    /**
     * The function `handleInputChange` is used to handle input change events and update the input value.
     * @param event - The event parameter is an object that represents the event that triggered the
     * function. In this case, it is likely an event object related to an input change event, such as when
     * a user types into an input field.
     */
    function handleInputChange(event) {
        setInputValue(event.target.value);
    }
    function handleInputChangeDes(event) {
        setInputDescription(event.target.value);
    }

    function handleInputDDLChange(event) {
        if (event.target.value !== "") {
            if (new Date(event.target.value) < new Date()) {
                alert("You cannot set a deadline in the past");
                var curr = new Date();
                curr.setDate(curr.getDate()+1);
                var date = curr.toISOString().substring(0, 10);
                setInputDDL(date);
            }
            else
                setInputDDL(event.target.value);
        }
        else {
            setInputDDL(null);
        }
        // setInputDDL(event.target.value);
    }

    /**
     * The function `handleAddItem` adds a new item to an array of items if the input value is not
     * empty.
     */
    const handleAddItem = () => {
        if (inputValue.trim() !== "") {
            fetch("http://localhost:4000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: inputValue,
                    isChecked: false,
                    description: inputDescription,
                    deadline: inputDDL
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setItems([
                        ...items,
                        data]);
                    // console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        setInputValue("");
        setInputDescription("");
        Setshow(false);
        setInputDDL(new Date().now);
        SetshowDDL(false);
        // setItems([
        //     ...items,
        //     {
        //         // id: items.length + 1,
        //         name: inputValue,
        //         isChecked: false,
        //     },
        // ]);
        // setInputValue("");
    };


    /**
     * The handleKeyDown function checks if the "Enter" key is pressed and calls the handleAddItem
     * function if it is.
     * @param event - The event parameter is an object that contains information about the event that
     * occurred, such as the key that was pressed. In this case, it is used to check if the key that was
     * pressed is the Enter key.
     */
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddItem();
        }
    };

    const [show, Setshow] = useState(false);
    const handleDescription = () => {
        Setshow(!show);
    }

    const [showDDL, SetshowDDL] = useState(false);
    const handleDDL = () => {
        SetshowDDL(!showDDL);
    }
    return (
        <div className="inputContainer">
            <label className="inputPromt" htmlFor="input-field">
                Add a new task for your colleagues
            </label>
            <br />
            <input
                style={{
                    backgroundColor: props.backgroundColor,
                    color: props.textColor,
                }}
                type="text"
                id="input-field"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className="addItemButton" onClick={handleAddItem}>
                Add task
            </button>
            <br />

            <button className="btn btn-primary" onClick={handleDescription}>
                Add a description
            </button>
            <br />
            <textarea
                style={{
                    backgroundColor: props.backgroundColor,
                    color: props.textColor,
                }}
                id="desc-field"
                hidden={!show}
                rows={4}
                cols={40}
                value={inputDescription}
                onChange={handleInputChangeDes}

            />
            <br />
            <button className="btn btn-primary" onClick={handleDDL}>
                Add a deadline
            </button>
            <Form.Group controlId="ddl">
                <Form.Label hidden={!showDDL}>Put the deadline</Form.Label>
                <Form.Control
                    type="date"
                    name="ddl"
                    placeholder="Deadline"
                    value={inputDDL}
                    hidden={!showDDL}
                    onChange={handleInputDDLChange}

                />
            </Form.Group>
            <br />
        </div>
    );
}

export default Input;

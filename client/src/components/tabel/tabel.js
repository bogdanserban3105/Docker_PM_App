import React, { useContext, useState } from "react";
import { ItemContext } from "../../providers/itemProvider/provider";
import "./tabel.css";
import Item from "./item";
import Search from "../search/search";
import SortButton from "../sortButton/sortButton";

import { Container, Form } from "react-bootstrap";

import Cookies from "universal-cookie";

/**
 * The `Tabel` function is a React component that renders a table of items, with the ability to search
 * and sort the items.
 * @param props - The `props` parameter is an object that contains the properties passed to the `Tabel`
 * component. These properties can be accessed using dot notation, such as `props.propertyName`.
 * @returns The `Tabel` component is returning a JSX element. It includes a table with a header and a
 * body. The header contains four columns: ID, Task, Finished, and Remove?. The body contains the
 * filtered items mapped to `Item` components.
 */

const cookies = new Cookies();

const roleCookies = cookies.get("UserRole");


function Tabel() {
    const { items, setItems } = useContext(ItemContext);
    const [searchValue, setSearchValue] = useState("");



    /* The `handleCheckboxChange` function is responsible for handling the change event when a
    checkbox is clicked. It takes the `id` of the item as a parameter. */
    const handleCheckboxChange = (string) => {
        const _id = string;

        /* The `map` function is used to create a new array based on the `items` array. It iterates over
        each item in the `items` array and returns a new array with the same number of items. */

        const updateditems = items.map((item) =>

            item._id === _id ? { ...item, isChecked: !item.isChecked } : item
        );
        // console.log(updateditems);

        const status = updateditems.find((item) => item._id === _id).isChecked;

        fetch("http://localhost:4000/tasks/" + _id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isChecked: status
            }),
        })
            .catch((err) => {
                console.log(err.message);
            });
        setItems(updateditems);
    };

    /**
     * The function "handleOnChangeSearch" updates the search value based on the input value of an
     * event.
     * @param event - The event parameter is an object that represents the event that triggered the
     * onChange event handler. It contains information about the event, such as the target element that
     * triggered the event. In this case, the target element is the input field where the user is
     * typing their search query.
     */
    function handleOnChangeSearch(event) {
        setSearchValue(event.target.value);
    }


    const [isCheckedMine, setIsCheckedMine] = useState(false);

    const handleCheckboxChangeMine = () => {
        setIsCheckedMine(!isCheckedMine);
        sessionStorage.setItem("isCheckedMine", !isCheckedMine);
    };


    /* The code is filtering the `items` array based on the `searchValue` and then mapping over the
    filtered items to create an array of `Item` components. */

    const filteredItems = items
        .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item) => (
            <Item
                key={item._id}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                setItems={setItems}
                items={items}
            />
        ));

    return (
        <>
            <table className="itemsTable">
                <thead className="tabelHead">
                    <tr>
                        {/* <th className="tabelHeadID">ID</th> */}
                        <th className="tabelHeadItem">
                            <span className="item">Task</span>
                            <Search
                                searchValue={searchValue}
                                handleOnChangeSearch={(e) =>
                                    handleOnChangeSearch(e)
                                }
                            />
                            <SortButton items={items} setItems={setItems} />
                            <div></div>
                        </th>
                        <th>Deadline
                            <br></br><i>*N/A - Ddl nesetat/depasit</i>
                        </th>

                        {/* <th className="tabelHeadFinished">Created at</th> */}
                        <th className="tabelHeadAssigned">
                            Assigned to
                            {(roleCookies !== "admin") ? (
                                <Container className="">
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="show-mine"
                                        label="Don't show others"
                                        checked={isCheckedMine}
                                        onChange={handleCheckboxChangeMine}
                                        />
                                </Form>
                            </Container>
                            ) : (
                                <></>
                            )}
                        </th>
                        <th className="tabelHeadFinished">Finished</th>
                        <th className="tabelHeadDescription">Status</th>
                        <th className="tableHeadRemove">Remove?</th>
                    </tr>
                </thead>
                <tbody>{filteredItems}</tbody>
            </table>
        </>
    );
}

export default Tabel;

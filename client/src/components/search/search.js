import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * The Search component is a JavaScript function that renders a search input field with a magnifying
 * glass icon.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `Search` component. These properties can be accessed using dot notation, such as `props.searchValue`
 * and `props.handleOnChangeSearch`.
 * @returns The Search component is returning a div element with a className of "searchInput". Inside
 * the div, there is an input element with a className of "searchBar" and a placeholder text of "Search
 * for tasks...". The value of the input is set to the searchValue prop, and the onChange event is set
 * to the handleOnChangeSearch prop. There is also a FontAwesomeIcon component with a className
 */
const Search = (props) => {
    return (
        <div className="searchInput">
            <input
                className="searchBar"
                placeholder="Search for tasks..."
                value={props.searchValue}
                onChange={props.handleOnChangeSearch}
            ></input>
            <FontAwesomeIcon
                className="searchIcon"
                icon={faMagnifyingGlass}
                style={{ color: "#1a2b4e" }}
            />
        </div>
    );
};

export default Search;

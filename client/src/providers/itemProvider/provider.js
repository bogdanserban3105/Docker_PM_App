import React, { createContext, useState, useEffect, useRef } from "react";

/* In this code, `export const ItemContext = createContext({ items: [], setItems: () => {}, });` is
creating a new context object called `ItemContext` using the `createContext` function from React. */
export const ItemContext = createContext({
  items: [],
  setItems: () => { },

});


/**
 * The `useInterval` function is a custom hook in JavaScript that allows you to execute a callback
 * function at a specified interval.
 * @param callback - The callback parameter is a function that will be called repeatedly at the
 * specified interval.
 * @param delay - The `delay` parameter is the time interval (in milliseconds) between each execution
 * of the `callback` function.
 */
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


/**
 * The ItemProvider component is a wrapper that provides an item context to its children components.
 * @returns The `ItemProvider` component is returning a `ItemContext.Provider` component with the
 * `children` prop passed as its children. The `ItemContext.Provider` component is providing the
 * `items` and `setItems` values to its descendants through the `ItemContext.Provider` component's
 * `value` prop.
 */

const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

/* The `useEffect` hook is used to perform side effects in functional components. In this code, the
`useEffect` hook is used to fetch data from the server at the specified URL
(`http://localhost:4000/tasks`) when the component is mounted. */
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);


/* The `useInterval` function is a custom hook that allows you to execute a callback function at a
specified interval. In this code, it is used to fetch data from the server every 1 second. */
  useInterval(() => {
    fetch("http://localhost:4000/tasks", {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });;
  }, 1000);


  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;

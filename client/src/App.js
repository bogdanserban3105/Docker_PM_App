import { React } from "react";
import Auth from "./components/auth/auth";
import Home from "./Home";
import { Route, Routes } from 'react-router-dom';
import SingleTask from "./components/singleTask/singleTask";

const App = () => {


    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/task/:id" element={<SingleTask />} />
            {/* <Route path="/auth2" element={<Auth2 />} /> */}
        </Routes>
            {/* <ItemProvider>
                <div className="app">
                    <h1 className="title">Tasks List</h1>
                    <Input
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    />
                    <Tabel incrementCounter={incrementCounter} />
                </div>
            </ItemProvider> */}
        </>
    );
};

export default App;

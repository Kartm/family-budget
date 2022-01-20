import React, {Component, useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./features/dashboard/Dashboard";

function Urls(props: JSX.IntrinsicAttributes) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(false)
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard/>: <Navigate to="/login" />}/>

                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;
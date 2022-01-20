import React, {Component, useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
import {useAppSelector} from "./app/hooks";
import {selectCount} from "./features/counter/counterSlice";
import {selectIsLoggedIn} from "./features/auth/authSlice";

function Urls(props: JSX.IntrinsicAttributes) {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login/>} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register/>} />
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard/>: <Navigate to="/login" />}/>

                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;
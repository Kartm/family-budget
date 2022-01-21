import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
import {useAppSelector} from "./app/hooks";
import {selectIsLoggedIn} from "./features/auth/authSlice";
import Budget from "./features/dashboard/Budget";
import Budgets from "./features/dashboard/Budgets";

function Urls() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={isLoggedIn ? <Navigate to="/budgets" /> : <Login/>} />
                    <Route path="register" element={isLoggedIn ? <Navigate to="/budgets" /> : <Register/>} />
                    <Route path="budgets" element={isLoggedIn ? <Dashboard/>: <Navigate to="/login" />}>
                        <Route index element={<Budgets/>}></Route>
                        <Route path=":budgetId" element={<Budget/>} />
                    </Route>

                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default Urls;
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link, useNavigate} from "react-router-dom";
import {getLoggedInUserDetails, selectUserDetails} from "../auth/authSlice";
import {useEffect} from "react";
import {loadBudgets, selectBudgets} from "./budgetSlice";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Budgets() {
  const dispatch = useAppDispatch();
    const budgets = useAppSelector(selectBudgets);

    useEffect(() => {
        dispatch(loadBudgets())
    }, [])

  return (
    <React.Fragment>
      <Title>Budgets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created at</TableCell>
            <TableCell>Updated at</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell>{budget.created}</TableCell>
              <TableCell>{budget.modified}</TableCell>
              <TableCell>{budget.name}</TableCell>
              <TableCell>{budget.balance} PLN</TableCell>
              <TableCell align="right">
                <Link to={`/budgets/${budget.id}/`}>Details</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
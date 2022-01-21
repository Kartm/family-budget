import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadBudgets, loadUsers, selectBudgets, selectUsers} from "./budgetSlice";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";

export default function Budgets() {
  const dispatch = useAppDispatch();
    const budgets = useAppSelector(selectBudgets);
    const users = useAppSelector(selectUsers);
    const [budgetFilters, setBudgetFilters] = useState({
        owner_id: "",
    })

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    useEffect(() => {
        dispatch(loadBudgets({owner_id: budgetFilters.owner_id}))
    }, [budgetFilters.owner_id])

  return (
    <React.Fragment>
      <Title>Budgets</Title>
        <Container>
                <Select native defaultValue="none" onChange={(e) => setBudgetFilters({owner_id: e.target.value as string})}>
                    <option value="none" disabled>
                          {"Filter by owner"}
                      </option>
                    {users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                </Select>
            </Container>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created at</TableCell>
            <TableCell>Updated at</TableCell>
            <TableCell>Owner</TableCell>
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
              <TableCell>{budget.owner.username}</TableCell>
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
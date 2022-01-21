import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {loadBudget, loadBudgets, selectBudgets, selectCurrentBudget} from "./budgetSlice";
import {useParams} from "react-router-dom";
import {getBudget} from "./budgetAPI";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Budget() {
    let params = useParams();

  const dispatch = useAppDispatch();
    const budget = useAppSelector(selectCurrentBudget);

    useEffect(() => {
        console.log(params)
        if(params.budgetId) {
            dispatch(loadBudget({budgetId: params.budgetId}))
        }
    }, [])

    if(budget === null) {
        return <div>loading...</div>
    }

  return (
    <React.Fragment>
      <Title>{budget.name}</Title>
      <Title>Shared with: {budget.share_accesses.map(access => access.user.username)}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Created at</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budget.entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.created}</TableCell>
              <TableCell>{entry.category.name}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell align="right">{entry.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
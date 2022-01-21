import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './Title';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {loadBudget, loadBudgets, selectBudgets, selectCurrentBudget} from "./budgetSlice";
import {useParams} from "react-router-dom";
import {getBudget} from "./budgetAPI";

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

  return (
    <React.Fragment>
      <Title>Budget</Title>
        {params.budgetId}
        {JSON.stringify(budget)}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}
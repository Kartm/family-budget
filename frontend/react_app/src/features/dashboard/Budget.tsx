import * as React from 'react';
import Title from './Title';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useState} from "react";
import {
    createEntry,
    loadBudget,
    loadCategories,
    selectCategories,
    selectCurrentBudget
} from "./budgetSlice";
import {Outlet, useParams} from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import Input from '@material-ui/core/Input';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Budget() {
    const params = useParams();
    const [isAddingNewRow, setIsAddingNewRow] = useState(false)
    const [formData, setFormData] = useState({
        budget_id: "",
        category_id: "",
        description: "",
        amount: 0
    })

    const dispatch = useAppDispatch();
    const budget = useAppSelector(selectCurrentBudget);
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        if (params.budgetId) {
            dispatch(loadBudget({budgetId: params.budgetId}))
            dispatch(loadCategories())
            setFormData({...formData, budget_id: params.budgetId})
        }
    }, [params.budgetId])

    if (budget === null) {
        return <div>loading...</div>
    }

    function onCreateEntry() {
        console.log(formData)

        dispatch(createEntry(formData))
    }

    return (
        <React.Fragment>
            <Title>
                {`${budget.name} (${budget.balance} PLN)`}
            </Title>
            <Title>Shared with: {budget.share_accesses.map(access => access.user.username)}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Created at</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {budget.entries.map((entry) => (
                        <TableRow key={entry.id}>
                            <TableCell>{entry.created}</TableCell>
                            <TableCell>{entry.category.name}</TableCell>
                            <TableCell>{entry.description}</TableCell>
                            <TableCell align="right">{entry.amount} PLN</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={budget.entries.length}>
                        {isAddingNewRow ?
                            <>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Select native defaultValue="none" onChange={(e) => setFormData({...formData, category_id: e.target.value as string})}>
                                        <option value="none" disabled>
                                              {"Category"}
                                          </option>
                                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </Select></TableCell>
                                <TableCell>
                                    <Input placeholder="Description" type={"text"} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/></TableCell>
                                <TableCell align="right">
                                    <Input placeholder="Amount" type={"number"} value={formData.amount} onChange={(e) => setFormData({...formData, amount: +e.target.value})}/></TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => onCreateEntry()}>Save</Button>
                                </TableCell></> : <TableCell colSpan={5} align={"right"}>
                                <Button onClick={() => setIsAddingNewRow(true)}>Add new entry</Button>
                            </TableCell>}
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
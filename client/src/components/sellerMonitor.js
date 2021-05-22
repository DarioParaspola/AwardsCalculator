import React, { useEffect } from 'react';
import blueGrey from "@material-ui/core/colors/blueGrey";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const Cell = withStyles((theme) => ({
    head: {
        backgroundColor: blueGrey[100],
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const Row = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const sellerMonitor = ({ sellers }) => {
    const classes = useStyles();

    useEffect(() => {
        createRows();
    }, [sellers]);

    const createRows = () => {
        return sellers.map((seller, key) => (
            seller.monthlyRevenues.length === 0
                ? <Row key={key}>
                    <Cell component="th" scope="row">
                        {seller.name}
                    </Cell>
                </Row>
                : seller.monthlyRevenues.map((v, key) => (
                    <Row key={key}>
                        <Cell component="th" scope="row" key={`${seller.name}_${key}`}>
                            {seller.name}
                        </Cell>
                        <Cell key={`${v.monthName}_${key}`}>{v.monthName}</Cell>
                        <Cell key={`${v.year}_${key}`}>{v.year}</Cell>
                        <Cell key={`${v.value}_${key}`}>{v.value}</Cell>
                    </Row>
                ))
        ));
    };

    return (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <Cell>Seller</Cell>
                    <Cell>Month</Cell>
                    <Cell>Year</Cell>
                    <Cell>Revenue</Cell>
                </TableRow>
            </TableHead>
            <TableBody>
                {createRows()}
            </TableBody>
        </Table>
    </TableContainer>);

}

export default sellerMonitor;
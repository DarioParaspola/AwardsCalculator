import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

const sellerMonitor = ({sellers}) => {
    const classes = useStyles();

    useEffect(() => {
        createRows();
    }, [sellers]);

    const createRows = () => {
        return sellers.map((seller, key) => (
            seller.monthlyRevenues.length === 0
                ? <TableRow key={`${seller.name}_${key}`}>
                    <TableCell component="th" scope="row">
                        {seller.name}
                    </TableCell>
                </TableRow>
                : seller.monthlyRevenues.map((v, key) => (
                    <TableRow key={`${seller.name}_${key}`}>
                        <TableCell component="th" scope="row" key={key}>
                            {seller.name}
                        </TableCell>
                        <TableCell key={key}>{v.monthName}</TableCell>
                        <TableCell key={key}>{v.year}</TableCell>
                        <TableCell key={key}>{v.value}</TableCell>
                    </TableRow>
                ))
        ));
    };

    return (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Seller</TableCell>
                    <TableCell>Month</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Revenue</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {createRows()}
            </TableBody>
        </Table>
    </TableContainer>);

}

export default sellerMonitor;
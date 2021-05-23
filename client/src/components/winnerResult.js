import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";

const winnerReport = ({ show, winner, awardDate, classes }) => {

    return (<Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography variant="h5" component="h2">
                Award Winner
            </Typography>
            <Typography variant="body2" component="p">
                Name: {show && winner.name}
                <br />
                Revenue increase: {show && winner.revenueIncrease}
                <br />
                Mounth: {show && awardDate.format('MMMM YYYY')}
            </Typography>
        </CardContent>
    </Card>);
};

export default winnerReport;
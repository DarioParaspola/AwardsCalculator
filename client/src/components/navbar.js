import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    color: {
        background: theme.palette.common.black
    }
}));

const navBar = ({ title }) => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.color}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default navBar;
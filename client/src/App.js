import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Typography, Divider } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SaveIcon from '@material-ui/icons/Save';
import FunctionsIcon from '@material-ui/icons/Functions';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Utils from './utils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AwardCalculator from './awardCalculator';
import StorageIcon from '@material-ui/icons/Storage';
import { demoDataset } from './demoDataset';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
  button2: {
    margin: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

const App = () => {
  const classes = useStyles();

  const [sellerName, setSellerName] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");
  const [sellers, setSellers] = useState([]);
  const [revenueDate, setRevenueDate] = useState(moment.utc());
  const [awardDate, setAwardDate] = useState(moment.utc());
  const [revenue, setRevenue] = useState("");
  const [winnerSeller, setWinner] = useState({});
  const [showWinner, setShowWinner] = useState(false);

  const demo = () => {
    setSellers(demoDataset);
  }

  const addSeller = () => {
    var seller = {
      name: sellerName,
      monthlyRevenues: []
    };
    setSellers([...sellers, seller]);
    console.log(sellers);
  }

  const addSellerRevenue = () => {
    var currentRevenue = {
      monthName: revenueDate.format('MMMM'),
      month: revenueDate.month() + 1,
      year: revenueDate.year(),
      value: parseInt(revenue)
    };

    var seller = Utils.filterSellerByName(sellers, selectedSeller);
    var updatedSeller = Utils.addMounthRevenue(seller, currentRevenue);
    var updatedSellers = Utils.updateSellers(sellers, updatedSeller);

    setSellers(updatedSellers);
  }

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

  const handleRevenueDateChange = (date) => {
    setRevenueDate(date);
  };
  const handleAwardDateChange = (date) => {
    setAwardDate(date);
  };

  const handleChange = (event) => {
    setSelectedSeller(event.target.value);
  };

  const calculateAward = () => {
    setShowWinner(false);
    var date = awardDate;
    var result = AwardCalculator.calculateWinningSeller(sellers, date);
    setWinner(result);
    setShowWinner(true);
  };

  useEffect(() => {
    createRows();
  }, [sellers]);

  return (
    <div className="App">
      <Container>
        <div>
          <Typography variant="h3" gutterBottom>
            Homework
          </Typography>
        </div>
        <Paper className={classes.paper} elevation={4}>
          <Grid container spacing={3} justify="flex-end">
            <Grid item xs={5} >
              Add Seller
          <Divider />
              <TextField
                id="name"
                label="Name"
                value={sellerName}
                onChange={e => setSellerName(e.target.value)} />
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={addSeller}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<StorageIcon />}
                onClick={demo}
              >
                Demo dataset
              </Button>
            </Grid>
            <Grid item xs={7}>
              Menage Seller
          <Divider />
              <FormControl className={classes.formControl}>
                <InputLabel id="seller">Seller</InputLabel>
                <Select
                  labelId="seller"
                  id="sellername"
                  value={selectedSeller}
                  onChange={handleChange}
                >{sellers.map((s, key) => (<MenuItem key={key} value={s.name}>{s.name}</MenuItem>))}
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="DD/MM/yyyy"
                  margin="normal"
                  id="date-of.revenue"
                  label="Date of revenue"
                  clearable
                  views={["year", "month", "date"]}
                  value={revenueDate}
                  onChange={handleRevenueDateChange}
                />
              </MuiPickersUtilsProvider>

              <TextField
                className={classes.button}
                id="revenue"
                label="Revenue"
                value={revenue}
                onChange={e => setRevenue(e.target.value)} />
              <Grid container spacing={3} justify="flex-end">
                <Grid item xs={4} >
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={addSellerRevenue}
                  >
                    Save Revenue
              </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              Seller Monitor
              <Divider />
              <TableContainer component={Paper}>
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
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              Calculate the Winner Seller
            <Divider />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="DD/MM/yyyy"
                  margin="normal"
                  id="date-of.revenue"
                  label="Award date"
                  clearable
                  value={awardDate}
                  onChange={handleAwardDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button2}
                startIcon={<FunctionsIcon />}
                onClick={calculateAward}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Award Winner
        </Typography>
                  <Typography variant="body2" component="p">
                    Name: {showWinner && winnerSeller.name}
                    <br />
                    Revenue increase: {showWinner && winnerSeller.revenueIncrease}
                    <br />
                    Mounth: {showWinner && awardDate.format('MMMM YYYY')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div >
  );
}

export default App;
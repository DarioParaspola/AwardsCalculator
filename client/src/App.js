import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Divider } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FunctionsIcon from '@material-ui/icons/Functions';
import StorageIcon from '@material-ui/icons/Storage';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { demoDataset } from './demoDataset';
import Utility from './components/utility';
import AwardCalculator from './components/awardCalculator';
import MomentTimePicker from './components/momentTimePicker'
import SellerMonitor from './components/sellerMonitor';
import WinnerReport from './components/winnerResult';
import Navbar from './components/navbar'

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
  const [enabledSave, setEnableSave] = useState(false);

  const demo = () => {
    setSellers(demoDataset);
  }

  const addSeller = () => {
    var seller = {
      name: sellerName,
      monthlyRevenues: []
    };
    setSellers([...sellers, seller]);
  }

  const addSellerRevenue = () => {
    var currentRevenue = {
      monthName: revenueDate.format('MMMM'),
      month: revenueDate.month() + 1,
      year: revenueDate.year(),
      value: parseInt(revenue)
    };        
    setSellers(Utility.save(sellers, selectedSeller, currentRevenue));
  }

  const handleRevenueDateChange = (date) => {
    setRevenueDate(date);
  };
  const handleAwardDateChange = (date) => {
    setAwardDate(date);
  };
  const handleSellerChange = (event) => {
    setSelectedSeller(event.target.value);
  };

  const calculateAward = () => {
    setShowWinner(false);
    var date = awardDate;
    var result = AwardCalculator.calculateWinningSeller(sellers, date);
    setWinner(result);
    setShowWinner(true);
  };

  const saveRevenue = (e) => {
    setRevenue(e.target.value);
    setEnableSave(true);
  }

  return (
    <div className="App">
      <Container>
        <Navbar title="Homework" />
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
              Menage Sellers
          <Divider />
              <FormControl className={classes.formControl}>
                <InputLabel id="seller">Seller</InputLabel>
                <Select
                  labelId="seller"
                  id="sellername"
                  value={selectedSeller}
                  onChange={handleSellerChange}
                >{sellers.map((s, key) => (<MenuItem key={key} value={s.name}>{s.name}</MenuItem>))}
                </Select>
              </FormControl>
              <MomentTimePicker
                label="Date of revenue"
                value={revenueDate}
                onChange={handleRevenueDateChange} />
              <TextField
                className={classes.button}
                id="revenue"
                label="Revenue"
                value={revenue}
                onChange={e => saveRevenue(e)} />
              <Grid container spacing={3} justify="flex-end">
                <Grid item xs={4} >
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={addSellerRevenue}
                    disabled={!enabledSave}
                  >
                    Save Revenue
              </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              Seller Monitor
              <Divider />
              <SellerMonitor
                sellers={sellers} />
            </Grid>
            <Grid item xs={12}>
              Calculate the Winner Seller
            <Divider />
            </Grid>
            <Grid item xs={6}>
              <MomentTimePicker
                label="Award date"
                value={awardDate}
                onChange={handleAwardDateChange} />
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button2}
                startIcon={<FunctionsIcon />}
                onClick={calculateAward}
                disabled={sellers.length <= 0}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item xs={6}>
              <WinnerReport
                show={showWinner}
                winner={winnerSeller}
                awardDate={awardDate}
                classes={classes} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div >
  );
}

export default App;
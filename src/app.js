const moment = require('moment');
const utils = require('./models/utils');
const AwardCalculator = require('./services/awardCalculator');

const sellers = utils.initData();

var calculator = new AwardCalculator();

const date = moment.utc();
console.log(`Winner for month: ${date}`);
var maySeller = calculator.calculateWinningSeller(sellers, date);
console.log(maySeller);

const juneDate = moment("2021-06-15");
console.log(`Winner for month: ${juneDate}`);
var juneSeller = calculator.calculateWinningSeller(sellers, juneDate);
console.log(juneSeller);

const julyDate = moment("2021-07-15");
console.log(`Winner for month: ${julyDate}`);
var julySeller = calculator.calculateWinningSeller(sellers, julyDate);
console.log(julySeller);

var sellerMonitor = calculator.monitoringSellerActivities(sellers);
sellerMonitor.forEach(element => {
    console.log(`Seller: ${element.Name}, MounthWithRevenues: ${element.MounthWithRevenues}`);
});
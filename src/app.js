const moment = require('moment');
const utils = require('./models/utils');
const AwardCalculator = require('./services/awardCalculator');

const sellers = utils.initData();

var calculator = new AwardCalculator();

var winnerSeller = calculator.calculateWinningSeller(sellers, moment.utc());
var sellerMonitor = calculator.monitoringSellerActivities(sellers);

console.log(winnerSeller);
sellerMonitor.forEach(element => {
    console.log(`Seller: ${element.Name}, MounthWithRevenues: ${element.MounthWithRevenues}`);
});
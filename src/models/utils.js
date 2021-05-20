const models = require('./modelObjects');
function initData() {
    var seller1 = new models.Seller("Seller1");
    seller1.addAnnualRevenueByMonth(5, 2020, 150);
    seller1.addAnnualRevenueByMonth(5, 2021, 378);
    seller1.addAnnualRevenueByMonth(6, 2020, 542);
    seller1.addAnnualRevenueByMonth(6, 2021, 378);
    seller1.addAnnualRevenueByMonth(7, 2021, 378);

    var seller2 = new models.Seller("Seller2");
    seller2.addAnnualRevenueByMonth(5, 2020, 234);
    seller2.addAnnualRevenueByMonth(5, 2021, 378);
    seller2.addAnnualRevenueByMonth(6, 2020, 120);
    seller2.addAnnualRevenueByMonth(6, 2021, 378);

    var seller3 = new models.Seller("Seller3");
    seller3.addAnnualRevenueByMonth(5, 2020, 234);
    seller3.addAnnualRevenueByMonth(5, 2021, 178);
    seller3.addAnnualRevenueByMonth(6, 2020, 178);
    seller3.addAnnualRevenueByMonth(6, 2021, 220);
    seller3.addAnnualRevenueByMonth(7, 2021, 178);
    seller3.addAnnualRevenueByMonth(8, 2021, 178);

    return [seller1, seller2, seller3];
}

module.exports.initData = initData;
const models = require('../models/modelObjects');

class AwardCalculator {
    constructor() {
        this.goldenRatio = 1.62;
    }

    calculateWinningSeller(candidateSellers, date) {
        var year = date.year();
        var month = date.month() + 1;

        var sellers = candidateSellers.map(seller => {
            var currentMonthRevenues = seller.MonthlyRevenues.find(revenue => {
                return revenue.Month === month;
            });

            var currentYearRevenue = this._filterByYear(currentMonthRevenues, year);
            var lastYearRevenue = this._filterByYear(currentMonthRevenues, year - 1);

            var revenueIncrease = 0;
            if (currentYearRevenue && lastYearRevenue)
                revenueIncrease = this._calculateRatioRevenue(currentYearRevenue.Value, lastYearRevenue.Value);

            return new models.WinnerSeller(seller.Id, revenueIncrease);
        });

        var winnerSeller = this._extractWinnerSeller(sellers);
        return winnerSeller;
    }

    monitoringSellerActivities(sellers) {
        var monitorBySeller = sellers.map(seller => {
            return new models.SellerMonitor(seller.Id, seller.MonthlyRevenues.length);
        });
        return monitorBySeller;
    }

    _filterByYear(month, year) {
        if (month)
            return month.Revenues.find(c => {
                return c.Year === year;
            });
    }

    _calculateRatioRevenue(a, b) {
        var value = a / b;
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    _extractWinnerSeller(sellers) {
        return sellers.reduce((prev, curr) => {
            return (Math.abs(curr.RevenueIncrease - this.goldenRatio) < Math.abs(prev.RevenueIncrease - this.goldenRatio) ? curr : prev);
        });
    }
}

module.exports = AwardCalculator;
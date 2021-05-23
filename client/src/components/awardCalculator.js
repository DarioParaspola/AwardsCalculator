const goldenRatio = 1.62;
class AwardCalculator {

    static calculateWinningSeller(candidateSellers, date) {
        var year = date.year();
        var month = date.month() + 1;

        return this.extractWinnerSeller(candidateSellers.map(seller => {
            var currentMonthRevenues = seller.monthlyRevenues.filter(revenue => {
                return revenue.month === month;
            });

            var currentYearRevenue = this.filterByYear(currentMonthRevenues, year);
            var lastYearRevenue = this.filterByYear(currentMonthRevenues, year - 1);

            var revenueIncrease = 0;
            if (currentYearRevenue && lastYearRevenue)
                revenueIncrease = this.calculateRatioRevenue(currentYearRevenue.value, lastYearRevenue.value);

            return { name: seller.name, revenueIncrease: revenueIncrease };
        }));        
    }

    static filterByYear(yearByMonth, year) {
        if (yearByMonth)
            return yearByMonth.find(c => {
                return c.year === year;
            });
    }

    static calculateRatioRevenue(a, b) {
        var value = a / b;
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    static extractWinnerSeller(sellers) {
        return sellers.reduce((prev, curr) => {
            return (Math.abs(curr.revenueIncrease - goldenRatio) < Math.abs(prev.revenueIncrease - goldenRatio) 
            ? curr 
            : prev);
        });
    }
}

export default AwardCalculator;
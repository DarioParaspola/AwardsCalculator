const moment = require("moment");
const AwardCalculator = require('../src/services/awardCalculator');
const models = require('../src/models/modelObjects');
const utils = require('../src/models/utils');

describe('Seller', () => {

    describe('Initialize Seller', () => {

        it('initialize new seller without revenues', () => {
            var seller = new models.Seller("SellerId");

            expect(seller.MonthlyRevenues).toEqual([]);
        });

    });

    describe('Seller without month revenues', () => {

        it('initialize new seller without revenues and add unexistent month', () => {
            var seller = new models.Seller("SellerId");
            seller.addAnnualRevenueByMonth(5, 2021, 520);

            var expectedMonth = new models.MonthlyRevenue(5);
            expectedMonth.addYearRevenue(new models.YearRevenue(2021, 520));

            expect(seller.MonthlyRevenues).toEqual([expectedMonth]);
        });

        it('initialize new seller with revenues and add existent month', () => {
            var seller = new models.Seller("SellerId");
            seller.addAnnualRevenueByMonth(5, 2021, 520);

            var expectedMonth = new models.MonthlyRevenue(5);
            expectedMonth.addYearRevenue(new models.YearRevenue(2021, 520));
            expectedMonth.addYearRevenue(new models.YearRevenue(2020, 123));

            seller.addAnnualRevenueByMonth(5, 2020, 123);

            expect(seller.MonthlyRevenues).toEqual([expectedMonth]);
        });

    });
});


describe('Award calculator', () => {
    let calculator;
    beforeEach(() => {
        calculator = new AwardCalculator();
    });
    describe('Extract winner seller with value near golder ratio', () => {
        it('_extractWinnerSeller with value near golden ratio', () => {
            const sellers = [
                new models.WinnerSeller("1", 0.71),
                new models.WinnerSeller("2", 2.33),
                new models.WinnerSeller("3", 1.55)];

            var result = calculator._extractWinnerSeller(sellers);
            expect(result).toEqual(new models.WinnerSeller("3", 1.55));
        });

        it('_extractWinnerSeller without value near golden ratio', () => {
            const sellers = [
                new models.WinnerSeller("1", 0.71),
                new models.WinnerSeller("2", 2.33),
                new models.WinnerSeller("3", 5.55)];

            var result = calculator._extractWinnerSeller(sellers);

            expect(result).toEqual(new models.WinnerSeller("2", 2.33));
        });
    });

    describe('Filter Monthly revenues by year', () => {
        const seller = new models.Seller("name");
        seller.addAnnualRevenueByMonth(5, 2020, 150);
        seller.addAnnualRevenueByMonth(5, 2021, 378);
        it('_filterByYear 2020', () => {
            var expected = new models.YearRevenue(2020, 150);

            var actual = calculator._filterByYear(seller.MonthlyRevenues[0], 2020);
            expect(actual).toEqual(expected);
        });

        it('_filterByYear 2021', () => {
            var expected = new models.YearRevenue(2021, 378);

            var actual = calculator._filterByYear(seller.MonthlyRevenues[0], 2021);
            expect(actual).toEqual(expected);
        });

        it('_filterByYear without valid year', () => {
            var mounth = seller.MonthlyRevenues.find(revenue => {
                return revenue.Month === 5;
            });
            var actual = calculator._filterByYear(mounth, 2022);
            expect(actual).toEqual(undefined);
        });
    });

    describe('Calculate Winning Seller', () => {
        const sellers = utils.initData();
        it('calculateWinningSeller with fixed dataset for current month', () => {

            var winnerSeller = calculator.calculateWinningSeller(sellers, moment.utc());
            expect(winnerSeller).toEqual(new models.WinnerSeller("Seller2", 1.62));
        });

        it('calculateWinningSeller with fixed dataset with custom date', () => {
            const date = moment("2021-06-15");
            var winnerSeller = calculator.calculateWinningSeller(sellers, date);
            expect(winnerSeller).toEqual(new models.WinnerSeller("Seller3", 1.24));
        });

        it('calculateWinningSeller with fixed dataset with custom date and missing month', () => {
            const date = moment("2021-07-15");
            var winnerSeller = calculator.calculateWinningSeller(sellers, date);
            expect(winnerSeller).toEqual(new models.WinnerSeller("Seller1", 0));
        });
    });

    describe('Monitoring Seller Activities', () => {
        const sellers = utils.initData();
        it('monitoringSellerActivities report', () => {
            var actual = calculator.monitoringSellerActivities(sellers);
            var expected = [
                new models.SellerMonitor("Seller1", 3),
                new models.SellerMonitor("Seller2", 2),
                new models.SellerMonitor("Seller3", 4)];
            expect(actual).toEqual(expected);
        });
    });
});
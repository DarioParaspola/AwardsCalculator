import AwardCalculator from '../src/components/awardCalculator';
import { demoDataset } from './demoDataset';
import moment from 'moment';
describe('AwardCalculetor', () => {
    describe('Extract winner seller with value near golder ratio', () => {
        it('_extractWinnerSeller with value near golden ratio', () => {
            const sellers = [
                { name: "1", revenueIncrease: 0.71 },
                { name: "2", revenueIncrease: 2.33 },
                { name: "3", revenueIncrease: 1.55 }];

            var result = AwardCalculator.extractWinnerSeller(sellers);
            expect(result).toEqual({ name: "3", revenueIncrease: 1.55 });
        });

        it('_extractWinnerSeller without value near golden ratio', () => {
            const sellers = [
                { name: "1", revenueIncrease: 0.71 },
                { name: "2", revenueIncrease: 2.33 },
                { name: "3", revenueIncrease: 5.55 }];

            var result = AwardCalculator.extractWinnerSeller(sellers);

            expect(result).toEqual({ name: "2", revenueIncrease: 2.33 });
        });
    });

    describe('Filter Monthly revenues by year', () => {
        const monthlyRevenues = [{
            monthName: 'May',
            month: 5,
            year: 2020,
            value: 150
        }, {
            monthName: 'May',
            month: 5,
            year: 2021,
            value: 250
        }];
        it('_filterByYear 2020', () => {
            var expected = {
                monthName: 'May',
                month: 5,
                year: 2020,
                value: 150
            };

            var actual = AwardCalculator.filterByYear(monthlyRevenues, 2020);
            expect(actual).toEqual(expected);
        });

        it('_filterByYear 2021', () => {
            var expected = {
                monthName: 'May',
                month: 5,
                year: 2021,
                value: 250
            }

            var actual = AwardCalculator.filterByYear(monthlyRevenues, 2021);
            expect(actual).toEqual(expected);
        });

        it('_filterByYear without valid year', () => {
            var actual = AwardCalculator.filterByYear(monthlyRevenues, 2022);
            expect(actual).toEqual(undefined);
        });
    });

    describe('Calculate Winning Seller', () => {
        const sellers = demoDataset;
        it('calculateWinningSeller with fixed dataset for current month', () => {

            var winnerSeller = AwardCalculator.calculateWinningSeller(sellers, moment.utc());
            expect(winnerSeller).toEqual({ name: "Seller2", revenueIncrease: 1.62 });
        });

        it('calculateWinningSeller with fixed dataset with custom date', () => {
            const date = moment("2021-06-15");
            var winnerSeller = AwardCalculator.calculateWinningSeller(sellers, date);
            expect(winnerSeller).toEqual({ name: "Seller3", revenueIncrease: 1.24 });
        });

        it('calculateWinningSeller with fixed dataset with custom date and missing month', () => {
            const date = moment("2021-07-15");
            var winnerSeller = AwardCalculator.calculateWinningSeller(sellers, date);
            expect(winnerSeller).toEqual({ name: "Seller1", revenueIncrease: 0 });
        });
    });

})
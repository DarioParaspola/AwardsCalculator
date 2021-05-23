import Utility from '../src/components/utility';

describe('Utility', () => {
    describe('addMounthRevenue', () => {

        it('seller without month revenue', () => {
            var seller = {
                name: "Seller1",
                monthlyRevenues: []
            }
            var revenue = {
                monthName: 'May',
                month: 5,
                year: 2020,
                value: 150
            }

            var result = Utility.addMounthRevenue(seller, revenue);

            var expected = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }

            expect(result).toEqual(expected);
        })
        it('seller with existing add new', () => {
            var seller = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }
            var revenue = {
                monthName: 'May',
                month: 5,
                year: 2021,
                value: 150
            }
            var result = Utility.addMounthRevenue(seller, revenue);

            var expected = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                },
                {
                    monthName: 'May',
                    month: 5,
                    year: 2021,
                    value: 150
                }]
            }
            expect(result).toEqual(expected);
        })

        it('seller with existing update value', () => {
            var seller = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }
            var revenue = {
                monthName: 'May',
                month: 5,
                year: 2020,
                value: 250
            }
            var result = Utility.addMounthRevenue(seller, revenue);

            var expected = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 250
                }]
            }
            expect(result).toEqual(expected);
        })
    })

    describe('updateSellers', () => {

        it('update sellers add one revenue to existong seller', () => {
            var sellers = [{
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }, {
                name: "Seller2",
                monthlyRevenues: []
            }]

            var updatedSeller = {
                name: "Seller2",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }

            var updatedSellers = Utility.updateSellers(sellers, updatedSeller);

            var expected = [{
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }, {
                name: "Seller2",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }]

            expect(updatedSellers).toEqual(expected);
        })

        it('update sellers add one revenue to existong seller with one revenue', () => {
            var sellers = [{
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                }]
            }]

            var updatedSeller = {
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                },
                {
                    monthName: 'May',
                    month: 5,
                    year: 2021,
                    value: 250
                }]
            }

            var updatedSellers = Utility.updateSellers(sellers, updatedSeller);

            var expected = [{
                name: "Seller1",
                monthlyRevenues: [{
                    monthName: 'May',
                    month: 5,
                    year: 2020,
                    value: 150
                },
                {
                    monthName: 'May',
                    month: 5,
                    year: 2021,
                    value: 250
                }]
            }]

            expect(updatedSellers).toEqual(expected);
        })
    })
})
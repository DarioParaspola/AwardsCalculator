class Utility {

    static save = (sellers, name, revenue) => {
        return this.updateSellers(
            sellers,
            this.addMounthRevenue(
                this.filterSellerByName(sellers, name),
                revenue));
    }

    static filterSellerByName = (sellers, name) => {
        return sellers.find(s => {
            return s.name === name;
        })
    };

    static addMounthRevenue = (seller, revenue) => {
        var cloned = Object.assign({}, seller);

        var currentMounthYearRevenue = cloned.monthlyRevenues.find(m => { return m.month === revenue.month && m.year === revenue.year; });

        if (currentMounthYearRevenue)
            currentMounthYearRevenue.value = revenue.value;
        else {
            cloned.monthlyRevenues.push(revenue);
        }

        return cloned;
    }

    static updateSellers = (sellers, updatedSeller) => {
        var cloned = Array.from(sellers);
        var sellerIndex = cloned.findIndex(s => s.name === updatedSeller.name);
        cloned.splice(sellerIndex, 1)
        return [...cloned, cloned[sellerIndex] = updatedSeller];
    }
}
export default Utility;
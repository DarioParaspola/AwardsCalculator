class Seller {
    constructor(id) {
        this.Id = id;
        this.MonthlyRevenues = [];
    }

    addAnnualRevenueByMonth(month, year, value) {
        var yearRevenue = new YearRevenue(year, value);
        var exist = this.MonthlyRevenues.find(m => { return m.Month == month; });

        if (exist)
            exist.Revenues.push(yearRevenue);
        else {
            var monthlyRevenue = new MonthlyRevenue(month);
            monthlyRevenue.addYearRevenue(yearRevenue);
            this.MonthlyRevenues.push(monthlyRevenue);
        }
    }
}

class YearRevenue {
    constructor(year, value) {
        this.Year = year;
        this.Value = value;
    }
}

class MonthlyRevenue {
    constructor(month) {
        this.Month = month;
        this.Revenues = [];
    }

    addYearRevenue(yearRevenue) {
        this.Revenues.push(yearRevenue);
    }
}

class WinnerSeller {
    constructor(name, revenueIncrease) {
        this.Name = name;
        this.RevenueIncrease = revenueIncrease;
    }
}

class SellerMonitor{
    constructor(name, value){
        this.Name = name;
        this.MounthWithRevenues = value;
    }
}

module.exports.Seller = Seller;
module.exports.YearRevenue = YearRevenue;
module.exports.MonthlyRevenue = MonthlyRevenue;
module.exports.WinnerSeller = WinnerSeller;
module.exports.SellerMonitor = SellerMonitor;
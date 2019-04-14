"use-strict"

var workingHours = [
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM'
];
var tableEl = document.getElementById("counts");

function LocationSalesData(location, minCust, maxCust, avgCookie) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
    this.hourlyCookiesSale = [];
    this.locationTotalSale = 0;
    this.calculateHourlySales = function() {
        for (var i=0; i<workingHours.length; i++) {
            var cookieCount = Math.floor(this.avgCookie*getCustCount(this.minCust, this.maxCust));
            this.hourlyCookiesSale.push(cookieCount);
            this.locationTotalSale += cookieCount;
        }
    }

    this.render = function() {
        var trEl = document.createElement('tr');
        tableEl.appendChild(trEl);
        var tdEl = document.createElement('td')
        tdEl.textContent = this.location;
        trEl.appendChild(tdEl);

        this.calculateHourlySales();

        for (var i=0; i< this.hourlyCookiesSale.length; i++) {
            var tdEl = document.createElement('td')
            tdEl.textContent = this.hourlyCookiesSale[i];
            trEl.appendChild(tdEl);
        }
        var tdEl = document.createElement('td')
        tdEl.textContent = this.locationTotalSale;
        trEl.appendChild(tdEl);
    }
}

var firstPike = new LocationSalesData('1st and Pike', 23, 65, 6.3);
var seatac = new LocationSalesData('Seattle Tacoma Airport', 3, 24, 1.2);
var seaCenter = new LocationSalesData('Seattle Center', 11, 38, 3.7);
var capitolHill = new LocationSalesData('Capito Hill', 20, 38, 2.3);
var alki = new LocationSalesData('Alki', 2, 16, 4.6);

var storesArray = [firstPike, seatac, seaCenter, capitolHill, alki];

function getCustCount(min, max) {
    return Math.floor((Math.random()*(max - min)) + min);
}

function createTableHeader() {
    var theadEl = document.createElement('thead');
    tableEl.appendChild(theadEl);
    
    var thEl = document.createElement('th');
    thEl.textContent = 'Location/Hour';
    theadEl.appendChild(thEl);

    for (var i = 0; i < workingHours.length; i++) {
        thEl = document.createElement('th');
        thEl.textContent = workingHours[i];
        theadEl.appendChild(thEl);
    }
    
    thEl = document.createElement('th');
    thEl.textContent = 'Totals'
    theadEl.appendChild(thEl);
}

function createTableFooter() {
    var overallSales = 0;
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    var tdEl = document.createElement('td')
    tdEl.textContent = 'Hourly Totals';
    trEl.appendChild(tdEl);
    for (var i=0; i<workingHours.length; i++) {
        var hourlyTotals = 0;
        for (var j=0; j<storesArray.length; j++) {
            hourlyTotals += storesArray[j].hourlyCookiesSale[i];
        }
        var tdEl = document.createElement('td')
        tdEl.textContent = hourlyTotals;
        trEl.appendChild(tdEl);
        overallSales += hourlyTotals;
    }
    var tdEl = document.createElement('td')
    tdEl.textContent = overallSales;
    trEl.appendChild(tdEl);
}

createTableHeader();

for (j=0; j<storesArray.length; j++) {
  storesArray[j].render();
}

createTableFooter();
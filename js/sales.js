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
var form = document.getElementById("user-input");
var storesArray = [];

function LocationSalesData(location, minCust, maxCust, avgCookie) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
    this.hourlyCookiesSale = [];
    this.locationTotalSale = 0;
    storesArray.push(this);
    this.calculateHourlySales = function() {
        for (var i=0; i<workingHours.length; i++) {
            var cookieCount = Math.floor(this.avgCookie*getCustCount(this.minCust, this.maxCust));
            console.log(workingHours[i] + " " + this.avgCookie + " " + cookieCount + " " + this.maxCust);
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

function addLocation(event) {
    event.preventDefault();

    var locationName = event.target.location.value;
    var minCustomer = event.target.mincustomer.value;
    var maxCustomer = event.target.maxcustomer.value;
    var avgCookie = event.target.avgcookie.value;

    var duplicate = validateDuplicate(locationName);

    if (duplicate === 'N') {
    var newLocation = new LocationSalesData(locationName, minCustomer, maxCustomer, avgCookie);
    newLocation.render();
    createTableFooter();
    } else {
        alert('Location already present in table.');
    }
    form.reset();
}

function validateDuplicate(locationName) {
    for (var i=0; i<storesArray.length; i++) {
        if (storesArray[i].location === locationName) {
            console.log('Duplicate Location Submitted - ' + locationName);
            return 'Y'
        }
    }
    return 'N';
}

function getCustCount(min, max) {
    var custCount = Math.random()*(max - min);
    custCount += min;
    return custCount;
}

function calculateAllLocationSales() {
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
    let table = document.querySelector('table');
    if (storesArray.length > 1) {
        console.log('Stores Array Length - ' + storesArray.length);
        table.deleteRow(storesArray.length-1);
    }
    calculateAllLocationSales();
}

createTableHeader();

form.addEventListener('submit', addLocation);
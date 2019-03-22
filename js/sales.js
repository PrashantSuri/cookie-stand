"use-strict"

function LocationSalesData(location, minCust, maxCust, avgCookie) {
    this.location = location;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookie = avgCookie;
}

var firstPike = new LocationSalesData('1st and Pike', 23, 65, 6.3);
var seatac = new LocationSalesData('Seattle Tacoma Airport', 3, 24, 1.2);
var seaCenter = new LocationSalesData('Seattle Center', 11, 38, 3.7);
var capitolHill = new LocationSalesData('Capito Hill', 20, 38, 2.3);
var alki = new LocationSalesData('Alki', 2, 16, 4.6);

var storesArray = [firstPike, seatac, seaCenter, capitolHill, alki];
var mainEl = document.getElementById("counts");

for (i=0; i<storesArray.length; i++) {
    var hour = 6;
    var ulEl = document.createElement('ul');        
    mainEl.appendChild(ulEl);
    var para = document.createElement('p');
    para.textContent = storesArray[i].name;
    para.style = 
    ulEl.appendChild(para);
    while (hour<=21) {
        if (hour>12) {
        var hourTwelve = hour - 12;
        var suffix = 'pm';
        } else {
            var hourTwelve = hour;
            var suffix = 'am';
        }
        var cookieCount = Math.floor(storesArray[i].avgCookie*getCustCount(storesArray[i].minCust, storesArray[i].maxCust));
        var liEl = document.createElement('li');
        liEl.textContent = hourTwelve + suffix + ': ' + cookieCount;
        ulEl.appendChild(liEl);
        hour++;
    }
}

function getCustCount(min, max) {
    return Math.floor((Math.random()*(max - min)) + min);
}

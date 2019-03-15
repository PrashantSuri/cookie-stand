"use-strict"

var firstPike = {
    name: '1st and Pike',
    minCust: 23,
    maxCust: 65,
    avgCookie: 6.3,
};

var seatac = {
    name: 'Seattle Tacoma Airport',
    minCust: 3,
    maxCust: 24,
    avgCookie: 1.2
}

var seaCenter = {
    name: 'Seattle Center',
    minCust: 11,
    maxCust: 38,
    avgCookie: 3.7
}

var capitolHill = {
    name: 'Capito Hill',
    minCust: 20,
    maxCust: 38,
    avgCookie: 2.3
}

var alki = {
    name: 'Alki',
    minCust: 2,
    maxCust: 16,
    avgCookie: 4.6
}

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

const API_KEY =  '8AW5NOBGFWDIIS44.'; // API Zugriff Alpha Vantage
let month = ['2020-11-30', '2020-12-31', '2021-01-31', '2021-02-28', '2021-03-31', '2021-04-30', '2021-05-31', '2021-06-30', '2021-07-31', '2021-08-31'];
let course =[];

async function init(){ 
    await loadCourse();
    await loadMonthlyCourse();
    renderChart();
}

async function loadCourse() {
    let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=' + API_KEY;
    let response = await fetch(url); // laden von url
    let responseAsJson = await response.json(); // laden als json
    let currentCourse = (Math.round (responseAsJson ['Realtime Currency Exchange Rate']['5. Exchange Rate'])); // Zugriff auf Json und Math round

    document.getElementById('course').innerHTML += `<b> ${currentCourse} Euro </b>`;
    loadMonthlyCourse();
}

async function loadMonthlyCourse(){
    let url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=' + API_KEY;
    let response = await fetch(url); // laden von url
    let responseAsJson = await response.json(); // laden als json

    let monthlyCourse = responseAsJson['Time Series (Digital Currency Monthly)'];
    console.log(responseAsJson['Time Series (Digital Currency Monthly)']);

    for (let i = 0; i < month.length; i++) {
        const courseEachMonth = Math.round(monthlyCourse[month[i]]['1a. open (EUR)']);
        console.log(courseEachMonth);
        course.push(courseEachMonth);
    }
}
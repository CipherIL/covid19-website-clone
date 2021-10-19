document.addEventListener('DOMContentLoaded', function () {
    const dailyConfirmedByVaccinationChart = Highcharts.chart('daily-confirmed-by-vaccination', {
        chart: {
            type: 'bar',
            height:334,
            styledMode: true
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten',
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }],
        credits: {
            enabled: false,
        },
        
    });
    const severlyIllByVaccinationChart = Highcharts.chart('severly-ill-by-vaccination', {
        chart: {
            type: 'bar',
            height:334,
            styledMode: true
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }],
        credits: {
            enabled: false,
        },
        
    });
    const activelyIllByVaccinationChart = Highcharts.chart('actively-ill-by-vaccination', {
        chart: {
            type: 'bar',
            height:334,
            styledMode: true
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }],
        credits: {
            enabled: false,
        },
        
    });
});
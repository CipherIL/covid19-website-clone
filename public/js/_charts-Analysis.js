//Chart Creation Functions
const dailyConfirmedByVaccinationChart = (xAxis,yAxis,series)=>{
    Highcharts.chart('daily-confirmed-by-vaccination', {
        chart: {
            type: 'line',
            height:330,
            styledMode: true
        },
        title: {
            text: ''
        },
        xAxis: {
            title:{
                text:'תאריך'
            },
            categories:xAxis
        },
        yAxis: {
            title: {
                text: 'שיעור מאומתים יומי'
            },
            categories:yAxis
        },
        series: [{
            name: 'לא מחוסנים',
            data: series.notVaccinated
        }, {
            name: 'מחוסנים ללא תוקף',
            data: series.vaccinatedExpired
        }, {
            name: 'מחוסנים',
            data: series.vaccinated
        }],
        credits: {
            enabled: false,
        },
    });
}
const severlyIllByVaccinationChart = ()=>{
    Highcharts.chart('severly-ill-by-vaccination', {
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
}
const activelyIllByVaccinationChart = ()=>{
    Highcharts.chart('actively-ill-by-vaccination', {
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
}

//General Utillity Functions
const stepCalculator = (num,stepsAmount) => {
    let step = num/stepsAmount;
    let i = 0;
    while(step>10){
        step /= 10;
        i++;
    }
    step = Math.ceil(step);
    step *= Math.pow(10,i);
    const result = [];
    for(i=1;i<=stepsAmount;i++) result.push(''+(step*i));
    return result;
}

//DailyConfirmed Utillity Functions
const getDailyConfirmedMaxValue = (data,ageGroup,per100K) =>{
    let max = 0;
    data.forEach((day)=>{
        dataForAgeGroup = day[ageGroup];
        for(let key of Object.keys(dataForAgeGroup)){
            if(per100K){if(key.includes('Per100K')) max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];}
            else{if(!key.includes('Per100K')) max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];}
        }
    })
    return max;
}
const getDailyConfirmedDates = (data)=>{
    const dates = [];
    data.forEach((day)=>{
        dates.push(day.date);
    })
    return dates;
}
const getDailyConfirmedSeries = (data,ageGroup,per100K)=>{
    const returnData = {};
    returnData.vaccinated = [];
    returnData.notVaccinated = [];
    returnData.vaccinatedExpired = [];
    data.forEach((day)=>{
        dataForAgeGroup = day[ageGroup];
        if(per100K){
            returnData.vaccinated.push(dataForAgeGroup.confirmedVaccinatedPer100K);
            returnData.notVaccinated.push(dataForAgeGroup.confirmedNonVaccinatedPer100K);
            returnData.vaccinatedExpired.push(dataForAgeGroup.confirmedVaccinatedExpiredPer100K);
        }
        else{
            returnData.vaccinated.push(dataForAgeGroup.confirmedVaccinated);
            returnData.notVaccinated.push(dataForAgeGroup.confirmedNonVaccinated);
            returnData.vaccinatedExpired.push(dataForAgeGroup.confirmedVaccinatedExpired);
        } 
    })
    return returnData;
}

document.addEventListener('DOMContentLoaded', async function () {
    
    const dailyConfirmedData = await axios.get('/data/analysis/daily-confirmed/30');
    if(dailyConfirmedData.status===200){
        const yAxisCategories = stepCalculator(getDailyConfirmedMaxValue(dailyConfirmedData.data,'overSixty',true),5);
        const xAxisCategories = getDailyConfirmedDates(dailyConfirmedData.data);
        const series = getDailyConfirmedSeries(dailyConfirmedData.data,'overSixty',true);
        dailyConfirmedByVaccinationChart(xAxisCategories,yAxisCategories,series);
    }
    
    
    severlyIllByVaccinationChart();
    activelyIllByVaccinationChart();
});
// const {createDailyConfirmedChart} = require('./_charts_Analysis_DailyConfirmed');
// const {createActivelyIllByVaccinationChart} = require('./_charts_Analysis_ActivelyIll');
// const {createSeverlyIllByVaccinationChart} = require('./_charts_Analysis_SeverlyIll');

document.addEventListener('DOMContentLoaded', async function () {
    //(int/string limit=int/'all', string ageGroup='overSixty'/'underSixty'/'general',bool per100K)
    createDailyConfirmedChart({limit:"31",ageGroup:'overSixty',per100K:true});
    createSeverlyIllByVaccinationChart({limit:"31",ageGroup:'overSixty',per100K:true,new:false});
    createActivelyIllByVaccinationChart();
});

//General Utillity Functions
const stepCalculator = (num,stepsAmount) => {
    let i = 0;
    while(num>10){
        num /= 10;
        i++;
    }
    num = Math.ceil(num);
    num *= Math.pow(10,i);
    num/= stepsAmount;
    const result = [];
    for(i=1;i<=stepsAmount;i++) result.push((num*i));
    return result;
}

const getArrayOfDates = (days)=>{
    const dates = [];
    days.forEach((day)=>{
        const date = day.date.split('-');
        dates.push(date[2]+"/"+date[1]+"/"+date[0]);
    })
    return dates;    
}
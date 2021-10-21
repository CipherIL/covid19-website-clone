// const {createDailyConfirmedChart} = require('./_charts_Analysis_DailyConfirmed');
// const {createActivelyIllByVaccinationChart} = require('./_charts_Analysis_ActivelyIll');
// const {createSeverlyIllByVaccinationChart} = require('./_charts_Analysis_SeverlyIll');

document.addEventListener('DOMContentLoaded', async function () {
    //(int/string limit=int/'all', string ageGroup='overSixty'/'underSixty'/'general',bool per100K)
    createDailyConfirmedChart({limit:30,ageGroup:'overSixty',per100K:true});
    createSeverlyIllByVaccinationChart();
    createActivelyIllByVaccinationChart();
});

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
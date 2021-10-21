const $dailyConfirmedChartMenu = document.querySelector('#daily-confirmed-chart-menu .chart-menu__button');
const $dailyConfirmedChartMenuSubmit = document.querySelector('#daily-confirmed-chart-menu #submit');
const $dailyConfirmedChartMenuCancel = document.querySelector('#daily-confirmed-chart-menu #cancel');
const $radioOptions = document.querySelectorAll('#daily-confirmed-chart-menu .radio-option');
const $dailyConfirmedMenuButtonArrow = document.querySelector('#daily-confirmed-chart-menu .chart-menu__button__arrow img');
const $dailyConfirmedMenuForm = document.querySelector('#daily-confirmed-chart-menu .chart-menu__form');
const dailyConfirmedFormData = {
    per100K: true,
    ageGroup: 'overSixty',
    limit: '30'
}

//Chart Creation Functions
const dailyConfirmedByVaccinationChart = (xAxis,yAxis,series)=>{
    Highcharts.chart('daily-confirmed-by-vaccination', {
        chart: {
            type: 'line',
            height:249,
            styledMode: true
        },
        title: {
            text: ''
        },
        tooltip:{
            formatter(){
                const getSymbol = (point) =>{
                    return `<span style=color:${point.colorIndex===0?"#90ed7d":
                    (point.colorIndex===1?"#fd8264":"#7cb5ec")};font-size:20px;>●</span>`;
                }
                const getDate = () =>{
                    const date = new Date(this.x);
                    let str = '<span style="font-weight:700;">';
                    str +="יום "
                    switch(date.getDay()){
                        case 0:{
                            str += "א'";
                            break;
                        }
                        case 1:{
                            str += "ב'"
                            break;
                        }
                        case 2:{
                            str += "ג'"
                            break;
                        }
                        case 3:{
                            str += "ד'"
                            break;
                        }
                        case 4:{
                            str += "ה'"
                            break;
                        }
                        case 5:{
                            str += "ו'"
                            break;
                        }
                        case 6:{
                            str += "ש'"
                            break;
                        }
                    }
                    str += ` ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()-2000}`
                    str += "</span><br>"
                    return str;
                }
                let s = '<div style="font-size:14px;text-align:right;line-height:1;">';
                s += getDate()
                this.points.slice().reverse().forEach(function(point){
                    s += `${point.series.name} <strong>${point.y}</strong> ${getSymbol(point)}<br>`
                }) 
                return s + "</div>";   
            },
            shared: true,
            useHTML:true
        },
        xAxis: {
            title:{
                text:'תאריך'
            },
            type:'datetime'
        },
        yAxis: {
            title: {
                text: 'שיעור מאומתים יומי',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -50,
                x:50,
                useHTML: true,
                style:{
                    width: "50px",
                    whiteSpace: 'wrap'
                }
            },
            tickInterval: yAxis[0],      
        },
        series: [{
            pointStart: Date.now() - xAxis,
            pointInterval: 24*60*60*1000,
            name: 'מחוסנים',
            data: series.vaccinated
        },{
            pointStart: Date.now() - xAxis,
            pointInterval: 24*60*60*1000,
            name: 'מחוסנים ללא תוקף',
            data: series.vaccinatedExpired
        },{
            pointStart: Date.now() - xAxis,
            pointInterval: 24*60*60*1000,
            name: 'לא מחוסנים',
            data: series.notVaccinated
        }],
        credits: {
            enabled: false,
        },
        legend:{
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
        }
    });
}
const createDailyConfirmedChart = async (data) =>{
    const dailyConfirmedData = await axios.get(`/data/analysis/daily-confirmed/${""+data.limit}`);
    if(dailyConfirmedData.status===200){
        const yAxis = stepCalculator(getDailyConfirmedMaxValue(dailyConfirmedData.data,data.ageGroup,data.per100K),5);
        const xAxis = data.limit * 24 * 60 * 60 * 1000 //miliseconds in this amount of days
        const series = getDailyConfirmedSeries(dailyConfirmedData.data,data.ageGroup,data.per100K);
        dailyConfirmedByVaccinationChart(xAxis,yAxis,series);
    }
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

//Chart Menu Logic
$dailyConfirmedChartMenu.addEventListener('click',()=>{
    $dailyConfirmedMenuButtonArrow.classList.toggle('rotate');
    $dailyConfirmedMenuForm.classList.toggle('show');
})
$dailyConfirmedChartMenuSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    dailyConfirmedFormData.per100K = document.querySelector('input[name="per100K"]:checked').value === 'true';
    dailyConfirmedFormData.ageGroup = document.querySelector('input[name="ageGroup"]:checked').value;
    dailyConfirmedFormData.limit = document.querySelector('input[name="limit"]:checked').value;
    $dailyConfirmedMenuButtonArrow.classList.toggle('rotate');
    $dailyConfirmedMenuForm.classList.toggle('show');
    createDailyConfirmedChart(dailyConfirmedFormData);
})
$dailyConfirmedChartMenuCancel.addEventListener('click',(e)=>{

})
$radioOptions.forEach((option)=>{
    option.addEventListener('click',()=>{
        option.children[0].checked = true;
    })
})
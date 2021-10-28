const $dailyConfirmedChartMenu = document.querySelector('#daily-confirmed-chart-menu .chart-menu__button');
const $dailyConfirmedChartMenuSubmit = document.querySelector('#daily-confirmed-chart-menu #submit');
const $dailyConfirmedChartMenuCancel = document.querySelector('#daily-confirmed-chart-menu #cancel');
const $radioOptions = document.querySelectorAll('#daily-confirmed-chart-menu .radio-option');
const $dailyConfirmedMenuButtonArrow = document.querySelector('#daily-confirmed-chart-menu .chart-menu__button__arrow img');
const $dailyConfirmedMenuForm = document.querySelector('#daily-confirmed-chart-menu .chart-menu__form');
const $dailyConfirmedChartButtonText = document.querySelector('#daily-confirmed-chart-menu .chart-menu__button__text');
const dailyConfirmedFormData = {
    per100K: true,
    ageGroup: 'overSixty',
    limit: '31'
}

//Chart Creation Functions
const dailyConfirmedByVaccinationChart = (xAxis,yAxis,series)=>{
    
    Highcharts.chart('daily-confirmed-by-vaccination', {
        chart: {
            type: 'line',
            styledMode: true,
            spacing: [90,10,0,20],
            alignTicks: true,
            
        },
        time:{
            useUTC: true,
            timezoneOffset: 120,
        },
        plotOptions:{
            series:{
                lineWidth: 5,
                events:{
                    legendItemClick: function(e){
                        e.preventDefault();
                    },
                },
                stats:{
                    inactive:{
                        opacity:1
                    },
                    hover:{
                        enabled: false,
                    }
                },   
            },
            line:{
                pointStart: Date.parse(new Date(xAxis[0]).toUTCString()),
                pointInterval: 1,
                pointIntervalUnit: 'day',
            }
        },
        title: {
            text: ''
        },
        tooltip:{
            formatter(){
                const getSymbol = (point) =>{
                    return `<span style=color:${point.colorIndex===0?"var(--chart-line-color-0)":
                    (point.colorIndex===1?"var(--chart-line-color-1)":"var(--chart-line-color-2)")};font-size:20px;>●</span>`;
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
                this.points.forEach(function(point){
                    s += `${point.series.name} <strong>${point.y}</strong> ${getSymbol(point)}<br>`
                }) 
                return s + "</div>";   
            },
            shared: true,
            useHTML:true,
            borderRadius: 15
        },
        xAxis: {
            startOnTick: false,
            showFirstLabel: false,
            title:{
                text:'תאריך',
                x:-20
            },
            labels:{
                formatter: function() {
                    const date = new Date(this.pos)
                    let utcDate = UtcConvert(date);
                    this.tick.pos = utcDate;
                    this.pos = utcDate;
                    if(utcDate<UtcConvert(new Date(xAxis[0])))
                        return              
                    return Highcharts.dateFormat('%d.%m',this.value)
                },
            },
            crosshair:{
                width:2,
            } 
        },
        yAxis: {
            title: {
                text: 'שיעור מאומתים יומי',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -50,
                x:10,
                useHTML: true,
                style:{
                    width: "50px",
                    whiteSpace: 'wrap',
                    textAlign:'right'
                },
            },
            // tickInterval: yAxis[0],
            tickAmount: 6,
            allowDecimals: false,
            // endOnTick: yAxis[-1] 
        },
        series: [{
            type: 'line',
            name: 'לא מחוסנים',
            data: series.notVaccinated,
            marker:{
                symbol: 'circle',
                radius: 3
            },
        },{
            name: 'מחוסנים ללא תוקף',
            data: series.vaccinatedExpired,
            marker:{
                symbol: 'circle',
                radius: 3
            }
        },{
            name: 'מחוסנים',
            data: series.vaccinated,
            marker:{
                symbol: 'circle',
                radius: 3
            }
        }],
        credits: {
            enabled: false,
        },
        legend:{
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            y: -85,
            rtl: true,
            itemHoverStyle: {},
            navigation:{
                enabled: false,
            },
        },
        
    })
    // .setSize(undefined,267);
}
const createDailyConfirmedChart = async (data) =>{
    const dailyConfirmedData = await axios.get(`/data/analysis/daily-confirmed/${""+data.limit}`);
    if(dailyConfirmedData.status===200){
        const yAxis = stepCalculator(getDailyConfirmedMaxValue(dailyConfirmedData.data,data.ageGroup,data.per100K),5);
        const xAxis = getArrayOfDates(dailyConfirmedData.data)
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
const setDailyConfirmedChartMenuButtonText = ()=>{
    let s = "";
    if(dailyConfirmedFormData.per100K) s+= "ל-100 אלף תושבים, ";
    else s+= "מספר מוחלט, ";

    if(dailyConfirmedFormData.ageGroup==="overSixty") s+= "מעל גיל 60, ";
    else if(dailyConfirmedFormData.ageGroup==="underSixty") s+= "עד גיל 60, ";
    else s+= "כל האוכלוסיה, ";

    if(dailyConfirmedFormData.limit==="31") s+= "חודש אחרון";
    else if(dailyConfirmedFormData.limit==="92") s+="3 חודשים";
    else if(dailyConfirmedFormData.limit==="183") s+="6 חודשים";
    else if(dailyConfirmedFormData.limit==="365") s+="שנה";
    else s+="עד עכשיו";

    $dailyConfirmedChartButtonText.innerHTML = s;
}
const resetDailyConfirmedChartMenuRadios = ()=>{
    document.getElementById('per100K-'+(dailyConfirmedFormData.per100K?"true":"false")).checked=true;
    document.getElementById('ageGroup-'+ dailyConfirmedFormData.ageGroup).checked=true;
    document.getElementById('limit-'+ dailyConfirmedFormData.limit).checked=true;
}
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
    setDailyConfirmedChartMenuButtonText();
    createDailyConfirmedChart(dailyConfirmedFormData);
})
$dailyConfirmedChartMenuCancel.addEventListener('click',(e)=>{
    resetDailyConfirmedChartMenuRadios();
    $dailyConfirmedMenuButtonArrow.classList.toggle('rotate');
    $dailyConfirmedMenuForm.classList.toggle('show');
})
$radioOptions.forEach((option)=>{
    option.addEventListener('click',()=>{
        option.children[0].checked = true;
    })
})
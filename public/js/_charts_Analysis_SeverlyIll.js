const id = '#severly-ill-chart-menu'
const $severlyIllChartMenuButton = document.querySelector(id+' .chart-menu__button');
const $severlyIllChartMenuButtonText = $severlyIllChartMenuButton.children[0];
const $severlyIllChartMenuButtonArrow = $severlyIllChartMenuButton.children[1].children[0];
const $severlyIllChartMenuForm = document.querySelector(id+' .chart-menu__form');
const $severlyIllChartMenuFormSubmit = document.getElementById('severly-ill-submit');
const $severlyIllChartMenuFormCancel = document.getElementById('severly-ill-cancel');
const $severlyIllRadioOptions = document.querySelectorAll(id+' .radio-option');
const severlyIllData = {
    severeType: 'active',
    per100K: true,
    ageGroup: 'overSixty',
    limit: '31'
}

//Chart Creation Functions
const severlyIllByVaccinationChart = (xAxis,yAxis,series)=>{
    Highcharts.chart('severly-ill-by-vaccination', {
        chart: {
            type: 'line',
            styledMode: true,
            marginBottom: 70,
            spacing: [90,15,90,15]
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
                    const utcDate = UtcConvert(date);
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
                text: 'שיעור חולים קשה פעילים',
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -60,
                x:25,
                useHTML: true,
                style:{
                    width: "50px",
                    whiteSpace: 'wrap',
                    textAlign:'right'
                },
            },
            tickInterval: yAxis[0],
            tickAmount: 6,
            allowDecimals: false,
            endOnTick: yAxis[-1] 
        },
        series: [{
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
        
    }).setSize(undefined,267);
}
const createSeverlyIllByVaccinationChart = async ()=>{
    const JsonData = await axios.get(`/data/analysis/severly-ill/${""+severlyIllData.limit}`);
    if(JsonData.status===200){
        const yAxis = stepCalculator(getSeverlyIllMaxValue(JsonData.data,
                                                               severlyIllData.ageGroup,
                                                               severlyIllData.per100K,
                                                               severlyIllData.severeType),5);
        const xAxis = getArrayOfDates(JsonData.data)
        const series = getSeverlyIllSeries(JsonData.data,
                                           severlyIllData.ageGroup,
                                           severlyIllData.per100K,
                                           severlyIllData.severeType);
        severlyIllByVaccinationChart(xAxis,yAxis,series);
    }
}

//Chart Data Utillity functions
const getSeverlyIllSeries = (data,ageGroup,per100K,severeType) =>{
    const series = {};
    series.vaccinated = [];
    series.vaccinatedExpired = [];
    series.notVaccinated = [];
    data.forEach((day)=>{
        const dataByAgeGroup = day[ageGroup];
        if(per100K){
            if(severeType==='new'){
                series.vaccinated.push(dataByAgeGroup.vaccinatedNewPer100K);
                series.vaccinatedExpired.push(dataByAgeGroup.vaccinatedExpiredNewPer100K);
                series.notVaccinated.push(dataByAgeGroup.nonVaccinatedNewPer100K);
            }
            else{
                series.vaccinated.push(dataByAgeGroup.vaccinatedPer100K);
                series.vaccinatedExpired.push(dataByAgeGroup.vaccinatedExpiredPer100K);
                series.notVaccinated.push(dataByAgeGroup.nonVaccinatedPer100K);
            }
        }
        else{
            if(severeType==='new'){
                series.vaccinated.push(dataByAgeGroup.vaccinatedNew);
                series.vaccinatedExpired.push(dataByAgeGroup.vaccinatedExpiredNew);
                series.notVaccinated.push(dataByAgeGroup.nonVaccinatedNew);
            }
            else{
                series.vaccinated.push(dataByAgeGroup.vaccinated);
                series.vaccinatedExpired.push(dataByAgeGroup.vaccinatedExpired);
                series.notVaccinated.push(dataByAgeGroup.nonVaccinated);
            }
        }
    })
    return series;
}
const getSeverlyIllMaxValue = (data,ageGroup,per100K,severeType) =>{
    let max = 0;
    data.forEach((day)=>{ 
        dataForAgeGroup = day[ageGroup];
        for(let key of Object.keys(dataForAgeGroup)){
            if(per100K&&key.includes('Per100K')){
                if(severeType==='new'&&key.includes('New'))
                    max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];
                if(severeType==='active'&&!key.includes('New'))
                    max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];
            }
            if(!per100K&&!key.includes('Per100K')){
                if(severeType==='new'&&key.includes('New'))
                    max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];
                if(severeType==='active'&&!key.includes('New'))
                    max = max>dataForAgeGroup[key]?max:dataForAgeGroup[key];
            }
        }
    })
    return max;
}


//Chart Menu Functionality
const setSeverlyIllMenuButtonText = ()=>{
    let s = "";
    if(severlyIllData.severeType==='new') s+='חולים קשה - חדשים, ';
    else s+='חולים קשה - פעילים, ';

    if(severlyIllData.per100K) s+='ל-100 אלף תושבים, ';
    else s+='מספר מוחלט, ';

    if(severlyIllData.ageGroup==="overSixty") s+= "מעל גיל 60, ";
    else if(severlyIllData.ageGroup==="underSixty") s+= "עד גיל 60, ";
    else s+= "כל האוכלוסיה, ";

    if(severlyIllData.limit==="31") s+= "חודש אחרון";
    else if(severlyIllData.limit==="92") s+="3 חודשים";
    else if(severlyIllData.limit==="183") s+="6 חודשים";
    else if(severlyIllData.limit==="365") s+="שנה";
    else s+="עד עכשיו";

    $severlyIllChartMenuButtonText.innerHTML = s;
}
const resetSeverlyIllMenuFormRadioButton = ()=>{
    document.getElementById('severly-ill-per100K-'+(severlyIllData.per100K?"true":"false")).checked=true;
    document.getElementById('severly-ill-ageGroup-'+ severlyIllData.ageGroup).checked=true;
    document.getElementById('severly-ill-limit-'+ severlyIllData.limit).checked=true;
    document.getElementById('severly-ill-severeType-'+ severlyIllData.severeType).checked=true;
}
$severlyIllChartMenuButton.addEventListener('click',()=>{
    $severlyIllChartMenuButtonArrow.classList.toggle('rotate')
    $severlyIllChartMenuForm.classList.toggle('show');
})
$severlyIllRadioOptions.forEach((option)=>{
    option.addEventListener('click',()=>{
        option.children[0].checked = true;
    })
})
$severlyIllChartMenuFormSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    severlyIllData.limit = document.querySelector('input[name="severly-ill-limit"]:checked').value;
    severlyIllData.per100K = document.querySelector('input[name="severly-ill-per100K"]:checked').value === 'true';
    severlyIllData.ageGroup = document.querySelector('input[name="severly-ill-ageGroup"]:checked').value;
    severlyIllData.severeType = document.querySelector('input[name="severly-ill-severeType"]:checked').value;
    $severlyIllChartMenuButtonArrow.classList.toggle('rotate')
    $severlyIllChartMenuForm.classList.toggle('show');
    setSeverlyIllMenuButtonText();
    createSeverlyIllByVaccinationChart();
})
$severlyIllChartMenuFormCancel.addEventListener('click',(e)=>{
    e.preventDefault();
    $severlyIllChartMenuButtonArrow.classList.toggle('rotate')
    $severlyIllChartMenuForm.classList.toggle('show');
    resetSeverlyIllMenuFormRadioButton();
})


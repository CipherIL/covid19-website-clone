const activelyIllDataOptions = {illType: 'active',per100K: true}
const $activelyIllChartMenuButton = document.querySelector('#actively-ill-chart-menu .chart-menu__button');
const $activelyIllChartMenuButtonArrow = $activelyIllChartMenuButton.children[1].children[0];
const $activelyIllChartMenuForm = document.querySelector('#actively-ill-chart-menu .chart-menu__form');
const $activelyIllChartMenuRadioOptions = document.querySelectorAll('#actively-ill-chart-menu .radio-option');
const $activelyIllChartMenuFormSubmit = document.getElementById('actively-ill-submit');
const $activelyIllChartMenuFormCancel = document.getElementById('actively-ill-cancel');

//Chart Creation Functions
const activelyIllByVaccinationChart = (parsedData,yAxisInterval)=>{ 
    Highcharts.chart('actively-ill-by-vaccination', {
        chart: {
            type: 'column',
            styledMode: true,
            spacing: [90,10,0,20]
        },
        title: {
            text: ''
        },
        plotOptions:{
            series:{
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
            column:{
                groupPadding: 0.2,
                pointPadding: 0,
                borderWidth: 0,
            }
        },
        xAxis:{
            title:{
                text: 'קבוצת גיל'
            },
            crosshair:{
                className: 'actively-ill-chart-crosshair',
            }
        },
        yAxis: {
            title: {
                text: ('שיעור חולים ' + (activelyIllDataOptions.illType==='active'?'פעילים':'קשה')),
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
            tickAmount: 5,
        },
        tooltip:{
            formatter(){
                const getSymbol = (point) =>{
                    return `<span style=color:${point.colorIndex===0?"var(--chart-line-color-0)":
                    (point.colorIndex===1?"var(--chart-line-color-1)":"var(--chart-line-color-2)")};font-size:20px;>●</span>`;
                }
                let s = '<div style="font-size:14px;text-align:right;line-height:1;">';
                s += '<span style="font-weight:700;">'+ this.points[0].key + "</span><br>";
                this.points.forEach(function(point){
                    s += `${point.series.name} <strong>${point.y}</strong> ${getSymbol(point)}<br>`
                }) 
                return s + "</div>";   
            },
            shared: true,
            useHTML:true,
            borderRadius: 15
        },
        data: {
            columns: parsedData
        },
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
    // .setSize(undefined,300);
}

const parseActivelyIllData = (data)=>{
    const categories = [null];
    const bar1 = ['לא מחוסנים'];
    const bar2 = ['מחוסנים ללא תוקף'];
    const bar3 = ['מחוסנים'];
    data.forEach((ageGroup)=>{
        categories.push(ageGroup.ageGroup);
        // console.log(categories)
        if(activelyIllDataOptions.per100K){
            if(activelyIllDataOptions.illType==='active'){
                bar1.push(ageGroup.nonVaccinatedActivePer100K);
                bar2.push(ageGroup.vaccinatedExpiredActivePer100K);
                bar3.push(ageGroup.vaccinatedActivePer100K);
            }
            else{
                bar1.push(ageGroup.nonVaccinatedSeverePer100K);
                bar2.push(ageGroup.vaccinatedExpiredSeverePer100K);
                bar3.push(ageGroup.vaccinatedSeverePer100K);
            }
        }
        else{
            if(activelyIllDataOptions.illType==='active'){
                bar1.push(ageGroup.nonVaccinatedActive);
                bar2.push(ageGroup.vaccinatedExpiredActive);
                bar3.push(ageGroup.vaccinatedActive);
            }
            else{
                bar1.push(ageGroup.nonVaccinatedSevere);
                bar2.push(ageGroup.vaccinatedExpiredSevere);
                bar3.push(ageGroup.vaccinatedSevere);
            }
        }
    })
    return [categories,bar1,bar2,bar3];
}

const createActivelyIllByVaccinationChart = async () =>{
    const response = await axios.get(`/data/analysis/actively-ill`);
    if(response.status===200){
        const activelyIllData = response.data;
        const parsedData = parseActivelyIllData(activelyIllData);
        activelyIllByVaccinationChart(parsedData);
    }
}

//Chart menu control
////Chart menu Button behaviour
$activelyIllChartMenuButton.addEventListener('click',()=>{
    $activelyIllChartMenuForm.classList.toggle('show');
    $activelyIllChartMenuButtonArrow.classList.toggle('rotate');
})
////Radio options behaviour
$activelyIllChartMenuRadioOptions.forEach((option)=>{
    option.addEventListener('click',()=>{
        option.children[0].checked = true;
    })
})
////Chart menu submit and cancel button behaviours
$activelyIllChartMenuFormSubmit.addEventListener('click',()=>{
    activelyIllDataOptions.illType = document.querySelector('input[name="actively-ill-illType"]:checked').value;
    activelyIllDataOptions.per100K = document.querySelector('input[name="actively-ill-per100K"]:checked').value==='true';
    createActivelyIllByVaccinationChart();
    $activelyIllChartMenuForm.classList.toggle('show');
    $activelyIllChartMenuButtonArrow.classList.toggle('rotate');
})
$activelyIllChartMenuFormCancel.addEventListener('click',()=>{
    document.getElementById('actively-ill-per100K-'+(activelyIllDataOptions.per100K?"true":"false")).checked=true;
    document.getElementById('actively-ill-illType-'+(activelyIllDataOptions.illType)).checked=true;
    $activelyIllChartMenuForm.classList.toggle('show');
    $activelyIllChartMenuButtonArrow.classList.toggle('rotate');
})
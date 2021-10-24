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
            title:{
                text:'תאריך',
                x:-20
            },
            type: 'category',
            categories: xAxis,
            labels:{
                formatter: function() {
                    if(this.isLast) return
                    const date = new Date(this.value)
                    return `${('0'+date.getDate()).slice(-2)}.${('0'+(date.getMonth()+1)).slice(-2)}`;
                },
                step: Math.floor((xAxis.length/15)),
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
                y: -50,
                x:10,
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

const createSeverlyIllByVaccinationChart = async (data)=>{
    const JsonData = await axios.get(`/data/analysis/severly-ill/${""+data.limit}`);
    if(JsonData.status===200){
        const yAxis = stepCalculator(getDailyConfirmedMaxValue(JsonData.data,data.ageGroup,data.per100K),5);
        const xAxis = getArrayOfDates(JsonData.data)
        const series = getDailyConfirmedSeries(JsonData.data,data.ageGroup,data.per100K);
        dailyConfirmedByVaccinationChart(xAxis,yAxis,series);
        severlyIllByVaccinationChart(xAxis,yAxis,series);
    }
}


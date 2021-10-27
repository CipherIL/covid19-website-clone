const activelyIllDataOptions = {
    illType: 'active',
    per100K: true,
}

//Chart Creation Functions
const activelyIllByVaccinationChart = (parsedData)=>{ 
    Highcharts.chart('actively-ill-by-vaccination', {
        chart: {
            type: 'column',
            height:334,
            styledMode: true
        },
        title: {
            text: ''
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        data: {
            columns: parsedData
        },
        credits: {
            enabled: false,
        },
    }).setSize(undefined,267);
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
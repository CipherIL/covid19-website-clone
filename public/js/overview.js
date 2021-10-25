const $firstVaccineText = document.getElementById('first-vaccine');
const $secondVaccineText = document.getElementById('second-vaccine');
const $thirdVaccineText = document.getElementById('third-vaccine');


const formatNumberWithCommas = (num)=>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const loadOverviewData = async () =>{
    let overviewData = await axios.get('/data/overview');
    if(overviewData.status===200){
        overviewData = overviewData.data;
        console.log(overviewData)
        $firstVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.first) 
        $secondVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.second)
        $thirdVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.third)
    }
}

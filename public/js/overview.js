const $firstVaccineText = document.getElementById('first-vaccine');
const $secondVaccineText = document.getElementById('second-vaccine');
const $thirdVaccineText = document.getElementById('third-vaccine');
const $overallDeadText = document.querySelector('#overview__dead .overview-data-item__data');
const $confirmedYesterdayText = document.getElementById('overview__confirmed-yesterday');
const $confirmedTodayText = document.getElementById('overview__confirmed-today');
const $confirmedOverallText = document.getElementById('overview__confirmed-overall');
const $confirmedPrecentageText = document.getElementById('overview__confirmed-precentage-precent');
const $virusTestsText = document.getElementById('overview__confirmed-precentage-virus-tests');
const $overallTestsText = document.getElementById('overview__confirmed-precentage-overall-tests');
const $activeIllYesterdayText = document.getElementById('overview__active-ill-yesterday');
const $activeIllDifferenceText = document.getElementById('overview__active-difference');
const $lightIllText = document.getElementById('overview__light-ill');
const $mediumIllText = document.getElementById('overview__medium-ill');
const $severeIllText = document.getElementById('overview__severe-ill');

const formatNumberWithCommas = (num)=>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const loadOverviewData = async () =>{
    let overviewData = await axios.get('/data/overview');
    if(overviewData.status===200){
        overviewData = overviewData.data;
        $firstVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.first) 
        $secondVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.second)
        $thirdVaccineText.innerHTML = formatNumberWithCommas(overviewData.vaccinations.third)
        $overallDeadText.innerHTML = formatNumberWithCommas(overviewData.overallDead);
        $confirmedYesterdayText.innerHTML = formatNumberWithCommas(overviewData.confirmed.yesterday);
        $confirmedTodayText.innerHTML = formatNumberWithCommas(overviewData.confirmed.today);
        $confirmedOverallText.innerHTML = formatNumberWithCommas(overviewData.confirmed.overall);
        $confirmedPrecentageText.innerHTML = overviewData.confirmedPrecentage.precentage+"%";
        $virusTestsText.innerHTML = formatNumberWithCommas(overviewData.confirmedPrecentage.virusTests);
        $overallTestsText.innerHTML = formatNumberWithCommas(overviewData.confirmedPrecentage.overallTests);
        $activeIllYesterdayText.innerHTML = formatNumberWithCommas(overviewData.activeIll.activeYesterday);
        $activeIllDifferenceText.innerHTML = formatNumberWithCommas(overviewData.activeIll.activeToday-overviewData.activeIll.activeYesterday);
        $lightIllText.innerHTML = formatNumberWithCommas(overviewData.illnessRanks.light);
        $mediumIllText.innerHTML = formatNumberWithCommas(overviewData.illnessRanks.medium);
        $severeIllText.innerHTML = formatNumberWithCommas(overviewData.illnessRanks.severe);
    }
}

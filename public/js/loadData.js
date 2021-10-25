document.addEventListener('DOMContentLoaded', async function () {
    //load overview
    loadOverviewData();

    //(int/string limit=int/'all', string ageGroup='overSixty'/'underSixty'/'general',bool per100K)
    createDailyConfirmedChart({limit:"31",ageGroup:'overSixty',per100K:true});
    createSeverlyIllByVaccinationChart();
    createActivelyIllByVaccinationChart();

});
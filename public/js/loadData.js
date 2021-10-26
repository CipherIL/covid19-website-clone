document.addEventListener('DOMContentLoaded', async function () {
    //load overview
    await loadOverviewData();

    //(int/string limit=int/'all', string ageGroup='overSixty'/'underSixty'/'general',bool per100K)
    await createDailyConfirmedChart({limit:"31",ageGroup:'overSixty',per100K:true});
    await createSeverlyIllByVaccinationChart();
    await createActivelyIllByVaccinationChart();
    await loadTableData();
});
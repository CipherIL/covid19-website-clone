
//General Utillity Functions
const stepCalculator = (num,stepsAmount) => {
    let i = 0;
    while(num>10){
        num /= 10;
        i++;
    }
    num = Math.ceil(num);
    num *= Math.pow(10,i);
    num/= stepsAmount;
    const result = [];
    for(i=1;i<=stepsAmount;i++) result.push((num*i));
    return result;
}
const getArrayOfDates = (days)=>{
    const dates = [];
    days.forEach((day)=>{
        const date = day.date.split('-');
        dates.push(date[2]+"/"+date[1]+"/"+date[0]);
    })
    return dates;    
}
const UtcConvert = (date) =>{
    let utcDate = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),
                    0,0,0,0);
    utcDate -= 27*60*60*1000;
    return utcDate
}
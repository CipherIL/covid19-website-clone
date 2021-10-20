const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');

const dailyConfirmedPath = path.join(__dirname + "/../data/dailyConfirmed.json")

router.get('/data/analysis/daily-confirmed/:limit',(req,res)=>{
    let limit = req.params.limit;
    const dailyConfirmedData = JSON.parse(fs.readFileSync(dailyConfirmedPath));
    console.log(limit);
    if(limit==='all'){
        return res.status(200).send(dailyConfirmedData)
    }

    limit = parseInt(limit);
    console.log(limit)
    
    if(limit>=dailyConfirmedData.length){
        console.log("Test1")
        return res.status(200).send(dailyConfirmedData);
    }
    if(limit<dailyConfirmedData.length){
        console.log("test2")
        const lastN = dailyConfirmedData.slice(-1*limit);
        return res.status(200).send(lastN);
    }
    return res.status(400).send({
        status: 400,
        message: "Not valid limit"
    })   
})

module.exports = router;
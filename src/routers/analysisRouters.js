const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');

const dailyConfirmedPath = path.join(__dirname + "/../data/dailyConfirmed.json")
const severlyIllPath = path.join(__dirname + "/../data/severlyIll.json")


router.get('/data/analysis/daily-confirmed/:limit',(req,res)=>{
    let limit = req.params.limit;
    const dailyConfirmedData = JSON.parse(fs.readFileSync(dailyConfirmedPath));
    if(limit==='all'){
        return res.status(200).send(dailyConfirmedData)
    }

    limit = parseInt(limit);
    
    if(limit>=dailyConfirmedData.length){
        return res.status(200).send(dailyConfirmedData);
    }
    if(limit<dailyConfirmedData.length){
        const lastN = dailyConfirmedData.slice(-1*limit);
        return res.status(200).send(lastN);
    }
    return res.status(400).send({
        status: 400,
        message: "Not valid limit"
    })   
})

router.get('/data/analysis/severly-ill/:limit',(req,res)=>{
    let limit = req.params.limit;
    const severlyIllData = JSON.parse(fs.readFileSync(severlyIllPath));
    if(limit==='all'){
        return res.status(200).send(severlyIllData)
    }

    limit = parseInt(limit);
    
    if(limit>=severlyIllData.length){
        return res.status(200).send(severlyIllData);
    }
    if(limit<severlyIllData.length){
        const lastN = severlyIllData.slice(-1*limit);
        return res.status(200).send(lastN);
    }
    return res.status(400).send({
        status: 400,
        message: "Not valid limit"
    })   
})

module.exports = router;
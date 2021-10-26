const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');

const trafficLightFilePath = path.join(__dirname,'/../data/trafficLight.json')

router.get('/data/traffic-light', async (req,res)=>{
    const trafficeLightData = fs.readFileSync(trafficLightFilePath);
    res.send(trafficeLightData)
})

module.exports = router;
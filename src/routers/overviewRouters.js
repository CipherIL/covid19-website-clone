const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');

const overviewPath = path.join(__dirname + "/../data/overview.json")

router.get('/data/overview', async (req,res)=>{
    const overviewData = JSON.parse(fs.readFileSync(overviewPath));
    res.send(overviewData)
})

module.exports = router;
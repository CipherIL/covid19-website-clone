const express = require('express');
const router = express.Router();
const Overview = require('../models/overview');

router.post('/data/overview/new', async (req,res)=>{
    const data = req.body;
    console.log(data);
    try{
        const overview = await new Overview(data);
        await overview.save();
        console.log(overview);
        res.send();
    }catch(err){
        if(err.code === 11000){
            res.status(400).send({
                status: 400,
                message: "An entry with this date already exists"
            })
        }
        res.status(500).send(err);
    }
})


module.exports = router;
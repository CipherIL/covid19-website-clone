const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    console.log('page get request detected');
    res.render('index');
})

module.exports = router;
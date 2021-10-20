const mongoose = require('mongoose');

const overviewSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
        unique: true
    },
    data:{}
})

overviewSchema.pre('validate', function(next) {
    if(this.isModified('date')){
        this.date = new Date(this.date);
    }
    next();
})

const Overview = mongoose.model('Overview',overviewSchema);

module.exports = Overview;
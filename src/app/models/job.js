const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },
    dateJob: {
        type: Date,
        reuqired: true,
    },
    hourJob: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,

    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;

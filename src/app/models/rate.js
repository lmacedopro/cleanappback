const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({

    ratedUser: {

    },
    rank: {

    },
    comment:{

    },
    appraiser: {

    },
    createdAt:{

    }
});

const User = mongoose.model('Rate', RateSchema);

//module.exports = Rate;
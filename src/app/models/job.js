const mongoose = require('../../database');


const JobSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },
    jobDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    jobBasePrice: { //Preço sugerido pelo usuario que publica o job
        type: String,
        required: true,

    },
    jobPaidPrice:{ //Preço efetivamente pago pelo usuario que publica o job
        type: String,
        required: true,
        default: "0",
    },
    /*jobLocation: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },*/
    publisher: {  //Usuario que publicou o job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobStatus: { // Status "publicado" - aparece na busca; "fechado" - Alguém aceitou, não aprece na busca.
        type: String,
        required: true,
        default: 'Publicado',
    },
    /*jobProposal: [{//Lista de propostas vinculadas ao job, feitas por prestadores.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
    }],
    /*messages:{ //Lista de mensagens trocadas neste job.

    },*/
    jobComplete: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;

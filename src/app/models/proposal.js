const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    offerPrice:{ //Contra-proposta de preço para o serviço publicado
        type: String,
        required: true,
    },
    provider: { //Usuario que interessado em prestar o serviço
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{ //Lista de mensagens trocadas nesta proposta.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TextMessage',
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;

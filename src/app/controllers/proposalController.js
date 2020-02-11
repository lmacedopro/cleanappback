const Proposal = require('../models/proposal');
const Job = require('../models/job');
const User = require('../models/user');

module.exports = {
    
    /*async index(req, res){
        const { page = 1 } = req.query; //controla o parametro de paginação por get
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },*/

    index(req, res){

        res.send({ ok: true, user: req.userId });
    },

    async store(req, res){

        try{

            //procurao job pelo id e adiciona o id a porposta
            const findjob = await Job.findOne({_id: req.body.job});

            //insere a proposta no banco
            const proposal = await Proposal.create({...req.body, provider: req.userId, job: findjob.id});

            //vincula a proposta ao job
            await Job.findByIdAndUpdate(findjob.id, { $push: {jobProposal: proposal } }, {new: true});

            return res.send(proposal);

        }catch(err){
            
            return res.status(400).send({error: 'Cannot store proposal!'});
        }
    },

    async destroy(req, res){

        //verificar se o usuario autenticado é o mesmo que está excluindo
        //verificar se a data de criação do registro é menor que os 15 minutos posteriores;
        /*await Job.findByIdAndRemove(req.params.id);

        return res.send();*/
    },

    async show(req, res){
        try{

            const proposal = await Proposal.findById(req.params.propId).populate(['job','provider']);

            return res.send({ proposal });

        }catch(err){
            return res.status(400).send({error: "Cannot List proposal!"});
        }
    },
};
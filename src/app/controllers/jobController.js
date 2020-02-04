const Job = require('../models/job');

module.exports = {
    
    /*async index(req, res){
        const { page = 1 } = req.query; //controla o parametro de paginação por get
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },*/

    index(req, res){

        res.send({ ok: true, user: req.userId });
    },

    async list(req, res){

        try{
            //filtra todos os jobs pelo usuário que publicou
            const jobs = await Job.find({publisher: req.userId}).populate('publisher');

            return res.send({ jobs });

        }catch(err){
            return res.status(400).send({error: "Cannot List jobs!"});
        }
    },

    async show(req, res){

        try{

            const job = await Job.findById(req.params.jobId).find({publisher: req.userId}).populate('publisher');

            return res.send({ job });

        }catch(err){
            return res.status(400).send({error: "Cannot List job!"});
        }
    },

    async store(req, res){

        try{
            const job = await Job.create({...req.body, publisher: req.userId});

            return res.send(job);

        }catch(err){
            return res.status(400).send({error: "Cannot create the job!"});
        }
    },

    async destroy(req, res){

        try{

            await Job.findByIdAndRemove(req.params.jobId);
            return res.send();

        }catch(err){

            return res.status(400).send({error: "Cannot delete the job!"});
        }
        

        
    },
};
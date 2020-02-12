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

    async listmyjobs(req, res){ //Lista os jobs publicados pelo usuario

        try{
            const jobs = await Job.find({publisher: req.userId}).populate(['publisher','jobProposal']);

            return res.send({ jobs });

        }catch(err){
            return res.status(400).send({error: "Cannot List jobs!"});
        }
    },

    async list(req, res){ //Lista todos jobs publicados por outros usuarios 

        try{

            const jobs = await Job.find({publisher: { $ne: req.userId} }).populate(['publisher','jobProposal']);

            return res.send({ jobs });
        }catch(err){

            return res.status(400).send({error: "Cannot List jobs!"});
        }
    },

    async show(req, res){

        try{

            const job = await Job.findById(req.params.jobId).populate(['publisher','jobProposal']);

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

            const job = await Job.findById(req.params.jobId).populate('publisher');
            const publisher = job.publisher.id;
            const user = req.userId;

            if(user !== publisher)
                return res.status(400).send({error: "The User must be same the Job publisher to delete the Job!"});
            
            
            await Job.findByIdAndRemove(req.params.jobId);
            //console.log({publisher, user});
            return res.send();

        }catch(err){

            return res.status(400).send({error: "Cannot delete the job!"});
        }
        

        
    },
};
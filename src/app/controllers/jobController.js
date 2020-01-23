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

    async store(req, res){

        try{
            const job = await Job.create({...req.body, publisher: req.userId});

            return res.send(job);

        }catch(err){
            return res.status(400).send({err});
        }
    },

    async destroy(req, res){

        //verificar se o usuario autenticado é o mesmo que está excluindo
        //verificar se a data de criação do registro é menor que os 15 minutos posteriores;
        await Job.findByIdAndRemove(req.params.id);

        return res.send();
    },

    async show(req, res){
        const job = await Job.findById(req.params.id);

        return res.json(job);
    },
};
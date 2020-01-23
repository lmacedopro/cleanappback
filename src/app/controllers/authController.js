const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const authConfig = require('../../config/auth');

function generateToken(params = {}){
    
    return jwt.sign(params, authConfig.secret, {

        expiresIn: 86400,
     });
}

module.exports = {
    
    /*async index(req, res){
        const { page = 1 } = req.query; //controla o parametro de paginação por get
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },*/

    async register(req, res){

        const { email } = req.body;
        
        try{
            if(await User.findOne({ email }))
                return res.status(400).send({ error: "User already exists!" });

            const user = await User.create(req.body);

            //retira o password do objeto parateronar o json
            user.password = undefined;
    
            return res.send({ 
                user,
                token: generateToken({ id: user.id })
            });
    
        }catch( err ){

            return res.status(400).send({ error: "Registration failed!"});
        }

    },

    async authenticate(req, res){

        const { email, password } = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user)
            return res.status(400).send({error: "User not found!"});

        if(!await bcrypt.compare( password, user.password ))
            return res.status(400).send({ error: "Invalid password!"});

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id })
        });
    },
};
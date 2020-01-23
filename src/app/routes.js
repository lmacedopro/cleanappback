const express = require ('express');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

//routes.use(authMiddleware);

//Importando controllers
const authController = require('./controllers/authController');
const rateController = require('./controllers/rateController');

//Rotas da API
routes.post('/auth/register', authController.register );
routes.post('/authenticate', authController.authenticate );
routes.get('/rate', authMiddleware, rateController.index);
//routes.post('/products', ProductController.store );
//routes.get('/products/:id', ProductController.show );
//routes.put('/products/:id', ProductController.update );
//routes.delete('/products/:id', ProductController.destroy );

module.exports = routes;
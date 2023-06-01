import express from 'express';

const UsersController = require('../controllers/UsersController');
const Appcontroller = require('../controllers/AppController');

const routes = express.Router();

routes.get('/status', Appcontroller.getStatus);
routes.get('/stats', Appcontroller.getStats);
routes.post('/users', UsersController.postNew);

export default routes;

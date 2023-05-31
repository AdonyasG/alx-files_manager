import express from 'express';
import AppController from '../controllers/UsersController';

const app = express();

app.get('/status', AppController.getStatus);
app.get('/stats', AppController.getStats);
app.post('/users', AppController.postNew);

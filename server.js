import express from 'express';
import routes from './routes/index';

const port = 5000;

const app = express();

app.use(express.json());

app.get('/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;

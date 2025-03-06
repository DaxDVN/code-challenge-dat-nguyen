import express from 'express';

import dotenv from "dotenv";
import connectDatabase from './config/database';
import theaterRouters from './routes/theater.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/theaters", theaterRouters);

const PORT = process.env.PORT || 8080;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('start listening on port ' + PORT);
  });
});
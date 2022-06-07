import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';

import router from './routes/index.js';

dotenv.config({ path: './config/.env' });

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.bgGreen.bold(`Server is open and running on PORT ${port}`));
});

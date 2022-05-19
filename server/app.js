import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { connectDB } from './database/database.js';
import {csrfCheck} from './middleware/csrf.js'
const app = express();

const corsOption={
  optionssuccessStatus:200,
  Credential:true
}

app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

app.use(csrfCheck);

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
.then((db)=>{
  console.log('db init');
  const server = app.listen(config.host.port);
  initSocket(server);
})
.catch(console.error)

import express from 'express';
import cors from 'cors';
import config from './config/config';
import { bookRouter } from './app/routes/route';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));
  
app.use(express.json());

app.use('/api', bookRouter)

const port = config.port

app.listen(port,()=>{
    console.log(`server connected to port ${port}`);
})
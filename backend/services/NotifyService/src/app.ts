import express from 'express';
import notifyRoutes from './api/routes/notify.route';
import cors from 'cors';
import helmet from 'helmet';




const app = express();


app.use(express.json());    //Apply Middleware

app.use(cors());          //Apply Cross-Origin Resource Sharing

app.use(helmet());      //Apply Security Headers



app.use('/api/v1/notify', notifyRoutes);

export default app;
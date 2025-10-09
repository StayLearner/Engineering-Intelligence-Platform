import express from 'express';
import authRoutes from './api/routes/auth.route';
import cors from 'cors';
import helmet from 'helmet';



// Create The App 
const app = express();


app.use(express.json());    //Apply Middleware

app.use(cors());          //Apply Cross-Origin Resource Sharing

app.use(helmet());      //Apply Security Headers



app.use('/api/v1/auth', authRoutes);

export default app;
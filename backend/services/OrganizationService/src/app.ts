import express from 'express';
import orgRoutes from './api/routes/org.route';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';



// Create The App 
const app = express();

app.use(cookieParser());  //Parse Cookies

app.use(express.json());    //Apply Middleware

app.use(cors());          //Apply Cross-Origin Resource Sharing

app.use(helmet());      //Apply Security Headers



app.use('/api/v1/org', orgRoutes);

export default app;
import express from 'express';
import { getHealthController } from '../../controllers/auth.controller';




const router = express.Router();


router.get('/', getHealthController);


export default router;



import express, { Request, Response } from 'express';
import { getHealthController } from '../../controllers/repo.controller';




const router = express.Router();


router.get('/health', getHealthController);






export default router;
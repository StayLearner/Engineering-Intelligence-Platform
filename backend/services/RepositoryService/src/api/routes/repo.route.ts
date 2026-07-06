import express, { Request, Response } from 'express';
import { createRepositoryController, getHealthController } from '../../controllers/repo.controller';
import { requireAuth } from '../../middlewares/requireAuth';
import { validate } from "@engineering/shared";
import { createRepositoryInput } from '../validators/repo.validator';



const router = express.Router();


router.get('/health', getHealthController);
router.post("create-repo",requireAuth,validate(createRepositoryInput),createRepositoryController);





export default router;
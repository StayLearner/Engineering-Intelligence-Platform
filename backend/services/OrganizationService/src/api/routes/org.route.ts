import express, { Request, Response } from 'express';
import { createOrganizationController, getHealthController, getOrganizationsController, getSingleOrganizationController } from '../../controllers/org.controller';
import { createOrganizationValidator } from '../validators/org.validator';
import { validate } from "@engineering/shared";
import { requireAuth } from '../../middlewares/requireAuth';



const router = express.Router();


router.get('/health', getHealthController);
router.post('/create-org',requireAuth, validate(createOrganizationValidator), createOrganizationController);
router.get('/organizations',requireAuth,getOrganizationsController);
router.get('/organizations/:organizationId',requireAuth,getSingleOrganizationController);






export default router;
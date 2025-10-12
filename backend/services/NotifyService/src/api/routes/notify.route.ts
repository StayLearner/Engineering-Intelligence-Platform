import express  from "express";
import { getHealthController } from "../../controllers/email.controller";




const router = express.Router();

router.get('/', getHealthController);


export default router;
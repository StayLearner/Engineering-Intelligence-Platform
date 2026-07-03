import { Request, Response } from "express";
import { getHealthStatus } from "../services/org.service";




export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};

import { Request, Response } from "express";
import { createOrganization, getHealthStatus } from "../services/org.service";
import { createOrganizationInput } from "../api/validators/org.validator";




export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};



export const createOrganizationController = async (req: Request<{},{},createOrganizationInput>, res: Response) => {
    try {
        const { name, description } = req.body;
        const userId = (req as any).user.id;
        const result = await createOrganization({ name, description, userId });
        return res.status(201).json({message:"Organization Created successfully"});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
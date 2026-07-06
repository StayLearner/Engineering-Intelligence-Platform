import { Request, Response } from "express";
import { createOrganization, getHealthStatus, getOrganizations } from "../services/org.service";
import { createOrganizationInput } from "../api/validators/org.validator";




export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};



export const createOrganizationController = async (req: Request<{},{},createOrganizationInput>, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const result = await createOrganization({ name, description, userId });
        return res.status(201).json({message:"Organization Created successfully",result});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


export const getOrganizationsController = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const organizations= await getOrganizations(userId);

        return res.status(200).json({message:"Fetched All Organizations", organizations});
    } catch (error: any) {
       res.status(500).json({ error: error.message });
    }
}
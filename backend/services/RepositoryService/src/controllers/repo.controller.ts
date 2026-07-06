import { Request, Response } from "express";
import { createRepository, getHealthStatus, getRepositories } from "../services/repo.service";
import { CreateRepositoryInput } from "../api/validators/repo.validator";



export const getHealthController = (req: Request, res: Response) => {
    const healthStatus = getHealthStatus();
    res.status(200).json(healthStatus);
};




export const createRepositoryController = async (req: Request<{},{},CreateRepositoryInput>, res: Response) => {
    try {
        const {organizationId,name,owner,githubUrl,description} = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;
        const result = await createRepository({ organizationId,name,owner,githubUrl,description }, userId);
        return res.status(201).json({message:"Repository Created successfully", result});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}





export const getRepositoriesController = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userId = req.user.id;
        const organizationId = req.query.organizationId as string;

        const repositories = await getRepositories(
            organizationId,
            userId
        );

        return res.status(200).json({
            message: "Repositories fetched successfully",
            repositories,
        });
    } catch (error: any) {
        if (error.message === "Organization not found") {
            return res.status(404).json({
                message: error.message,
            });
        }

        if (
            error.message ===
            "You are not a member of this organization"
        ) {
            return res.status(403).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: error.message,
        });
    }
};


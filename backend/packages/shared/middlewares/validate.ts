import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate =
    (schema: ZodObject<any>) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        error: error.issues,
                        // message: error.message,
                        path: error.type,
                    });
                }

                return res.status(500).json({ message: 'Internal Server Error' });
            }
        };

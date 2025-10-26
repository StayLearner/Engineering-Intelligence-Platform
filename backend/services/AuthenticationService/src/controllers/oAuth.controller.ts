import { Request, Response } from 'express';
import { githubOAuthCallbackService } from '../services/oAuth.service';



export const githubOAuthCallbackController = async (req: Request, res: Response) => {

    const code = req.query.code as string;

    if (!code) return res.status(400).json({ message: "Code not found" });

    try {
        const result = await githubOAuthCallbackService(code);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',    // Helps prevent CSRF attacks 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json({
            message: "GitHub login successful",
            accessToken: result.accessToken
        });
    } catch (error: any) {
        console.error("GitHub OAuth Controller Error:", error.message);
        return res.status(500).json("Internal Server Error");
    }
}



export const githubOAuthController = (req: Request, res: Response) => {
  // Construct the GitHub authorization URL and redirect to user's browser
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=read:user,user:email`;
  res.redirect(githubAuthUrl);
};
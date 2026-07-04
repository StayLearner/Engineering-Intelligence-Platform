import { GitHubEmailData, GitHubUserData } from "../types/githubUser";
import { prisma } from "@db/prismaClient";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { createAccessToken, createRefreshToken } from "../../../../packages/shared/jwt/jwt";

export const githubOAuthCallbackService = async (code: string) => {
    try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
                redirect_uri: process.env.GITHUB_CALLBACK_URL
            }),
        })

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();   // Use .text() here on the original Response object
            console.error("Token Response is not available", errorData);
            throw new Error(`GitHub token exchange failed: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        const githubAccessToken = tokenData.access_token;

        if (!githubAccessToken) {
            console.error("Token Data is not available", tokenData);
            throw new Error('GitHub access token not found');
        }



        //Fetch github user profile
        const UserResponse = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${githubAccessToken}`,
                'Accept': 'application/json'
            },
        })

        if (!UserResponse.ok) {
            const errorData = await UserResponse.json();
            console.error("User Response is not available", errorData);
            throw new Error(`GitHub user profile fetch failed: ${UserResponse.statusText}`);
        }
        const githubUser: GitHubUserData = await UserResponse.json();


        //Fetch github user email    
        const emailResponse = await fetch('https://api.github.com/user/emails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${githubAccessToken}`,
                'Accept': 'application/json'
            },
        })

        if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error("Email Response is not available", errorData);
            throw new Error(`GitHub user email fetch failed: ${emailResponse.statusText}`);
        }

        const emails: GitHubEmailData[] = await emailResponse.json();
        const primaryEmail = emails.find(e => e.primary && e.verified)?.email;
        if (!primaryEmail) throw new Error('Could not retrieve verified primary email.');

    

           //Find or create User In Database

           let user= await prisma.user.findUnique({ where: { email: primaryEmail } });

           if(!user){
               const randomPassword = crypto.randomBytes(16).toString('hex');
               const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = await prisma.user.create({
                data: {
                  email: primaryEmail,
                  password: hashedPassword,
                  gitName: githubUser.name,
                  gitUserName: githubUser.login,
                  gitAvatarUrl: githubUser.avatar_url,
                  gitId: githubUser.id.toString()
                },
            })
           }

    //Generate and save  Application's Tokens ---
    
    const appAccessToken =  createAccessToken({ userId: user.id });
    const appRefreshToken = createRefreshToken({ userId: user.id });


    const hashedRefreshToken = await bcrypt.hash(appRefreshToken, 10);
    await prisma.refreshToken.create({
      data: { hashedToken: hashedRefreshToken, userId: user.id },
    });

    return {
      accessToken: appAccessToken,
      refreshToken: appRefreshToken,
      user: { id: user.id, email: user.email },
    };
    }
    catch (error: any) {
        console.error('GitHub OAuth Service Error (Fetch):', error.message);
        throw new Error('GitHub authentication failed.');
    }
}
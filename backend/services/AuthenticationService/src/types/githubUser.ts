
export interface GitHubUserData {
  id: string;          // GitHub user ID
  login: string;       // GitHub username
  name?: string | null;  // User's display name 
  email: string | null; 
  avatar_url?: string; 
}


export interface GitHubEmailData {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}
export interface CreateRepositoryDTO {
  organizationId: string;
  name: string;
  owner: string;
  githubUrl: string;
  description?: string;
}

export interface RepositoryResponseDTO {
  id: string;
  organizationId: string;
  name: string;
  owner: string;
  githubUrl: string;
  description?: string | null;
  defaultBranch: string;
  createdAt: Date;
  updatedAt: Date;
}
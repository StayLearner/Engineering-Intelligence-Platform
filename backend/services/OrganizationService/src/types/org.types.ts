export interface CreateOrganizationDTO {
  name: string;
  description?: string;
  userId: string; 
}

export interface OrganizationResponseDTO {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdById: string;
  createdAt: Date;
}
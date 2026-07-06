import { prisma } from "@db/prismaClient";
import { CreateOrganizationDTO } from "../types/org.types";

export const getHealthStatus = () => {
    return {
        status: "Up",
        message: "Organization Service is Healthy and Running"
    };
};



export const createOrganization = async(input: CreateOrganizationDTO) => {
   
    const{ name, description, userId } = input;

    const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  
    const existingOrg = await prisma.organization.findUnique({ where: {slug}});
  
    if(existingOrg) {
        throw new Error('Organization already Exists !')
    }

   const result = await prisma.$transaction(async (tx) => {
  
  const newOrg = await tx.organization.create({
    data: {
      name,
      slug,
      description,
      createdById: userId,
    },
  });

  await tx.organizationMember.create({
    data: {
      organizationId: newOrg.id,
      userId,
      role: "OWNER",
      invitedById: userId,
    },
  });

  return newOrg;
});

    return {
    message: "Organization created successfully",
    return: result
  };
}



export const getOrganizations = async (userId: string) => {
    const memberships = await prisma.organizationMember.findMany({
        where: {
            userId,
        },
        include: {
            organization: true,
        },
    });

    return memberships.map((membership) => membership.organization);
};
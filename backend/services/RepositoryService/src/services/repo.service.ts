import { prisma } from "@db/prismaClient";
import { CreateRepositoryDTO } from "../types/repo.types";




export const getHealthStatus = () => {
    return {
        status: "Up",
        message: "Repository Service is Healthy and Running"
    };
};




export const createRepository = async(input: CreateRepositoryDTO, userId: string) => {
   const {organizationId,name,owner,githubUrl,description} = input;
   
   // Check if organization exists
   const Org = await prisma.organization.findUnique({
     where: {
     id:organizationId
}});
  
   if(!Org){
    throw new Error("Organization Not Found");
   }
  

  // Verify user belongs to organization
   const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    include: {
      organization: true,
    },
  });


  if(!membership){
    throw new Error("You are not authorized to add repositories to this organization.")
  }


    // Prevent duplicate repositories
    const existingRepo = await prisma.repository.findUnique({ 
        where: {githubUrl}
    });
  
    if(existingRepo) {
        throw new Error('Repository already Exists !')
    }

    const result = await prisma.repository.create({
    data: {
      organizationId,
      name,
      owner,
      githubUrl,
      description,
    },
  });

   return {
    message: "Repository created successfully",
    return: result
  };
}
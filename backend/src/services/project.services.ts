import { CreateProjectDto } from "../types/project.types";
import { projectRepository } from "../repositories/project.repository";

export class ProjectService {
  async createProject(
    userId: string,
    projectData: CreateProjectDto
  ) {
    return projectRepository.createProject(
      userId,
      projectData
    );
  }
  async verifyOwnership(
    projectId: string,
    userId: string
  ) {
    return projectRepository.findProjectByUser(
      projectId,
      userId
    );
  }
}

export const projectService = new ProjectService();
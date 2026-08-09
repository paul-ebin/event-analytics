import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.services";

export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await projectService.createProject(
      req.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}
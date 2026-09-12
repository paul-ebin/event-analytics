import { Request, Response, NextFunction } from "express";
import { apiKeyService } from "../services/apiKey.service";

export async function createApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId, name } = req.body;

    const result = await apiKeyService.createApiKey(
      req.userId,
      projectId,
      { projectId, name }
    );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
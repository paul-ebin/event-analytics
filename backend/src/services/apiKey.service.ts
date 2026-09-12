import crypto from "crypto";
import { apiKeyRepository } from "../repositories/apiKey.repository";
import { projectRepository } from "../repositories/project.repository";
import { CreateApiKeyDto } from "../types/apiKey.types";

export class ApiKeyService {
  async createApiKey(
    userId: string,
    projectId: string,
    apiKeyData: CreateApiKeyDto
  ) {
    const project = await projectRepository.findProjectByUser(
      projectId,
      userId
    );

    if (!project) {
      throw new Error("Project not found");
    }

    const randomSecret = crypto.randomBytes(32).toString("hex");

    const keyPrefix = `ef_live_${randomSecret.slice(0, 8)}`;

    const rawApiKey = `ef_live_${randomSecret}`;

    const keyHash = crypto
      .createHash("sha256")
      .update(rawApiKey)
      .digest("hex");

    const apiKey = await apiKeyRepository.createApiKey(
      projectId,
      apiKeyData,
      keyPrefix,
      keyHash
    );

    return {
      ...apiKey,
      key: rawApiKey,
    };
  }
}

export const apiKeyService = new ApiKeyService();
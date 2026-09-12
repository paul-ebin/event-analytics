import { pool } from "../db/db";
import { CreateApiKeyDto } from "../types/apiKey.types";

export class ApiKeyRepository {
  async createApiKey(
    projectId: string,
    apiKeyData: CreateApiKeyDto,
    keyPrefix: string,
    keyHash: string
  ) {
    const query = `
      INSERT INTO api_keys (
        project_id,
        name,
        key_prefix,
        key_hash
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        project_id,
        name,
        key_prefix,
        is_active,
        created_at,
        updated_at;
    `;

    const values = [
      projectId,
      apiKeyData.name,
      keyPrefix,
      keyHash,
    ];

    const result = await pool.query(query, values);

    return result.rows[0] ?? null;
  }
}

export const apiKeyRepository = new ApiKeyRepository();
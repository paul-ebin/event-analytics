export interface CreateApiKeyDto {
  projectId: string;
  name: string;
}

export interface ApiKey {
  id: string;
  project_id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ApiKeyWithHash extends ApiKey {
  key_hash: string;
}
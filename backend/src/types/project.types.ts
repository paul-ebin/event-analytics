export interface CreateProjectDto {
  name: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
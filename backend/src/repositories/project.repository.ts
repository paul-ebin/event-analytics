import { pool } from "../db/db";
import { CreateProjectDto } from "../types/project.types";

export class ProjectRepository {
    async createProject(user_id: string, ProjectData: CreateProjectDto) {
        const query = ` INSERT INTO projects (
            user_id,
            name
        )
        VALUES($1 , $2)
        RETURNING *;
      `;
        const values = [
            user_id,
            ProjectData.name
        ];

        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }
}

export const projectRepository = new ProjectRepository();

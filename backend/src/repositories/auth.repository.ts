import { RegisterUserDto, User, UserWithPassword } from "../types/auth.types"
import { pool } from '../db/db'
class AuthRepository {
    async createUser(userData: RegisterUserDto, hashedPassword: string): Promise<User | null> {
        const query = `
      INSERT INTO users (
        name,
        email,
        password_hash
      )
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
        const values = [
            userData.name,
            userData.email,
            hashedPassword
        ]

        const result = await pool.query(query, values)
        return result.rows[0] ?? null

    }

    async findUserByEmail(email: string): Promise<User | null> {
        const query = `
        SELECT id , email, name
        FROM users
        WHERE email = $1;
        `
        const values = [email];

        const result = await pool.query(query, values)
        return result.rows[0] ?? null;

    }
    async findUserForLogin(
        email: string
    ): Promise<UserWithPassword | null> {

        const query = `
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = $1;
  `;

        const values = [email];

        const result = await pool.query(query, values);

        return result.rows[0] ?? null;
    }

}

export const authRepository = new AuthRepository();
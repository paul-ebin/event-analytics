import bcrypt from 'bcrypt'
import { LoginUserDto, RegisterUserDto } from '../types/auth.types'
import { authRepository } from '../repositories/auth.repository';
import { UnauthorizedError } from '../error/UnauthorizedError'
import { ConflictError } from '../error/conflictError';
import { generateAccessToken , generateRefreshToken , verifyRefreshToken} from '../utils/jwt';
import { string } from 'zod';
class AuthService {

    async register(userData: RegisterUserDto) {

        const existingUser = await authRepository.findUserByEmail(userData.email);

        if (existingUser) {
            throw new ConflictError("Email already exists");

        }
        const hashedPassword = await bcrypt.hash(
            userData.password,
            10
        );

        return authRepository.createUser(
            userData,
            hashedPassword
        )
    }
    async login(userData: LoginUserDto) {

        const user = await authRepository.findUserForLogin(
            userData.email
        );

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
            userData.password,
            user.password_hash
        );

        if (!passwordMatch) {
            throw new UnauthorizedError("Invalid credentials");
        }
        const accessToken = generateAccessToken(user.id );

        const refreshToken = generateRefreshToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        };


    }

    async refresh(refreshToken: string) {
  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken(
    decoded.userId
  );

  return {
    accessToken,
  };
}
}

export const authService = new AuthService();
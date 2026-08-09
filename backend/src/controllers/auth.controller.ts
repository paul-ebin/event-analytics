import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { NextFunction } from "express";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("REGISTER CONTROLLER HIT");

    const user = await authService.register(req.body);


    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await authService.login(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token missing");
    }

    const result = await authService.refresh(
      refreshToken
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}










































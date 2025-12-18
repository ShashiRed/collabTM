import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { loginUser, registerUser } from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const register = async (req: Request, res: Response) => {
  try {
    const data = RegisterDto.parse(req.body);
    const { user, token } = await registerUser(
      data.name,
      data.email,
      data.password
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = LoginDto.parse(req.body);
    const { user, token } = await loginUser(data.email, data.password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const me = (req: AuthRequest, res: Response) => {
  res.status(200).json({
    userId: req.userId,
  });
};

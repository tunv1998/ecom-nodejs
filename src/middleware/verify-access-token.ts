import { STATUS_CODE } from "@/constants/status-code";
import tokenGenerator from "@/utils/token-generator";
import { NextFunction, Request, Response } from "express";
export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(STATUS_CODE.Unauthorized).json({
      message: "Unauthorized",
    });

  try {
    tokenGenerator.verify(token);
    next();
  } catch (error) {
    console.log("🚀 ~ file: verify-access-token.ts:19 ~ error:", error);
    return res.json({
      message: "Invalid token",
    });
  }
}

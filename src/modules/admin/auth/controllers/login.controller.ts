import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "@/constants/status-code";
import TokenGenerator from "../utils/token-generator";

const PRIVATE_KEY = "PRIVATE_KEY";
const PUBLIC_KEY = "PUBLIC_KEY";
const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000;

const prisma = new PrismaClient();

export const adminAuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.adminUser.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user)
    return res.status(STATUS_CODE.NotFound).json({ message: "User not found" });

  const passwordMatch = await bcrypt.compare(
    req.body.password,
    user?.password || ""
  );

  if (!passwordMatch)
    return res
      .status(STATUS_CODE.Unauthorized)
      .json({ message: "Invalid password" });

  const { email, id, name } = user;

  const signData = { email, id, name };

  const tokenGenerator = new TokenGenerator(PRIVATE_KEY, PUBLIC_KEY, {
    algorithm: "HS256",
    keyid: "1",
    noTimestamp: false,
    expiresIn: "7 days",
  });

  return res.status(STATUS_CODE.Ok).json({
    accessToken: tokenGenerator.sign(signData),
    refreshToken: tokenGenerator.sign(signData, { expiresIn: "15 days" }),
    expireTime: SEVEN_DAYS_IN_MS,
  });
};

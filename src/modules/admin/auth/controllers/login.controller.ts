import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "@/constants/status-code";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminAuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma;

  return res.status(STATUS_CODE.Ok).json({
    message: "oke",
  });
};

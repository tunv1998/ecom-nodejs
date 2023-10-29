import { STATUS_CODE } from "@/constants/status-code";
import { hashPassword } from "@/utils/hash-password";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hasedPasswd = await hashPassword(password);
  try {
    const user = await prisma.adminUser.create({
      data: {
        email,
        name,
        password: hasedPasswd,
      },
    });
    const { password, ...restUserData } = user;
    return res.status(STATUS_CODE.Ok).json({
      status: STATUS_CODE.Ok,
      data: restUserData,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // TODO handle human readable error message
      return res.json({
        message: error.message,
      });
    }
    return res.status(STATUS_CODE.NotImplemented).json({
      message: "Fail to create user",
    });
  }
};

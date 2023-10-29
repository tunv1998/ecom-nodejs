import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

import { STATUS_CODE } from "@/constants/status-code";

export const validateDataMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      let message = "Bad Request";
      if (error instanceof ZodError) {
        message = error.errors.map((err) => err.message).join(", ");
      }

      return res.status(STATUS_CODE.BadRequest).json({
        message,
      });
    }
  };

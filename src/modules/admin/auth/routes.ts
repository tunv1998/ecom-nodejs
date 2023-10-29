import express from "express";

import { validateDataMiddleware } from "@/middleware/validate-data.middleware";

import { adminAuthLogin } from "./controllers/login.controller";
import { loginWithEmailAndPasswordSchema } from "./schema/loginWithEmailAndPassword";

const adminAuthRoute = express.Router();

adminAuthRoute.post(
  "/login",
  validateDataMiddleware(loginWithEmailAndPasswordSchema),
  adminAuthLogin
);

export default adminAuthRoute;

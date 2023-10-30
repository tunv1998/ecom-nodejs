import express from "express";

import { validateDataMiddleware } from "@/middleware/validate-data.middleware";

import { adminAuthLogin } from "./controllers/login.controller";
import { loginWithEmailAndPasswordSchema } from "./schema/loginWithEmailAndPassword";
import { signUpController } from "./controllers/signup.controller";
import { signupSchema } from "./schema/signup.schema";
import { verifyAccessToken } from "@/middleware/verify-access-token";

const adminAuthRoute = express.Router();

adminAuthRoute.post(
  "/login",
  validateDataMiddleware(loginWithEmailAndPasswordSchema),
  adminAuthLogin
);

adminAuthRoute.post(
  "/signup",
  [verifyAccessToken, validateDataMiddleware(signupSchema)],
  signUpController
);

export default adminAuthRoute;

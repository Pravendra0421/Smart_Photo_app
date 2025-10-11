import { Request, Response, NextFunction } from "express";
import { firebaseAuth } from "../../lib/firebaseAdmin.js";
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Request {
      User?: DecodedIdToken;
    }
  }
}

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const idToken = authHeader.split("Bearer ")[1];
  try {
    if (!firebaseAuth) {
      return res.status(501).json({
        message: "Auth Temporarily unavailable",
      });
    }
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    req.User = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid Token" });
  }
};

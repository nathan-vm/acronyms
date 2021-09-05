import { Router } from "express";
import { sign } from "jsonwebtoken";

const authRoutes = Router();

authRoutes.get("/", (_req, res) => {
  const token = sign({}, "secret");
  res.json({ token });
});

export { authRoutes };

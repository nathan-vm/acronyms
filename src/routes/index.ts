import { Router } from "express";

import { acronymsRoutes } from "./acronyms.routes";
import { authRoutes } from "./auth.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/acronyms", acronymsRoutes);

export { router };

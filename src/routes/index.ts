import { Router } from "express";

import { acronymsRoutes } from "./acronyms.routes";

const router = Router();

router.use("/acronyms", acronymsRoutes);

export { router };

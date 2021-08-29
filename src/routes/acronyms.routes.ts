import { Router } from "express";
import multer from "multer";

import { ImportAcronymController } from "../modules/acronyms/useCases/importAcronym/ImportAcronymController";

const acronymsRoutes = Router();

const importAcronymController = new ImportAcronymController();

const upload = multer({
  dest: "./tmp",
});

acronymsRoutes.post(
  "/import",
  upload.single("file"),
  importAcronymController.handle,
);

export { acronymsRoutes };

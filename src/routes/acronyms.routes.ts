import { Router } from "express";
import multer from "multer";

import { ImportAcronymController } from "../modules/acronyms/useCases/importAcronym/ImportAcronymController";
import { ListAcronymsController } from "../modules/acronyms/useCases/listAcronyms/ListAcronymsController";

const acronymsRoutes = Router();

const importAcronymController = new ImportAcronymController();
const listAcronymsController = new ListAcronymsController();

const upload = multer({
  dest: "./tmp",
});

acronymsRoutes.get("/", listAcronymsController.handle);

acronymsRoutes.post(
  "/import",
  upload.single("file"),
  importAcronymController.handle,
);

export { acronymsRoutes };

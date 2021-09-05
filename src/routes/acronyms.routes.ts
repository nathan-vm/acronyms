import { Router } from "express";
import multer from "multer";

import { CreateAcronymController } from "../modules/acronyms/useCases/createAcronym/CreateAcronymController";
import { ImportAcronymController } from "../modules/acronyms/useCases/importAcronym/ImportAcronymController";
import { ListAcronymsController } from "../modules/acronyms/useCases/listAcronyms/ListAcronymsController";

const acronymsRoutes = Router();

const importAcronymController = new ImportAcronymController();
const listAcronymsController = new ListAcronymsController();
const createAcronymController = new CreateAcronymController();

const upload = multer({
  dest: "./tmp",
});

acronymsRoutes.get("/", listAcronymsController.handle);

acronymsRoutes.post("/", createAcronymController.handle);

acronymsRoutes.post(
  "/import",
  upload.single("file"),
  importAcronymController.handle,
);

export { acronymsRoutes };

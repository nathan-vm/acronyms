import { Router } from "express";
import multer from "multer";

import { CreateAcronymController } from "../modules/acronyms/useCases/createAcronym/CreateAcronymController";
import { DeleteAcronymController } from "../modules/acronyms/useCases/deleteAcronym/DeleteAcronymController";
import { ImportAcronymController } from "../modules/acronyms/useCases/importAcronym/ImportAcronymController";
import { ListAcronymsController } from "../modules/acronyms/useCases/listAcronyms/ListAcronymsController";
import { UpdateAcronymController } from "../modules/acronyms/useCases/updateAcronym/UpdateAcronymController";
import { ensureAuthenticated } from "../shared/middlewares/auth";

const acronymsRoutes = Router();

const importAcronymController = new ImportAcronymController();
const listAcronymsController = new ListAcronymsController();
const createAcronymController = new CreateAcronymController();
const updateAcronymController = new UpdateAcronymController();
const deleteAcronymController = new DeleteAcronymController();

const upload = multer({
  dest: "./tmp",
});

acronymsRoutes.post(
  "/import",
  upload.single("file"),
  importAcronymController.handle,
);

acronymsRoutes.post("/", createAcronymController.handle);

acronymsRoutes.get("/", listAcronymsController.handle);

acronymsRoutes.use(ensureAuthenticated);

acronymsRoutes.put("/:id", updateAcronymController.handle);

acronymsRoutes.delete("/:id", deleteAcronymController.handle);

export { acronymsRoutes };

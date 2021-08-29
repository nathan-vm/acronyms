import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportAcronymUseCase } from "./ImportAcronymUseCase";

export class ImportAcronymController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importAcronymUseCase = container.resolve(ImportAcronymUseCase);
    const { file } = request;

    await importAcronymUseCase.execute(file);

    return response.status(201).send();
  }
}

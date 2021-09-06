import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAcronymUseCase } from "./DeleteAcronymUseCase";

export class DeleteAcronymController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteAcronymUseCase = container.resolve(DeleteAcronymUseCase);

    const { id } = request.params;

    await deleteAcronymUseCase.execute(id);

    return response.send();
  }
}

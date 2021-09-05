import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAcronymUseCase } from "./UpdateAcronymUseCase";

export class UpdateAcronymController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAcronymUseCase = container.resolve(UpdateAcronymUseCase);

    const { id } = request.params;
    const { key, value } = request.body;

    const acronym = await updateAcronymUseCase.execute({
      id,
      key,
      value,
    });

    return response.json(acronym);
  }
}

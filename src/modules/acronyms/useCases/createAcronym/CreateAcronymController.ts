import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAcronymUseCase } from "./CreateAcronymUseCase";

export class CreateAcronymController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAcronymUseCase = container.resolve(CreateAcronymUseCase);
    const { key, value } = request.body as Record<string, any>;

    await createAcronymUseCase.execute({ key, value });

    return response.status(201).send();
  }
}

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAcronymsUseCase } from "./ListAcronymsUseCase";

export class ListAcronymsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAcronymsUseCase = container.resolve(ListAcronymsUseCase);
    const { from, limit, search } = request.query;
    let parsedFrom: number;
    let parsedLimit: number;
    let parsedSearch: string;
    if (from) {
      parsedFrom = Number(from);
    }
    if (limit) {
      parsedLimit = Number(limit);
    }
    if (search) {
      parsedSearch = String(search);
    }

    const [acronyms, total] = await listAcronymsUseCase.execute({
      from: parsedFrom,
      limit: parsedLimit,
      search: parsedSearch,
    });

    return response.setHeader("total-found", total).json(acronyms);
  }
}

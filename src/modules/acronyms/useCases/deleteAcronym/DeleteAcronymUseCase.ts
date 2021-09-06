import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";

@injectable()
export class DeleteAcronymUseCase {
  constructor(
    @inject("AcronymRepository")
    private acronymRepository: IAcronymRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const acronym = await this.acronymRepository.findById(id);

    if (!acronym) {
      throw new AppError("Acronym not found", 404);
    }

    await this.acronymRepository.delete(acronym.id);
  }
}

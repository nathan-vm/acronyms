import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";

@injectable()
export class UpdateAcronymUseCase {
  constructor(
    @inject("AcronymRepository")
    private acronymRepository: IAcronymRepository,
  ) {}

  async execute({
    id,
    key,
    value,
  }: {
    id: string;
    key?: string;
    value: string;
  }): Promise<Acronym> {
    const acronym = await this.acronymRepository.findById(id);

    if (!acronym) {
      throw new AppError("Acronym not found");
    }
    if (key) {
      acronym.key = key;
    }
    if (value) {
      acronym.value = value;
    }
    await this.acronymRepository.save(acronym);
    return acronym;
  }
}

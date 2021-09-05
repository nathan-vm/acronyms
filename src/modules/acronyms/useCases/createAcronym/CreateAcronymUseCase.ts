import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";

@injectable()
export class CreateAcronymUseCase {
  constructor(
    @inject("AcronymRepository")
    private acronymRepository: IAcronymRepository,
  ) {}

  async execute({ key, value }: ICreateAcronymDTO): Promise<Acronym | null> {
    const acronymsWithThisKey = await this.acronymRepository.findByKey(key);

    const duplicate = acronymsWithThisKey.find(
      acronym => acronym.value === value,
    );

    if (duplicate) {
      throw new AppError("Acronym already exist", 409);
    }
    const acronym = await this.acronymRepository.create({ key, value });
    return acronym;
  }
}

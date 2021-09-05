import { inject, injectable } from "tsyringe";

import { IListAcronymsDTO } from "../../dtos/IListAcronymsDTO";
import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";

@injectable()
export class ListAcronymsUseCase {
  constructor(
    @inject("AcronymRepository")
    private acronymRepository: IAcronymRepository,
  ) {}

  async execute(
    params?: IListAcronymsDTO,
  ): Promise<[Acronym[], number] | null> {
    let from: number;
    let limit: number;
    let search: string;
    if (params) {
      ({ from, limit, search } = params);
    }
    if (search) {
      const { acronyms, total } = await this.acronymRepository.findFuzzyByValue(
        {
          search,
          from,
          limit,
        },
      );
      return [acronyms, total];
    }
    const { acronyms, total } = await this.acronymRepository.list({
      from,
      limit,
    });

    return [acronyms, total];
  }
}

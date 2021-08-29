import fs from "fs/promises";
import { inject, injectable } from "tsyringe";

import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";

@injectable()
export class ImportAcronymUseCase {
  constructor(
    @inject("AcronymRepository")
    private acronymRepository: IAcronymRepository,
  ) {}

  async loadAcronyms(file: Express.Multer.File): Promise<ICreateAcronymDTO[]> {
    const jsonFile = (await fs.readFile(file.path)) as unknown as string;
    const parsedFile = JSON.parse(jsonFile);
    const acronyms: ICreateAcronymDTO[] = [];

    parsedFile.forEach((obj: Record<string, string>) => {
      const [key] = Object.keys(obj);
      const value = obj[key];

      acronyms.push({
        key,
        value,
      });
    });

    await fs.rm(file.path);

    return acronyms;
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const acronyms = await this.loadAcronyms(file);

    acronyms.map(async acronym => {
      const { key, value } = acronym;

      const acronymsWithThisKey = await this.acronymRepository.findByKey(key);

      const duplicate = acronymsWithThisKey.find(
        acronym => acronym.value === value,
      );

      if (!duplicate) {
        await this.acronymRepository.create({ key, value });
      }
    });
  }
}

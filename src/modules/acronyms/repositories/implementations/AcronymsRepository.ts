import { getRepository, Repository } from "typeorm";

import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../IAcronymsRepository";

export class AcronymRepository implements IAcronymRepository {
  private repository: Repository<Acronym>;

  constructor() {
    this.repository = getRepository(Acronym);
  }
  async findByKey(key: string): Promise<Acronym[]> {
    const acronyms = await this.repository.find({ key });
    return acronyms;
  }
  async list(): Promise<Acronym[]> {
    const acronyms = await this.repository.find();
    return acronyms;
  }
  async create({ key, value }: ICreateAcronymDTO): Promise<void> {
    const acronym = this.repository.create({
      key,
      value,
    });

    await this.repository.save(acronym);
  }
}

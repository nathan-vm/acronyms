import * as crypto from "crypto";

import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../IAcronymsRepository";

export class FakeAcronymRepository implements IAcronymRepository {
  private acronyms: Acronym[] = [];

  async findByKey(key: string): Promise<Acronym[]> {
    const acronyms = this.acronyms.filter(ac => ac.key === key);
    return acronyms;
  }
  async list(): Promise<Acronym[]> {
    const { acronyms } = this;
    return acronyms;
  }
  async create({ key, value }: ICreateAcronymDTO): Promise<void> {
    const acronym = new Acronym();

    Object.assign(acronym, {
      id: crypto.randomBytes(8).toString("base64").slice(0, 8),
      key,
      value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}

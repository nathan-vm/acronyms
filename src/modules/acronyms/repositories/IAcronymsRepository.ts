import { ICreateAcronymDTO } from "../dtos/ICreateAcronymDTO";
import { Acronym } from "../entities/Acronym";

export interface IAcronymRepository {
  findByKey(key: string): Promise<Acronym[]>;
  list(): Promise<Acronym[]>;
  create({ key, value }: ICreateAcronymDTO): Promise<void>;
}

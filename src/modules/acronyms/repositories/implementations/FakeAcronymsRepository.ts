import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { Acronym } from "../../entities/Acronym";
import {
  IAcronymRepository,
  IFuzzyRequest,
  IListRequest,
  IListResponse,
} from "../IAcronymsRepository";

export class FakeAcronymRepository implements IAcronymRepository {
  public acronyms: Acronym[] = [];

  async findById(id: string): Promise<Acronym | null> {
    const acronym = this.acronyms.find(ac => ac.id === id);
    if (acronym) {
      return acronym;
    }
    return null;
  }

  async findByKey(key: string): Promise<Acronym[]> {
    const acronyms = this.acronyms.filter(ac => ac.key === key);
    return acronyms;
  }

  async findFuzzyByValue({
    search,
    from,
    limit,
  }: IFuzzyRequest): Promise<IListResponse> {
    const acronymsWithoutLimit = this.acronyms.filter(({ value }) => {
      return value.includes(search);
    });
    const total = acronymsWithoutLimit.length;
    const acronymsWithStart = acronymsWithoutLimit.slice(from - 1);
    const acronyms = acronymsWithStart.splice(limit - 1);
    return { acronyms, total };
  }

  async list({ from, limit }: IListRequest): Promise<IListResponse> {
    const { acronyms } = this;
    const total = this.acronyms.length;
    return { acronyms, total };
  }

  async create({ key, value }: ICreateAcronymDTO): Promise<Acronym> {
    const acronym = new Acronym();

    acronym.key = key;
    acronym.value = value;
    acronym.created_at = new Date();
    acronym.updated_at = new Date();

    this.acronyms.push(acronym);
    return acronym;
  }

  async save(acronym: Acronym): Promise<Acronym> {
    const findIndex = this.acronyms.findIndex(
      findAcronym => findAcronym.id === acronym.id,
    );

    this.acronyms[findIndex] = acronym;

    return acronym;
  }
}

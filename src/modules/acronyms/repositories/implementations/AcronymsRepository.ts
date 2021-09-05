import { getRepository, Like, Repository } from "typeorm";

import { ICreateAcronymDTO } from "../../dtos/ICreateAcronymDTO";
import { Acronym } from "../../entities/Acronym";
import {
  IAcronymRepository,
  IFuzzyRequest,
  IListRequest,
  IListResponse,
} from "../IAcronymsRepository";

export class AcronymRepository implements IAcronymRepository {
  private repository: Repository<Acronym>;

  constructor() {
    this.repository = getRepository(Acronym);
  }

  async findById(id: string): Promise<Acronym | null> {
    const [acronym] = await this.repository.find({ id });
    if (acronym) {
      return acronym;
    }
    return null;
  }
  async findByKey(key: string): Promise<Acronym[]> {
    const acronyms = await this.repository.find({ key });
    return acronyms;
  }
  async findFuzzyByValue({
    search,
    from,
    limit,
  }: IFuzzyRequest): Promise<IListResponse> {
    const [acronyms, total] = await this.repository.findAndCount({
      where: { value: Like(`%${search}%`) },
      take: limit,
      skip: from,
    });

    return { acronyms, total };
  }
  async list({ from, limit }: IListRequest): Promise<IListResponse> {
    let acronyms: Acronym[];
    let total: number;

    if (from || limit) {
      [acronyms, total] = await this.repository.findAndCount({
        take: limit,
        skip: from,
      });
    } else {
      [acronyms, total] = await this.repository.findAndCount();
    }

    return { acronyms, total };
  }

  async create({ key, value }: ICreateAcronymDTO): Promise<Acronym> {
    const acronym = this.repository.create({
      key,
      value,
    });

    await this.repository.save(acronym);
    return acronym;
  }

  async save(acronym: Acronym): Promise<Acronym> {
    return this.repository.save(acronym);
  }
}

import { ICreateAcronymDTO } from "../dtos/ICreateAcronymDTO";
import { Acronym } from "../entities/Acronym";

export interface IListRequest {
  from?: number;
  limit?: number;
}
export interface IFuzzyRequest extends IListRequest {
  search: string;
}
export interface IListResponse {
  acronyms: Acronym[];
  total: number;
}
export interface IAcronymRepository {
  findByKey(key: string): Promise<Acronym[]>;
  findFuzzyByValue({
    search,
    from,
    limit,
  }: IFuzzyRequest): Promise<IListResponse>;
  list({ from, limit }: IListRequest): Promise<IListResponse>;
  create({ key, value }: ICreateAcronymDTO): Promise<Acronym>;
}

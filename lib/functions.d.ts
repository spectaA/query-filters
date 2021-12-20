import { FindManyOptions } from "typeorm";
import { ParsedFilters } from ".";
export declare function convertToFindOptions(filters: ParsedFilters): FindManyOptions;
export declare function parseFromString(query: string): ParsedFilters;

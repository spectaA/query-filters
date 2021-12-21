import { FindManyOptions } from "typeorm";
import { ParsedFilters } from "..";
export declare function convertToFindOptions(filters: ParsedFilters): FindManyOptions;

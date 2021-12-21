import { FindManyOptions } from "typeorm";
import { ParsedFilters } from "..";

export function convertToFindOptions(filters: ParsedFilters): FindManyOptions {
    throw new Error();
}
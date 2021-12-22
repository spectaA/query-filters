import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { stringifyParsedFilters } from '.';

export const QueryFilters = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const { filters } = request.query;
        return filters ? stringifyParsedFilters(filters) : null;
    },
);

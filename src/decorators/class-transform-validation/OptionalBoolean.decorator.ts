import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsIn, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export function OptionalBoolean() {
  return applyDecorators(
    IsOptional(),
    IsIn(['true', 'false']),
    Transform(({ value }) => ({"true": true, "false": false}[value])),
    IsBoolean(),
  );
}
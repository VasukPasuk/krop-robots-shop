import { applyDecorators } from '@nestjs/common';
import {Transform, TransformFnParams} from 'class-transformer';
import { IsOptional } from 'class-validator';

export function EnumStringToBooleanObject(enumType: object) {
  return applyDecorators(
    IsOptional(),
    Transform(({ value }: TransformFnParams) => {
      const include: { [key: string]: boolean } = {};
      value.split(',').forEach((flag: string) => {
        if (flag !== '' && flag in enumType) {
          include[flag] = true;
        }
      });
      return include;
    })
  );
}
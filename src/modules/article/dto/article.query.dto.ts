import { IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDto {
  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  @Type(() => Number)
  tags?: number[];
}

export class ArticleQueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterDto)
  filter?: FilterDto;
}

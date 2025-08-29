import { IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RiskThresholdsDto {
  @IsNumber({}, { message: 'El umbral bajo debe ser un número válido' })
  @Min(0, { message: 'El umbral bajo debe ser mayor o igual a 0' })
  @Type(() => Number)
  readonly low: number;

  @IsNumber({}, { message: 'El umbral medio debe ser un número válido' })
  @Min(0, { message: 'El umbral medio debe ser mayor o igual a 0' })
  @Type(() => Number)
  readonly medium: number;
}

export class RiskConfigDto {
  @ValidateNested()
  @Type(() => RiskThresholdsDto)
  readonly thresholds: RiskThresholdsDto;

  @IsOptional()
  @Type(() => Object)
  readonly weights?: Record<string, number>;
}

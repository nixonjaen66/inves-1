import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class RiskInputDto {
  @IsNumber({}, { message: 'Las vulnerabilidades deben ser un número válido' })
  @Min(0, { message: 'Las vulnerabilidades no pueden ser negativas' })
  @Max(10, { message: 'Las vulnerabilidades no pueden ser mayores a 10' })
  @Type(() => Number)
  readonly vulnerabilidades: number;

  @IsNumber({}, { message: 'Las amenazas deben ser un número válido' })
  @Min(0, { message: 'Las amenazas no pueden ser negativas' })
  @Max(10, { message: 'Las amenazas no pueden ser mayores a 10' })
  @Type(() => Number)
  readonly amenazas: number;

  @IsNumber({}, { message: 'El impacto debe ser un número válido' })
  @Min(0, { message: 'El impacto no puede ser negativo' })
  @Max(10, { message: 'El impacto no puede ser mayor a 10' })
  @Type(() => Number)
  readonly impacto: number;

  @IsOptional()
  @IsNumber({}, { message: 'La mitigación debe ser un número válido' })
  @Min(0, { message: 'La mitigación no puede ser negativa' })
  @Max(10, { message: 'La mitigación no puede ser mayor a 10' })
  @Type(() => Number)
  readonly mitigacion?: number;
}

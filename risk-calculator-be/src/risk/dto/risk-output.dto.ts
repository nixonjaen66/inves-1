import { IsNumber, IsString, IsIn } from 'class-validator';

export class RiskOutputDto {
  @IsNumber({}, { message: 'El score debe ser un número válido' })
  readonly score: number;

  @IsString({ message: 'La categoría debe ser una cadena válida' })
  @IsIn(['low', 'medium', 'high'], { message: 'La categoría debe ser low, medium o high' })
  readonly category: 'low' | 'medium' | 'high';

  @IsString({ message: 'La explicación debe ser una cadena válida' })
  readonly explanation: string;
}

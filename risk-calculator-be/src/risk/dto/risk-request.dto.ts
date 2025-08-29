import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RiskInputDto } from './risk-input.dto';
import { RiskConfigDto } from './risk-config.dto';

export class RiskRequestDto extends RiskInputDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => RiskConfigDto)
  readonly config?: RiskConfigDto;
}

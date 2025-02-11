import { IsNotEmpty, IsString } from 'class-validator';

import { Unique } from 'src/core/rules/unique';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Unique('users', 'email')
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

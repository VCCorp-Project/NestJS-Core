import { IsEmail, IsString, Length } from 'class-validator';

import { IsValidPhoneNumber } from 'src/core/rules/phone-number';
import { Unique } from 'src/core/rules/unique';

export class CreateParticipantDto {
  @IsString({
    message: 'Must be string',
  })
  @Length(5, 10, {
    message: 'Must be between 5 and 10', // Can be customized
  })
  fullName: string;

  @IsEmail(
    {},
    {
      message: 'Must be email', // Can be customized
    },
  )
  @Unique('participants', 'email')
  email: string;

  @Length(10, 12)
  @IsValidPhoneNumber()
  @Unique('participants', 'phone_number')
  phoneNumber: string;
}

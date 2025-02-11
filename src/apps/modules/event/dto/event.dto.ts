import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  coverImage: string;

  coverImageDiskStorage: string;

  createdAt?: any;
  updatedAt?: any;
}

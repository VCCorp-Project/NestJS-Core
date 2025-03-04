import {
  Body,
  Controller,
  Get,
  Post, Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/event.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { SingleFileUpload } from '../../../core/decorators/single-file-upload.decorator';
import { MultiFileUpload } from '../../../core/decorators/multi-file-upload.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {
  }

  @Get()
  async findAll() {
    const events = await this.eventService.findAll();
    return {
      events,
    };
  }

  @Post('store/single-file')
  @SingleFileUpload({
    field_name: 'cover_image',
    disk: 'cover_image',
  })
  async storeSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
  ) {
    if (!file) {
      throw new Error('File not found');
    }
    createEventDto.coverImage = file.originalname;
    createEventDto.coverImageDiskStorage = 'local';
    const event = await this.eventService.store(createEventDto);
    return {
      event,
    };
  }

  @Post('store/multi-file')
  @MultiFileUpload([
    {
      field_name: 'background',
      disk: 'background',
      max_count: 1,
    },
    {
      field_name: 'cover_image',
      disk: 'cover_image',
      max_count: 1,
    },
  ])
  storeMultipleFile(
    @UploadedFiles()
    file: {
      cover_image: Express.Multer.File;
      background: Express.Multer.File;
    },
  ) {
    // console.log('in controller');
    console.log(file);
    return true;
  }
}

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
  storeSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
  ) {
    console.log(file);
    // return true;
    return true;
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
      disk: 'abc',
      max_count: 1,
    },
  ])
  storeMultipleFile(@UploadedFiles() file: {cover_image: Express.Multer.File, background: Express.Multer.File}) {
    console.log(file);
    return true;
  }
}

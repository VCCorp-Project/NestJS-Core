import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { FileService } from 'src/core/modules/file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEventDto } from './dto/event.dto';
import { AuthGuard } from '../../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
    private fileService: FileService,
  ) {}

  @Get()
  async findAll() {
    const events = await this.eventService.findAll();
    return {
      events,
    };
  }

  @Post('store')
  @UseInterceptors(FileInterceptor('cover_image'))
  async store(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createEventDto: CreateEventDto,
  ) {
    createEventDto.coverImage = files[0].originalname;
    const event = await this.eventService.store(createEventDto);
    return {
      event,
      location: files[0].destination,
    };
  }
}

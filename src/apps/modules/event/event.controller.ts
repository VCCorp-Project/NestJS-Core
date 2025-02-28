import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Response } from 'express';
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
    @Res() res: Response,
  ) {
    createEventDto.coverImage = files[0].originalname;
    const event = await this.eventService.store(createEventDto);
    return res.status(HttpStatus.OK).json({
      success: true,
      data: {
        event,
        location: files[0].destination,
      },
      status: HttpStatus.CREATED,
      message: 'ok',
    });
  }
}

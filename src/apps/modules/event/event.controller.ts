import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { EventService } from './event.service';
import { Response } from 'express';
import { FileService } from 'src/core/modules/file/file.service';

@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
    private fileService: FileService,
  ) {}

  @Get()
  async findAll(@Res() res: Response) {
    const events = await this.eventService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      data: {
        events,
      },
      status: HttpStatus.OK,
      message: 'ok',
    });
  }

  // @Post('store')
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     dest: 'src/apps/storage/cover_image',
  //   }),
  // )
  // async store(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() createEventDto: CreateEventDto,
  //   @Res() res: Response,
  // ) {
  //   createEventDto.coverImage = files[0].originalname;
  //   const event = await this.eventService.store(createEventDto);
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     data: {
  //       event,
  //       location: files[0].destination,
  //     },
  //     status: HttpStatus.CREATED,
  //     message: 'ok',
  //   });
  // }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { Response } from 'express';

@Controller('participants')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const participants = await this.participantService.findAll();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        participants,
      },
      message: 'ok',
    });
  }

  @Get(':id')
  async show(@Param('id') id: number, @Res() res: Response) {
    const participant = await this.participantService.findByPk(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        participant,
      },
      message: 'ok',
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    const participant = await this.participantService.deleteByPk(id);
    if (participant == null) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Not found',
      });
    }
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'ok',
    });
  }

  @Post()
  async store(@Body() body: object, @Res() res: Response) {
    const participant = await this.participantService.store(body);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        participant,
      },
      message: 'ok',
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: object,
    @Res() res: Response,
  ) {
    const participant = await this.participantService.update(id, body);
    if (!participant) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Not found',
      });
    }
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        participant,
      },
      message: 'ok',
    });
  }
}

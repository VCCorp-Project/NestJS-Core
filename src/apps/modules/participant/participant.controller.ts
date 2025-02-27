import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { Response } from 'express';
import { ParsePositiveNumberPipe } from 'src/core/pipes/parse-positive-number/parse-positive-number.pipe';
import { CreateParticipantDto } from './dto/participant.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ResponseInterceptor } from '../../../core/interceptors/response/response.interceptor';

@UseGuards(AuthGuard)
@Controller('participants')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @UseInterceptors(ResponseInterceptor)
  @Get()
  async findAll() {
    const participants = await this.participantService.findAll();
    return {
      participants,
    };
    // return res.status(HttpStatus.OK).json({
    //   status: HttpStatus.OK,
    //   data: {
    //     participants,
    //   },
    //   message: 'ok',
    //   success: true,
    // });
  }

  @Get(':id')
  // Thêm mới ParseIntPipe để validate param truyền vào có phải là số hay không
  async show(
    @Param('id', ParsePositiveNumberPipe) id: number,
    @Res() res: Response,
  ) {
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
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
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
  async store(
    @Body() createParticipantDto: CreateParticipantDto, // Apply DTO classes.
    @Res() res: Response,
  ) {
    const participant =
      await this.participantService.store(createParticipantDto);
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
    @Param('id', ParseIntPipe) id: number,
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

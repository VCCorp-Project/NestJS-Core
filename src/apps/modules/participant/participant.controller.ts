import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus, NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { Response } from 'express';
import { ParsePositiveNumberPipe } from 'src/core/pipes/parse-positive-number/parse-positive-number.pipe';
import { CreateParticipantDto } from './dto/participant.dto';
import { AuthGuard } from '../../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('participants')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get()
  async findAll() {
    const participants = await this.participantService.findAll();
    // No need response.status().json(), return raw data only
    return {
      participants,
    };
  }
  @Get(':id')
  // Thêm mới ParseIntPipe để validate param truyền vào có phải là số hay không
  async show(@Param('id', ParsePositiveNumberPipe) id: number) {
    const participant = await this.participantService.findByPk(id);
    return {
      participant,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const participant = await this.participantService.deleteByPk(id);
    if (participant == null) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return {};
  }

  @Post()
  async store(
    @Body() createParticipantDto: CreateParticipantDto, // Apply DTO classes.
  ) {
    const participant =
      await this.participantService.store(createParticipantDto);
    return {
      participant,
    };
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
    return {
      participant,
    };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParsePositiveNumberPipe } from 'src/core/pipes/parse-positive-number/parse-positive-number.pipe';
import { CreateParticipantDto } from './dto/participant.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@UseGuards(AuthGuard)
@Controller('participants')
export class ParticipantController {
  constructor(
    private participantService: ParticipantService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // <-- add this
    @InjectQueue('email-queue') private emailQueue: Queue,
  ) {}

  @Get()
  async findAll() {
    try {
      const participants = await this.participantService.findAll();
      // Caching
      await this.cacheManager.set('participants', participants, 300);
      return {
        participants,
      };
    } catch (error) {
      console.error(error);
    }
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
    await this.participantService.deleteByPk(id);
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: object) {
    const participant = await this.participantService.update(id, body);
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return {
      participant,
    };
  }

  @Post('participate/events/:event_id')
  async participateInEvent(
    @Body('participant_id', ParseIntPipe) participantId: number,
    @Param('event_id', ParseIntPipe) eventId: number,
  ) {
    const { participant, event } =
      await this.participantService.participateInEvent(participantId, eventId);
    await this.emailQueue.add(
      'sending-email',
      {
        participantEmail: participant.email,
        eventName: event.eventName,
      },
      {
        delay: 3000,
      },
    );
    return true;
  }
}

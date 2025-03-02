import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';

interface ParticipateEvent {
  participantEmail: string;
  eventName: string;
}

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  constructor(private mailerService: MailerService) {
    super();
  }

  async process(job: Job): Promise<any> {
    console.log('Processing job');
    console.log(job.name);
    if (job.name == 'sending-email') {
      try {
        const { participantEmail, eventName } = job.data as ParticipateEvent;
        await this.mailerService.sendMail({
          to: 'test@nestjs.com',
          subject: 'Event participation',
          from: 'noreply@nestjs.com',
          template: 'welcome',
          context: {
            email: participantEmail,
            eventName: eventName,
          },
        });
        console.log('Job processed');
      } catch (error) {
        console.log(error);
      }
    }
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RECEIVER_SERVICE } from './services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  constructor(
    @Inject(RECEIVER_SERVICE)
    private client: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    this.logger.log(`Sending message to receiver`);
    const pattern = { app: 'receiver', cmd: 'reply' };
    const message = await lastValueFrom(
      this.client.send<string, string>(pattern, 'hello from sender'),
    );
    return message;
  }
}

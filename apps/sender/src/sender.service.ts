import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RECEIVER_SERVICE } from './services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SenderService {
  constructor(
    @Inject(RECEIVER_SERVICE)
    private client: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    const pattern = { app: 'receiver', cmd: 'reply' };
    const { message } = await lastValueFrom(
      this.client.send<{ message: string }>(pattern, 'hello from sender'),
    );
    return message;
  }
}

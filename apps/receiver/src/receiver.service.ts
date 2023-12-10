import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ReceiverService {
  private readonly logger = new Logger(ReceiverService.name);

  getMessage(data: string): string {
    this.logger.log(`Message received from sender: ${data}`);
    return data;
  }
}

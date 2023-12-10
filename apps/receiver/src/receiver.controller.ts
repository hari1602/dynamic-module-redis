import { Controller } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @MessagePattern({ app: 'receiver', cmd: 'reply' })
  async getMessage(@Payload() data: string): Promise<string> {
    return this.receiverService.getMessage(data);
  }
}

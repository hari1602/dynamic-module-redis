import { Controller, Get } from '@nestjs/common';
import { SenderService } from './sender.service';

@Controller()
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.senderService.getHello();
  }
}

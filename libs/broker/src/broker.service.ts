import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getConfig } from './config';

@Injectable()
export class BrokerService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): MicroserviceOptions {
    return getConfig(this.configService);
  }
}

import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const getConfig = (
  configService: ConfigService,
): ClientProvider | MicroserviceOptions => ({
  transport: Transport.REDIS,
  options: {
    host: configService.get<string>('REDIS_HOST'),
    password: configService.get<string>('REDIS_PASSWORD'),
    port: configService.get<number>('REDIS_PORT'),
    retryAttempts: 5,
    retryDelay: 1,
  },
});

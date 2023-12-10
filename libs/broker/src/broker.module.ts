import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { BrokerService } from './broker.service';
import redisValidate from './env-config';

interface BrokerModuleOptions {
  names: string[];
}

@Module({
  imports: [],
  providers: [BrokerService],
  exports: [BrokerService],
})
export class BrokerModule {
  static register({ names }: BrokerModuleOptions): DynamicModule {
    const clients: ClientsModuleAsyncOptions = names.map((name) => ({
      name,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.REDIS,
        options: {
          host: configService.get<string>('REDIS_HOST'),
          password: configService.get<string>('REDIS_PASSWORD'),
          port: configService.get<number>('REDIS_PORT'),
          retryAttempts: 5,
          retryDelay: 1,
        },
      }),
      inject: [ConfigService],
    }));

    return {
      module: BrokerModule,
      imports: [
        ClientsModule.registerAsync(clients),
        ConfigModule.forFeature(redisValidate),
      ],
      exports: [ClientsModule],
    };
  }
}

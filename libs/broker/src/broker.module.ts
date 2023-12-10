import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  ClientsModuleAsyncOptions,
} from '@nestjs/microservices';
import { BrokerService } from './broker.service';
import redisValidate from './env-config';
import { getConfig } from './config';

interface BrokerModuleOptions {
  names: string[];
}

@Module({
  imports: [],
  providers: [BrokerService],
  exports: [BrokerService],
})
export class BrokerModule {
  static register(options: BrokerModuleOptions = { names: [] }): DynamicModule {
    const clients: ClientsModuleAsyncOptions = options.names.map((name) => ({
      name,
      useFactory: (configService: ConfigService) =>
        getConfig(configService) as ClientProvider,
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

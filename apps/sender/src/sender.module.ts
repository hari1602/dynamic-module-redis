import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';
import * as Joi from 'joi';
import { BrokerModule } from '@app/broker';
import { ConfigModule } from '@nestjs/config';
import { RECEIVER_SERVICE } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: `${process.cwd()}/apps/sender/.env`,
    }),
    BrokerModule.register({ names: [RECEIVER_SERVICE] }),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class SenderModule {}

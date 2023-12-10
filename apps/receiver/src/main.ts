import { NestFactory } from '@nestjs/core';
import { ReceiverModule } from './receiver.module';
import { BrokerService } from '@app/broker';

async function bootstrap() {
  const app = await NestFactory.create(ReceiverModule);

  const redisService = app.get<BrokerService>(BrokerService);
  app.connectMicroservice(redisService.getOptions(), {
    inheritAppConfig: true,
  });

  await app.startAllMicroservices();
}
bootstrap();

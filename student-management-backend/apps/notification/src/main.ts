import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
  const notification = await NestFactory.create<NestExpressApplication>(
    NotificationModule,
  );
  notification.useStaticAssets(join(__dirname, '..', 'static'));
  notification.enableCors();
  await notification.listen(4001);
}
bootstrap();

import { AppModule } from './app.module';
import { CustomValidationPipe } from './core/pipes/validation/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thêm container tại đây
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new CustomValidationPipe({
      transform: true,
    }),
  ); // Đăng kí validation pipe toàn cục
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

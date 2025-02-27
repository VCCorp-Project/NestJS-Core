import { AppModule } from './app.module';
import { CustomValidationPipe } from './core/pipes/validation/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thêm container tại đây
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // Đăng kí validation pipe toàn cục
  app.useGlobalPipes(
    new CustomValidationPipe({
      transform: true,
    }),
  );
  // Đăng kí filter toàn cục
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

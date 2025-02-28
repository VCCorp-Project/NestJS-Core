import { AppModule } from './app.module';
import { CustomValidationPipe } from './core/pipes/validation/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ResponseInterceptor } from './core/interceptors/response/response.interceptor';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './core/modules/encryption/encryption.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thêm container tại đây
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // Đăng kí validation pipe toàn cục
  app.useGlobalPipes(
    new CustomValidationPipe({
      transform: true,
    }),
  );
  // Đăng kí filter toàn cục
  app.useGlobalFilters(new HttpExceptionFilter());
  // Đăng kí interceptor toàn cục
  app.useGlobalInterceptors(
    new ResponseInterceptor(app.get(ConfigService), app.get(EncryptionService)),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

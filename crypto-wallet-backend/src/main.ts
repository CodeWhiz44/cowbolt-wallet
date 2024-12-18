import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbCreate } from './db';

async function bootstrap() {
  await dbCreate();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  app.enableCors();
  await app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
  console.log(`Backend is running on http://localhost:${port}`);
}
bootstrap();

console.log('test');

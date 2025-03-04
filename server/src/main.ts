import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); 
  app.enableCors({
    // origin: 'http://localhost:3001', // Allow requests from your frontend
    origin: 'https://yolo-task-vsei.vercel.app', // Allow requests from your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

  
}
bootstrap();

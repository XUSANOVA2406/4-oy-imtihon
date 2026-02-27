import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

const config = new DocumentBuilder()
  .setTitle('Cinema API')
  .setDescription('Kinolar sayti backend API hujjati')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'JWT tokenni shu yerga kiriting',
      in: 'header',
    },
    'access-token',
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
  
);
app.enableCors({
  origin: true,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept, Authorization',
});
app.useGlobalPipes(new ValidationPipe())
await app.listen(3000);
}
bootstrap();
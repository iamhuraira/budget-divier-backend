import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // Enable CORS for all routes,
  })
  const config = new DocumentBuilder()
    .setTitle('Budget Divider API') // Set the title of the API
    .setDescription('Budget Divider API description') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build() // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config)

  // Create a Swagger page using the Swagger document
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()

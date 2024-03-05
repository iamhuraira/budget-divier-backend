import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { LoggerMiddleware } from './common'

const ENV = process.env.NODE_ENV
console.log('ENV: ', ENV)

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ENV ? `.env.${ENV}` : `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

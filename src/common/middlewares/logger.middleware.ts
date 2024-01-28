import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP') // Role of HTTP (context) -> Logger runs only in HTTP-related requests, same role as express's debug library

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request
    const userAgent = request.get('user-agent') || '' // Taken from header

    // When the response is finished, the logger will log the request
    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`)
    })

    next()
  }
}

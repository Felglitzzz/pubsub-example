import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  ConflictException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          console.log('error-->>', err.code)
          if (err?.code === '23505') throw new ConflictException('Subscription already')
          return throwError(err)
        }),
      );
  }
}
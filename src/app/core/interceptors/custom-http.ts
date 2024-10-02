/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.handleUnauthorized();
        } else {
          this.handleError(error);
        }
        return throwError(error);
      })
    );
  }

  private handleUnauthorized(): void {
    this.router.navigate(['/auth/login']);
  }

  private handleError<T>(_error: T): void {
    console.error('An error occurred:', _error);
  }
}

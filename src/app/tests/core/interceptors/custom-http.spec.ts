import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomHttpInterceptor } from '@app/core/interceptors/custom-http';

describe('CustomHttpInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CustomHttpInterceptor,
          multi: true,
        },
        { provide: Router, useValue: routerSpy },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Content-Type header to the request', () => {
    httpClient.get('/test-url').subscribe();

    const httpRequest = httpMock.expectOne('/test-url');

    expect(httpRequest.request.headers.has('Content-Type')).toBeTrue();
    expect(httpRequest.request.headers.get('Content-Type')).toBe(
      'application/json'
    );
  });

  it('should handle 401 error and redirect to /auth/login', () => {
    httpClient.get('/test-url').subscribe(
      () => fail('should have failed with 401 error'),
      error => {
        expect(error.status).toBe(401);
      }
    );

    const httpRequest = httpMock.expectOne('/test-url');

    httpRequest.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should handle non-401 errors and log the error', () => {
    spyOn(console, 'error');

    httpClient.get('/test-url').subscribe(
      () => fail('should have failed with a 500 error'),
      error => {
        expect(error.status).toBe(500);
      }
    );

    const httpRequest = httpMock.expectOne('/test-url');

    httpRequest.flush('Server error', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(console.error).toHaveBeenCalledWith(
      'An error occurred:',
      jasmine.any(Object)
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});

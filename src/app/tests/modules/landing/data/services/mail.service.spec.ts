import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NewsletterModel,
  ContactModel,
} from '@app/modules/landing/data/models/index';
import { ResponseI } from '@app/core/utils';
import { MailService } from '@app/modules/landing/data/services';
import { environment } from '@environment/environment';

describe('MailService', () => {
  let service: MailService;
  let httpMock: HttpTestingController;
  const url: string = environment.baseApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MailService],
    });

    service = TestBed.inject(MailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send newsletter and return success response', () => {
    const mockResponse: ResponseI<null> = {
      status: 'success',
      message: 'Newsletter sent successfully',
      data: null,
    };

    const newsletter: NewsletterModel = {
      email: 'test@example.com',
    };

    service
      .sendNewsletterMail(newsletter)
      .subscribe((response: ResponseI<NewsletterModel>) => {
        expect(response.status).toBe('success');
        expect(response.message).toBe('Newsletter sent successfully');
      });

    const req = httpMock.expectOne(`${url}/mail/newsletter`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newsletter);
    req.flush(mockResponse);
  });

  it('should send contact message and return success response', () => {
    const mockResponse: ResponseI<null> = {
      status: 'success',
      message: 'Message sent successfully',
      data: null,
    };

    const contact: ContactModel = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I need help with your service.',
    };

    service.sendContactMail(contact).subscribe(response => {
      expect(response.status).toBe('success');
      expect(response.message).toBe('Message sent successfully');
    });

    const req = httpMock.expectOne(`${url}/mail/contact`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(contact);
    req.flush(mockResponse);
  });

  it('should handle error response correctly', () => {
    const mockErrorResponse = {
      status: 'error',
      message: 'Something went wrong',
      data: null,
    };

    const contact: ContactModel = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I need help with your service.',
    };

    service.sendContactMail(contact).subscribe(
      () => fail('should have failed with an error response'),
      (error: { error: { status: never; message: never } }) => {
        expect(error.error.status).toBe('error');
        expect(error.error.message).toBe('Something went wrong');
      }
    );

    const req = httpMock.expectOne(`${url}/mail/contact`);
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});

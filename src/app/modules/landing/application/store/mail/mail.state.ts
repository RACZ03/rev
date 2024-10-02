import { Action, State, StateContext } from '@ngxs/store';
import { MailStateModel } from './mail.state.model';
import { MailRepository } from '@app/modules/landing/domain/repositories';
import { SendContactAction, SendNewsletterAction } from './mail.actions';
import { ResponseI } from '@app/core/utils';
import {
  ContactEntity,
  NewsletterEntity,
} from '@app/modules/landing/domain/entities';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@State<MailStateModel>({
  name: 'mail',
  defaults: {
    contact: null,
    newsletter: null,
  },
})
@Injectable()
export class MailState {
  constructor(
    private mailRepository: MailRepository,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  @Action(SendContactAction)
  sendContact(
    { patchState }: StateContext<MailStateModel>,
    { contact }: SendContactAction
  ) {
    return this.mailRepository.sendContactMail(contact).pipe(
      tap((response: ResponseI<ContactEntity>) => {
        if (response.status === 'success') {
          patchState({
            contact: response.data,
          });
          this.translateService
            .get('API_RESPONSES.CONTACT_SUCCESS')
            .subscribe((translatedMessage: string) => {
              this.toastr.success(translatedMessage);
            });
        } else {
          this.translateService
            .get('API_RESPONSES.CONTACT_ERROR')
            .subscribe((translatedMessage: string) => {
              this.toastr.error(translatedMessage);
            });
        }
      }),
      catchError(() => {
        this.translateService
          .get('API_RESPONSES.CONTACT_ERROR')
          .subscribe((translatedMessage: string) => {
            this.toastr.error(translatedMessage);
          });
        return throwError(
          () => new Error('Error trying to send contact email')
        );
      })
    );
  }

  @Action(SendNewsletterAction)
  sendNewsletter(
    { patchState }: StateContext<MailStateModel>,
    { newsletter }: SendNewsletterAction
  ) {
    return this.mailRepository.sendNewsletterMail(newsletter).pipe(
      tap((response: ResponseI<NewsletterEntity>) => {
        console.log(response);
        if (response.status === 'success') {
          patchState({
            newsletter: response.data,
          });
          this.translateService
            .get('API_RESPONSES.NEWSLETTER_SUCCESS')
            .subscribe((translatedMessage: string) => {
              this.toastr.success(translatedMessage);
            });
        } else {
          this.translateService
            .get('API_RESPONSES.NEWSLETTER_ERROR')
            .subscribe((translatedMessage: string) => {
              this.toastr.error(translatedMessage);
            });
        }
      }),
      catchError(() => {
        this.translateService
          .get('API_RESPONSES.NEWSLETTER_ERROR')
          .subscribe((translatedMessage: string) => {
            this.toastr.error(translatedMessage);
          });
        return throwError(
          () => new Error('Error trying to send newsletter email')
        );
      })
    );
  }
}

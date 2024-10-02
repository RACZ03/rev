import { Provider } from '@angular/core';

import { MailImplRepository } from '../data/repositories';
import { MailRepository } from '../domain/repositories';

export const landingConfig: Provider[] = [
  {
    provide: MailRepository,
    useClass: MailImplRepository,
  },
];

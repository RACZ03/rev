import { Provider } from '@angular/core';

import { DemoRepository } from '../domain/repositories';
import { DemoImplRepository } from '../data/repositories';

export const forgotPasswordConfig: Provider[] = [
  {
    provide: DemoRepository,
    useClass: DemoImplRepository,
  },
];

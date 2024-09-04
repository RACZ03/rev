import { Provider } from '@angular/core';

import { DemoRepository } from '../domain/repositories';
import { DemoImplRepository } from '../data/repositories';

export const loginConfig: Provider[] = [
  {
    provide: DemoRepository,
    useClass: DemoImplRepository,
  },
];

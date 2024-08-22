import { Provider } from '@angular/core';

import { DemoRepository } from '../domain/repositories';
import { DemoImplRepository } from '../data/repositories';

export const landingConfig: Provider[] = [
  {
    provide: DemoRepository,
    useClass: DemoImplRepository,
  },
];

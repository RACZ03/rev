import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DemoStateModel } from './demo.state.model';
import { Injectable } from '@angular/core';
import { DemoRepository } from '@modules/landing/domain/repositories/demo.repository';
import { GetDemoAction } from './demo.actions';
import { tap } from 'rxjs';

@State<DemoStateModel>({
  name: 'demoState',
  defaults: {
    demo: null,
  },
})
@Injectable()
export class DemoState {
  @Selector()
  static getDemo(state: DemoStateModel) {
    return state.demo;
  }

  constructor(private demoRepository: DemoRepository) {}

  @Action(GetDemoAction)
  getDemo({ patchState }: StateContext<DemoStateModel>) {
    return this.demoRepository
      .getDemo()
      .pipe(tap(demo => patchState({ demo })));
  }
}

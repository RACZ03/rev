import { Component, OnInit } from '@angular/core';
import {
  DemoState,
  GetDemoAction,
} from '@app/modules/landing/application/store/demo';
import { DemoEntity } from '@app/modules/landing/domain/entities';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  demo$: Observable<DemoEntity | null>;
  date: Date | undefined = new Date();

  constructor(private store: Store) {
    this.demo$ = this.store.select(DemoState.getDemo);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(new GetDemoAction());
    }, 4000);
  }
}

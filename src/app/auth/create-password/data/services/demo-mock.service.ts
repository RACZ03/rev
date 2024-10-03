import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DemoModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor() {}

  getDemo(): Observable<DemoModel> {
    return of({
      fullName: 'Demo data',
      description: 'This is a demo data',
    });
  }
}

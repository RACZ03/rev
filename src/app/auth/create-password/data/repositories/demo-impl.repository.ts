import { Injectable } from '@angular/core';
import { DemoRepository } from '@modules/landing/domain/repositories';
import { Observable, map } from 'rxjs';
import { DemoService } from '../services';
import { DemoMapper } from '../mappers';
import { DemoEntity } from '@modules/landing/domain/entities';
@Injectable({
  providedIn: 'root',
})
export class DemoImplRepository implements DemoRepository {
  private demoMapper = new DemoMapper();
  constructor(private demoService: DemoService) {}

  getDemo(): Observable<DemoEntity> {
    return this.demoService.getDemo().pipe(map(this.demoMapper.mapFrom));
  }
}

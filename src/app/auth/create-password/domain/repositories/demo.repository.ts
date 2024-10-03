import { Observable } from 'rxjs';
import { DemoEntity } from '../entities';

export abstract class DemoRepository {
  abstract getDemo(): Observable<DemoEntity>;
}

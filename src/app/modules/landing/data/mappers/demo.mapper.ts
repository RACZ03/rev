import { Mapper } from '@core/utils';
import { DemoModel } from '../models';
import { DemoEntity } from '@modules/landing/domain/entities';

export class DemoMapper implements Mapper<DemoModel, DemoEntity> {
  mapFrom(param: DemoModel): DemoEntity {
    return new DemoEntity(param.fullName, param.description);
  }

  mapTo(param: DemoEntity): DemoModel {
    return {
      fullName: param.name,
      description: param.description,
    };
  }
}

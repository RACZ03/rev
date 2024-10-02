import { Mapper } from '@app/core/utils';
import { ContactModel } from '../models';
import { ContactEntity } from '../../domain/entities';

export class ContactMapper implements Mapper<ContactModel, ContactEntity> {
  mapFrom(params: ContactModel): ContactEntity {
    return params;
  }

  mapTo(param: ContactEntity): ContactModel {
    return param;
  }
}

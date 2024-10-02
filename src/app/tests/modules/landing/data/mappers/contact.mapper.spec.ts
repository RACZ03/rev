import { ContactMapper } from '@app/modules/landing/data/mappers';
import { ContactModel } from '@app/modules/landing/data/models';
import { ContactEntity } from '@app/modules/landing/domain/entities';

describe('ContactMapper', () => {
  let contactMapper: ContactMapper;

  beforeEach(() => {
    contactMapper = new ContactMapper();
  });

  it('should map from ContactModel to ContactEntity correctly', () => {
    const model: ContactModel = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };

    const entity: ContactEntity = contactMapper.mapFrom(model);
    expect(entity).toEqual(model);
  });

  it('should map to ContactModel from ContactEntity correctly', () => {
    const entity: ContactEntity = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hi',
    };

    const model: ContactModel = contactMapper.mapTo(entity);
    expect(model).toEqual(entity);
  });
});

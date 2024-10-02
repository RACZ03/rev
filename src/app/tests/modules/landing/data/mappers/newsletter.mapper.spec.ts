import { NewsletterMapper } from '@app/modules/landing/data/mappers';
import { NewsletterModel } from '@app/modules/landing/data/models';
import { NewsletterEntity } from '@app/modules/landing/domain/entities';

describe('NewsletterMapper', () => {
  let newsletterMapper: NewsletterMapper;

  beforeEach(() => {
    newsletterMapper = new NewsletterMapper();
  });

  it('should map from NewsletterModel to NewsletterEntity correctly', () => {
    const model: NewsletterModel = {
      email: 'newsletter@example.com',
    };

    const entity: NewsletterEntity = newsletterMapper.mapFrom(model);
    expect(entity).toEqual(model);
  });

  it('should map to NewsletterModel from NewsletterEntity correctly', () => {
    const entity: NewsletterEntity = {
      email: 'subscriber@example.com',
    };

    const model: NewsletterModel = newsletterMapper.mapTo(entity);
    expect(model).toEqual(entity);
  });
});

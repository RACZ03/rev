import { Mapper } from '@app/core/utils';
import { NewsletterModel } from '../models';
import { NewsletterEntity } from '../../domain/entities';

export class NewsletterMapper
  implements Mapper<NewsletterModel, NewsletterEntity>
{
  mapFrom(params: NewsletterModel): NewsletterEntity {
    return params;
  }

  mapTo(param: NewsletterEntity): NewsletterModel {
    return param;
  }
}

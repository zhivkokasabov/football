import Base from '@app/models/Base.model';
import Meta from '@app/models/meta.model';

export default class PagedResult<T> {
  public items: T[];
  public meta: Meta;

  constructor(init: any) {
    this.items = init.items;
    this.meta = new Meta(init.meta);
  }
}

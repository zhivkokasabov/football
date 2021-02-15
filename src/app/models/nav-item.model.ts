import Base from './Base.model';

export default class NavItemModel extends Base {
  public displayName: string;
  public routerLink: string;
  public isPublic: boolean;
  public icon: string;

  constructor(init: any) {
    super();

    this.displayName = init.displayName;
    this.routerLink = init.routerLink;
    this.isPublic = init.isPublic;
    this.icon = init.icon;
  }
}

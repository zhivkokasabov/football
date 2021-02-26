export default class LegendItem {
  public variant: 'primary' | 'accent' | 'warn';
  public description: string;

  constructor(init: any = {}) {
    this.variant = init.variant;
    this.description = init.description;
  }
}

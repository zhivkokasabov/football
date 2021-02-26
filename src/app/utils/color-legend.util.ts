import LegendItem from '@shared/models/legend-item.model';

export class ColorLegend {
  public instance: IColorLegend;

  constructor(type: string) {
    let typeInstance = null;

    switch (type) {
      case 'standart':
        typeInstance = new AdvancementOnly();
        break;
      default:
        throw new Error(`No definition found for ${type}`);
    }

    this.instance = typeInstance;
  }
}

class AdvancementOnly implements IColorLegend {
  public colorLegendItems: LegendItem[];

  constructor() {
    this.colorLegendItems = [
      new LegendItem({ variant: 'accent', description: 'Teams advancing after the group ends' }),
    ];
  }
}

interface IColorLegend {
  colorLegendItems: LegendItem[];
}

import LegendItem from '@shared/models/legend-item.model';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';

export class ColorLegend {
  public instance: IColorLegend;

  constructor(typeId: number) {
    let typeInstance = null;

    switch (typeId) {
      case TournamentTypesEnum.classic:
        typeInstance = new AdvancementOnly();
        break;
      case TournamentTypesEnum.roundRobin:
        typeInstance = new RoundRobin();
        break;
      case TournamentTypesEnum.doubleRoundRobin:
        typeInstance = new RoundRobin();
        break;
      default:
        throw new Error(`No definition found for typeId ${typeId}`);
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

class RoundRobin implements IColorLegend {
  public colorLegendItems: LegendItem[];

  constructor() {
    this.colorLegendItems = [
      new LegendItem({ variant: 'accent', description: 'Promotion' }),
      new LegendItem({ variant: 'warning', description: 'Relegation' }),
    ];
  }
}

interface IColorLegend {
  colorLegendItems: LegendItem[];
}

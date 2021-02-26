import { Component, Input } from '@angular/core';
import { ColorLegend } from '@app/utils/color-legend.util';

@Component({
  selector: 'app-color-legend',
  styleUrls: ['./color-legend.component.scss'],
  templateUrl: './color-legend.component.html',
})
export class ColorLegendComponent {
  @Input() public colorLegend: ColorLegend;

  constructor() {
  }
}

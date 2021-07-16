import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  styleUrls: ['./sub-header.component.scss'],
  templateUrl: './sub-header.component.html',
})
export class SubHeaderComponent {
  @Input() public text: string;

  constructor() { }
}

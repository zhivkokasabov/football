import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  styleUrls: ['./no-content.component.scss'],
  templateUrl: './no-content.component.html',
})
export class NoContentComponent {
  @Input() public message: string;

  constructor() { }
}

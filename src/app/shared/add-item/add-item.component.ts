import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-item',
  styleUrls: ['./add-item.component.scss'],
  templateUrl: './add-item.component.html',
})
export class AddItemComponent {
  @Input() public link: string;
  @Input() public title: string;

  constructor() { }
}

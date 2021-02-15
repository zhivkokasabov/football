import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  styleUrls: ['./page-header.component.scss'],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() public title: string;

  constructor() { }
}

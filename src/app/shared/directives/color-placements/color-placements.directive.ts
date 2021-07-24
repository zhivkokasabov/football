import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorPlacements]',
})
export class ColorPlacementsDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  public ngAfterViewInit(): void {
    const element = this.element.nativeElement;
    const placement = element.innerText;
    let color = '';

    switch (placement) {
      case '1st':
        color = '#FFD739';
        break;
      case '2nd':
        color = '#BEBEBE';
        break;
      case '3rd':
        color = '#BB8644';
        break;
      case '4th':
        color = '#F8996B';
        break;
      case '3rd-4th':
        color = '#D2B48C';
        break;
      case '5th-8th':
        color = '#007F99';
        break;
      default:
        color = '#166F82';
        break;
    }

    element.style.backgroundColor = color;
    element.style.textShadow = `
      1px 1px rgb(64, 64, 64, .4),
      1px -1px rgb(64, 64, 64, .4),
      -1px -1px rgb(64, 64, 64, .4),
      -1px 1px rgb(64, 64, 64, .4)
    `;
    element.style.fontWeight = 'bold';
    element.style.color = 'white';
    element.style.textAlign = 'center';
    element.style.letterSpacing = '1px';
  }
}

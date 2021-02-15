import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appEditLayer]',
})
export class EditLayerDirective implements OnInit {
  @Input('memberId') public memberId: number;
  @Output('removeClick') public removeClick: EventEmitter<number> = new EventEmitter();

  private element: HTMLElement;

  constructor(
    private elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.element = this.elementRef.nativeElement.children[0];

    this.setContainerPosition();
    const overlay = this.buildOverlay();
    const button = this.buildDeleteButton();

    overlay.appendChild(button);
    this.element.appendChild(overlay);
  }

  private setContainerPosition(): void {
    this.element.style.position = 'relative';
  }

  private buildOverlay(): HTMLElement {
    const overlay = document.createElement('div');

    overlay.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .5);
    `;

    return overlay;
  }

  private buildDeleteButton(): HTMLElement {
    const button = document.createElement('button');

    button.setAttribute('mat-flat-button', '');
    button.setAttribute('color', 'accent');
    button.innerText = 'Remove';
    button.style.cssText = `
      background: #E34A6F;
      border: none;
      color: white;
      padding: .5rem 1rem;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
    `;

    button.addEventListener('click', () => {
      this.removeClick.emit(this.memberId);
    });

    return button;
  }
}

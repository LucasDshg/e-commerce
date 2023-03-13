import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[truncate]',
})
export class TruncateTextDirective implements AfterViewInit {
  @Input('truncateSize') size: number = 90;
  @Input('truncateShowMore') showMore: boolean = true;

  private _element!: HTMLElement;
  private _buttonElement!: HTMLAnchorElement;
  private _truncated: boolean = false;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._element = this._elementRef.nativeElement;
  }
  ngAfterViewInit(): void {
    if (this._element.innerText.length > this.size) {
      this._truncated = true;
      if (this.showMore) {
        this._createButton();
      }
      this._toggleText();
    }
  }

  private _createButton() {
    this._buttonElement = document.createElement('a');

    this._buttonElement.classList.add('d-block');
    this._buttonElement.setAttribute('role', 'button');
    this._element.parentElement!.append(this._buttonElement);
    this._renderer.listen(this._buttonElement, 'click', () => {
      this._truncated = !this._truncated;
      this._toggleText();
    });
  }

  private _toggleText() {
    if (this._truncated) {
      this._element.setAttribute('data-old', this._element.innerText);

      this._element.innerText = this._element.innerText
        .slice(-this.size)
        .concat('...');

      if (this.showMore) this._buttonElement.innerText = 'Ver mais';
    } else {
      this._element.innerText = this._element.getAttribute('data-old')!;

      if (this.showMore) this._buttonElement.innerText = 'Ver menos';
    }
  }
}

import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { randomId } from '@utils/functions';
// @ts-ignore
import { Dropdown } from 'bootstrap';

@Directive({
  selector: '[dropdown]',
})
export class DropdownDirective implements OnInit, AfterViewInit {
  @Input('dropdownOpened') opened: boolean = false;
  @Input('dropdownAutoClose') autoClose: boolean | 'inside' | 'outside' = true;

  private _id: string = randomId('dropdown');
  private _dropdown: Dropdown;
  private _element!: HTMLElement;
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._init();
    this._setId();
    this._ariaExpanded();

    if (this.opened) {
      this._dropdown.toggle();
    }
  }

  ngAfterViewInit(): void {
    this._clickOutside();
  }

  @HostListener('click', ['$event'])
  click(): void {
    if (!this._dropdown) {
      this._dropdown = Dropdown.getOrCreateInstance(this._element, {
        autoClose: this.autoClose,
      });
    }

    this._dropdown.toggle();
  }

  private _init(): void {
    if (this._element.tagName.toLowerCase().includes('app')) {
      this._element.classList.add('d-inline-block');
    }

    this._dropdown = Dropdown.getOrCreateInstance(this._element, {
      autoClose: this.autoClose,
    });

    this._renderer.listen(this._element, 'hidden.bs.dropdown', () => {
      this.opened = !this.opened;
      this._ariaExpanded();
    });

    this._renderer.listen(this._element, 'shown.bs.dropdown', () => {
      this.opened = !this.opened;
      this._ariaExpanded();
    });
  }

  private _clickOutside(): void {
    if (this.autoClose === true) {
      this._renderer.listen('window', 'click', (event: any) => {
        if (this._element && !this._element.contains(event.target)) {
          this._dropdown.hide();
          if (this.opened) {
            this.opened = !this.opened;
            this._ariaExpanded();
          }
        }
      });
    }
  }

  private _ariaExpanded(): void {
    this._element.setAttribute('aria-expanded', this.opened.toString());
  }

  private _setId(): void {
    this._element.id = this._id;
    (this._element.parentElement?.lastChild as HTMLElement).setAttribute(
      'aria-labelledby',
      this._id,
    );
  }
}

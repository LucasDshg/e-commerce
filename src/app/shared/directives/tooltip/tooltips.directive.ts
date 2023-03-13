import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
// @ts-ignore
import { Tooltip } from 'bootstrap';
import { TTooltipsPosition } from './types/tooltips.types';
import { randomId } from '@utils/functions';

@Directive({
  selector: '[tooltip]',
})
export class TooltipsDirective implements OnInit, OnDestroy {
  @Input('tooltip') title!: string | number;
  @Input('tooltipPosition') placement: TTooltipsPosition = 'top';
  @Input('tooltipIsHtml') html: boolean = true;
  @Input('tooltipContainer') container: string | HTMLElement | false = false;
  @Output('tooltipClose') flaClose = new EventEmitter<any>();
  private _id: string = randomId('tooltip');
  private _tooltip: Tooltip;
  private _element!: HTMLElement;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._init();
  }

  ngOnDestroy(): void {
    this._tooltip?.hide();
    this._tooltip?.dispose();
  }

  private _init(): void {
    if (this._element.tagName.toLowerCase().includes('fla')) {
      this._element.classList.add('d-inline-block');
    }

    this._element.id = this._id;

    if (this.title) {
      this._tooltip = Tooltip.getOrCreateInstance(this._element, {
        title: this.title,
        placement: this.placement,
        html: this.html,
        container: this.container,
      });
    }

    this._renderer.listen(this._element, 'hidden.bs.tooltip', ($event) =>
      this.flaClose.next($event),
    );
  }
}

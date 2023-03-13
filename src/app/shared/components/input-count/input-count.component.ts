import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { BaseComponent } from '../base-component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-count',
  templateUrl: './input-count.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputCountComponent),
    },
  ],
})
export class InputCountComponent extends BaseComponent implements OnInit {
  @Input() allowNegativeValue: boolean = true;
  @Input() max: number = 9999;
  @Input() min: number = -9999;
  @Input() maxLength: number = 9999;
  @Input() minLength: number = 0;
  @Input() incrementValue: number = 1;
  @Input('isDisable') set disabled(disabled: boolean) {
    this.disabledBtn = disabled;
    this.disable?.next(disabled);
  }

  @Output() onChangeValue = new EventEmitter<any>();

  disabledBtn: boolean = false;

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }

  ngOnInit(): void {}

  @HostListener('window:keydown.ArrowUp', ['$event'])
  up() {
    if (this.formControl.value >= this.max || this.disabledBtn) return;

    this.formControl.setValue(this.formControl.value + this.incrementValue);
  }

  @HostListener('window:keydown.ArrowDown', ['$event'])
  down() {
    if (
      (!this.allowNegativeValue && this.formControl.value == 0) ||
      this.disabledBtn
    ) {
      return;
    }

    if (this.formControl.value <= this.min) return;

    this.formControl.setValue(this.formControl.value - this.incrementValue);
  }

  @HostListener('wheel', ['$event'])
  mouseWheel(event: WheelEvent) {
    event.deltaY < 0 ? this.up() : this.down();
  }

  valid() {
    const value = this.formControl.value;
    if (!this.allowNegativeValue && value < 0) this.formControl.setValue(0);

    if (value > this.max) this.formControl.setValue(this.max);

    if (value < this.min) this.formControl.setValue(this.min);
  }
}

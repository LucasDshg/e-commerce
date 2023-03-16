import {
  AfterViewInit,
  ChangeDetectorRef,
  Injectable,
  Injector,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class BaseComponent
  implements ControlValueAccessor, OnDestroy, AfterViewInit
{
  formControl = new FormControl(undefined);
  onChange!: (value: any) => void;
  onTouched!: () => void;
  onDestroy = new Subject<void>();
  disable = new Subject<boolean>();

  constructor(public injector: Injector, public cdr: ChangeDetectorRef) {
    // this.disable
    //   .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
    //   .subscribe((i) => this.disbaledControl(i));
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(
      NgControl,
      null,
    ) as NgControl;
    if (ngControl) {
      this.formControl = ngControl.control as FormControl;
      this.formControl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe((value) => this.registerOnChange(value));
    }

    this.cdr.detectChanges();
  }

  writeValue(value: any): void {
    this.onChange = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.cdr.detectChanges();
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.cdr.detectChanges();
  }

  setDisabledState(value: boolean): void {
    value ? this.formControl.disable() : this.formControl.enable();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { InputTextModule } from './input-text-component.module';
import { DebugElement } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { By } from '@angular/platform-browser';

describe('Input Text Component', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let element: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextModule],
      providers: [BaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement;
  });

  it('should create Input Text Componente', () => {
    expect(component).toBeTruthy();
  });

  it('should input is invalid if isRequired igual true ', fakeAsync(() => {
    const control = new FormControl('');
    component.formControl = control;
    component.isRequired = true;
    component.formControl.markAsTouched();
    fixture.detectChanges();
    tick();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;
      console.log(input)
    expect(input.classList.contains('ng-invalid')).toBe(true);
    expect(component.formControl.invalid).toBeTruthy();
  }));

  it('should dispatch event onChanges if value change ', fakeAsync(() => {
    const control = new FormControl('');
    component.formControl = control;
    component.formControl.markAsTouched();
    fixture.detectChanges();
    tick();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;
    expect(input.value).toEqual('');

    input.value = 'updated value';
    input.dispatchEvent(new Event('input'));

    expect(control.value).toEqual('updated value');
  }));

  it('should input type igual number', fakeAsync(() => {
    component.type = 'number';
    fixture.detectChanges();
    tick();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.type).toEqual('number');
    expect(component.type).toBe('number');
  }));
});

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

  it('should input is invalid if isRequired igual true ', () => {
    const control = new FormControl('');
    component.formControl = control;
    component.isRequired = true;
    component.formControl.markAsTouched();
    fixture.detectChanges();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    const invalidText = element.query(By.css('.invalid-feedback'))
      .nativeElement as HTMLElement;

    expect(input.classList.contains('ng-invalid')).toBe(true);
    expect(invalidText.innerText).toBe(component.requiredText);
  });

  it('should input is disable if isDisable igual true ', () => {
    const control = new FormControl('');
    component.formControl = control;
    component.isDisable = true;
    fixture.detectChanges();

    expect(control.disabled).toBeTruthy();
  });

  it('should dispatch event onChanges if value change ', fakeAsync(() => {
    const control = new FormControl('');
    component.formControl = control;
    component.formControl.markAsTouched();
    fixture.detectChanges();
    tick();

    spyOn(component.emitChange, 'emit');

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.value).toEqual('');

    input.value = 'updated value';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(control.value).toEqual('updated value');
    expect(component.emitChange.emit).toHaveBeenCalledWith(control);
  }));

  it('should input type igual number', () => {
    component.type = 'number';
    fixture.detectChanges();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.type).toEqual('number');
    expect(component.type).toBe('number');
  });

  it('should input has id', () => {
    component.id = 'test_id';
    fixture.detectChanges();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.id).toEqual('test_id');
  });

  it('should input has placeholder', () => {
    component.placeholder = 'Placeholder test';
    fixture.detectChanges();

    const input = element.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    expect(input.placeholder).toEqual('Placeholder test');
  });

  it('should input label text', () => {
    component.label = 'Label test';
    fixture.detectChanges();

    const label = element.query(By.css('label'))
      .nativeElement as HTMLLabelElement;

    expect(label.textContent).toEqual('Label test');
  });
});

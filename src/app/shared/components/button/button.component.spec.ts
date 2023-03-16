import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('Button Component', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let element: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement;
  });

  it('should create Button Componente', () => {
    expect(component).toBeTruthy();
  });

  it('should button disabled if isDisable true ', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const button = element.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeTruthy();
  });

  it('should button loading if isLoading true ', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const button = element.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeTruthy();

    const loading = element.query(By.css('span'))
      .nativeElement as HTMLSpanElement;

    expect(button.children).toContain(loading);
  });

  it('should button has label ', () => {
    component.label = 'test label';
    fixture.detectChanges();

    const button = element.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(button.innerText).toBe('test label');
  });

  it('should button type igual submit ', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const button = element.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    expect(button.type).toBe('submit');
  });

  it('should dispatch event onClick ', () => {
    spyOn(component.onClick, 'emit');

    const button = element.query(By.css('button'))
      .nativeElement as HTMLButtonElement;

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.onClick.emit).toHaveBeenCalledWith(button);
  });
});

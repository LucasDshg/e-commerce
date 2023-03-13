import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducstComponent } from './products.component';
import { ProductsModule } from './products.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProducstComponent', () => {
  let component: ProducstComponent;
  let fixture: ComponentFixture<ProducstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsModule, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Products Componente', () => {
    expect(component).toBeTruthy();
  });
});

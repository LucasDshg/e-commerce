import { TestBed } from '@angular/core/testing';
import { getValueForm, randomId } from './functions';
import { PT_BR } from '../shared/constants/language.constant';
import { CommonModule } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

describe('Valid Funtions', () => {
  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [PT_BR],
    });
    registerLocaleData(localePtBr);
  });

  it('should be return random id ', () => {
    expect(randomId('button')).toBeInstanceOf(String);
  });

  it('should be return value from FormControl ', () => {
    const form = new FormGroup({
      input: new FormControl('test'),
    });
    expect(getValueForm('input', form)).toBe('test');
  });
});

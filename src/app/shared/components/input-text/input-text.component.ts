import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { randomId } from 'src/app/utils/functions';

@Component({
  selector: 'app-input-text[label]',
  templateUrl: './input-text.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent),
    },
  ],
})
export class InputTextComponent extends BaseComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = randomId('input_text');
  @Input() placeholder: string = 'Placeholder test';
  @Input() requiredText: string = 'Preencha o campo.';
  @Input() isRequired: boolean = false;
  @Input() set isDisable(disabled: boolean) {
    super.setDisabledState(disabled);
  }

  @Output() emitChange = new EventEmitter<FormControl>();

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }
}

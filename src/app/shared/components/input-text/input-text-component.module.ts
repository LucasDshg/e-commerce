import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputTextComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputTextComponent],
  providers: [],
})
export class InputTextModule {}

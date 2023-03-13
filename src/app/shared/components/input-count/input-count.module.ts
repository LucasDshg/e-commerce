import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCountComponent } from './input-count.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputCountComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputCountComponent],
  providers: [],
})
export class InputCountModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextDirective } from './truncate-text.directive';

@NgModule({
  declarations: [TruncateTextDirective],
  imports: [CommonModule],
  exports: [TruncateTextDirective],
  providers: [],
})
export class TrucateTextModule {}

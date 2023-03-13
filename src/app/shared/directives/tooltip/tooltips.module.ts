import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipsDirective } from './tooltips.directive';

@NgModule({
  declarations: [TooltipsDirective],
  imports: [CommonModule],
  exports: [TooltipsDirective],
})
export class TooltipsModule {}

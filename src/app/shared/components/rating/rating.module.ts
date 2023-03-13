import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { TooltipsModule } from '@shared/directives/tooltip/tooltips.module';

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, TooltipsModule],
  exports: [RatingComponent],
  providers: [],
})
export class RatingModule {}

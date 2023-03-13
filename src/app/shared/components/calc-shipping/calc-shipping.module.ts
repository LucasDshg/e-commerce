import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcShippingComponent } from './calc-shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcShippingService } from './service/calc-shipping.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CalcShippingComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [CalcShippingComponent],
  providers: [CalcShippingService],
})
export class CalcShippingModule {}

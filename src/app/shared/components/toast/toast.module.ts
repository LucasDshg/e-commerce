import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './../toast/toast.component';
import { ToastService } from './service/toast.service';
import { CreateComponentService } from '@shared/services/create-component/create-component.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [CreateComponentService, ToastService],
})
export class ToastModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasHeaderComponent } from './offcanvas-parts/offcanvas-header.component';
import { OffcanvasComponent } from './offcanvas.component';
import { OffcanvasService } from './service/offcanvas.service';
import { OFFCANVAS_DATA } from './constants/offcanvas.contants';
import { CreateComponentService } from '@shared/services/create-component/create-component.service';

const COMPONENTS = [OffcanvasHeaderComponent, OffcanvasComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule],
  exports: [COMPONENTS],
  providers: [
    { provide: OFFCANVAS_DATA, useValue: {} },
    OffcanvasService,
    CreateComponentService,
  ],
})
export class OffcanvasModule {}

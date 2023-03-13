import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@shared/components/button/button.module';
import { ProducstComponent } from './products.component';
import { ProductsRoutes } from './products.routing';
import { ProductsService } from './service/products.service';
import { TooltipsModule } from '@shared/directives/tooltip/tooltips.module';
import { TrucateTextModule } from '@shared/directives/truncate-text/truncate-text.module';
import { DropDonwModule } from '@shared/directives/dropdown/dropdown.module';
import { RatingModule } from '@shared/components/rating/rating.module';
import { BreadCrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { DetailsProductComponent } from './details-product/details-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsProductImageComponent } from './details-product/detail-product-image/details-product-image.component';
import { InputCountModule } from '@shared/components/input-count/input-count.module';
import { InputTextModule } from '@shared/components/input-text/input-text-component.module';
import { CalcShippingModule } from '@shared/components/calc-shipping/calc-shipping.module';

@NgModule({
  declarations: [
    ProducstComponent,
    DetailsProductComponent,
    DetailsProductImageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TooltipsModule,
    TrucateTextModule,
    DropDonwModule,
    RatingModule,
    InputCountModule,
    InputTextModule,
    BreadCrumbModule,
    CalcShippingModule,
    RouterModule.forChild(ProductsRoutes),
  ],
  exports: [ProducstComponent],
  providers: [ProductsService],
})
export class ProductsModule {}

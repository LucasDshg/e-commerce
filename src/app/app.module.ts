import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { HeaderComponent } from '@core/layout/header/header.component';
import { LayoutComponent } from '@core/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { DropDonwModule } from '@shared/directives/dropdown/dropdown.module';
import { BreadCrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { CartComponent } from '@core/components/cart/cart.component';
import { OffcanvasModule } from '@shared/components/offcanvas/offcanvas.module';
import { TooltipsModule } from '@shared/directives/tooltip/tooltips.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { ToastModule } from '@shared/components/toast/toast.module';

registerLocaleData(ptBr);

const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  HeaderComponent,
  CartComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DropDonwModule,
    BreadCrumbModule,
    OffcanvasModule,
    TooltipsModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

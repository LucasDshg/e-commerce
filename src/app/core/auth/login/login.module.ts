import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from '@shared/components/button/button.module';
import { InputTextModule } from '@shared/components/input-text/input-text-component.module';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forChild(AuthRoutes),
  ],
  providers: [],
})
export class LoginModule {}

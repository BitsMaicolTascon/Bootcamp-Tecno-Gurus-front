import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthenticateService } from '../services/auth/authenticate.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { TemplatesModule } from './templates/templates.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
  ],
  imports: [
  CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TemplatesModule,
    NgbModule
  ],
  providers: [
    AuthenticateService
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
  providers: [
    AuthenticateService,
    HttpClientModule
  ]
})
export class TemplatesPagesModule { }

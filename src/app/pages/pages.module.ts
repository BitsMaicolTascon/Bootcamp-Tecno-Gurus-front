import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { TemplatesPagesModule } from './templates/templates-pages.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PagesComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TemplatesPagesModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class PagesModule { }

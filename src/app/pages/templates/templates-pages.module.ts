import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ]
})
export class TemplatesPagesModule { }

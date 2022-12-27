import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: PerfilComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

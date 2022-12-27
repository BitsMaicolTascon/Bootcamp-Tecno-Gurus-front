import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare interface MenuItem {
  path: string;
  title: string;
  class: string;
  condition: any;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public buttonsItems: MenuItem[] = [];
  public pathLocation: string = '';

  constructor(private router: Router, private location: Location) {

  }

  ngOnInit(): void {
    this.loadData()

  }

  private loadData(): void {
    this.pathLocation = this.location.path();
    this.buttonsItems = [
      {
        path: '/auth/login',
        title: 'Iniciar sesión',
        class: 'btn-dark',
        condition: this.pathLocation === '/auth/register'
      },
      {
        path: '/auth/register',
        title: 'Regístrarme',
        class: 'btn-light',
        condition: this.pathLocation === '/auth/login'
      }
    ]
  }

  redirect(path: string): void {
    this.router.navigateByUrl(path).then(() => {
     return this.loadData();
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() showSidebar = new EventEmitter<boolean>();
  public status: boolean = false;
  public name: string = ''


  constructor(private authService: AuthenticateService, private router: Router) {

  }

  ngOnInit(): void {
    this.name = this.authService.getUserInStorage()?.name || 'Usuario';
  }

  showSide(): void {
    this.status = !this.status;
    this.event(this.status);
  }

  event( show: boolean ): void {
    this.showSidebar.emit(show);
  }

  logout(): void {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/auth/login');
  }

}

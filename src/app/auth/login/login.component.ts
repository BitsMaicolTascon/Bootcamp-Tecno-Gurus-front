import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { Session } from 'src/app/models/session.interface';
import { User } from 'src/app/models/user.interface';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private ipAddress: string = '';
  public form!: FormGroup;

  constructor(private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.getAddressIp();
  }

  public login(): void {

  }

  private getAddressIp(): string {
    this.authService.getAddressIp().subscribe((address) => {
      const { ip }: any = address;
      this.ipAddress = ip;
    });
    return this.ipAddress;
  }

  private saveSession(session: Session): void {

  }

  private setUserInStorage(user: User): void {

  }

  private setTokenInStorage(token: string): void {

  }

}

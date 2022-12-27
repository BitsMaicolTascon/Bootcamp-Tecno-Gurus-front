import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
  public errorAlert: boolean = false;
  public userInactive: boolean = false;
  public userIncorrect: boolean = false;

  constructor(
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false, []]
    });

  }

  ngOnInit(): void {
    this.getAddressIp();
  }

  public login(): void {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (user) => {
          if (user.active === true && user.authToken) {
            let session = {
              idUser: user._id,
              sessionDate: moment().format('YYYY-MM-DD'),
              ipSession: this.ipAddress,
              hourSession: moment().format('HH:mm:ss'),
            } as Session;
            this.saveSession(session);
            this.setUserInStorage(user);
            this.setTokenInStorage(user.authToken);
            setTimeout(() => {
              this.router.navigateByUrl('/pages/home');
            }, 200);
          } else if(user.active === false) {
            this.userInactive = true;
            setTimeout(() => {
              this.userInactive = false;
            }, 4000);
          } else {
            this.userIncorrect = true;
            setTimeout(() => {
              this.userIncorrect = false;
            }, 4000);
          }
        },
        error: (err) => {
          this.errorAlert = true;
          setTimeout(() => {
            this.errorAlert = false;
          }, 4000);
        }
      });
  }

  private getAddressIp(): string {
    this.authService.getAddressIp().subscribe((address) => {
      const { ip }: any = address;
      this.ipAddress = ip;
    });
    return this.ipAddress;
  }

  private saveSession(session: Session): void {
    this.authService.saveSession(session);
  }

  private setUserInStorage(user: User): void {
    this.authService.setUserInStorage(user);
  }

  private setTokenInStorage(token: string): void {
    this.authService.setTokenAuth(token);
  }

}

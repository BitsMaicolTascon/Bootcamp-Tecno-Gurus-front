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

  constructor(
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false,[]]
    });

  }

  ngOnInit(): void {
    this.getAddressIp();
  }

  public login(): void {
    this.authService.login(this.form.value.email, this.form.value.password).subscribe((data) => {
      try {
        if (data.active === true && data.authToken) {
          let session = {
            idUser: data._id,
            sessionDate: moment().format('YYYY-MM-DD'),
            ipSession: this.ipAddress,
            hourSession: moment().format('HH:mm:ss'),
          } as Session;
          this.saveSession(session);
          this.setUserInStorage(data);
          this.setTokenInStorage(data.authToken);
        }

      } catch (err) {

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

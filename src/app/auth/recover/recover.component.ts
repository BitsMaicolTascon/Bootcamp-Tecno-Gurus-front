import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticateService } from 'src/app/services/auth/authenticate.service';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  public form!: FormGroup;
  public errorAlert: boolean = false;
  public recoverFailed: boolean = false;
  public recoverDone: boolean = false;

  constructor(
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
    });

  }

  ngOnInit(): void {
  }

  recoverPassword(): void {
    this.authService.recoverPassword(this.form.value.email).subscribe({
      next: (resp) => {
        if (resp.success) {
          this.recoverDone = true;
          setTimeout(() => {
            this.recoverDone = false;
            this.router.navigateByUrl('/auth/login');
          }, 4000);

        } else {
          this.recoverFailed = true;
          setTimeout(() => {
            this.recoverFailed = false;
          }, 4000);
        }
      },
      error: (err) => {
        this.errorAlert = true;
        setTimeout(() => {
          this.errorAlert = false;
        }, 4000);
      }
    })
  }

}

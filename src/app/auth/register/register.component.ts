import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.interface';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public errorAlert: boolean = false;
  public registerFailed: boolean = false;
  public registerDone: boolean = false;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      termConditions: [false, [Validators.required, Validators.requiredTrue]],
      role: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
    });
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  register(): void {
    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.form.value.role,
      phoneNumber: this.form.value.phoneNumber
    } as User
    this.registerService.register(user).subscribe({
      next: (resp) => {
        if (resp.success) {
          this.registerDone = true;
          setTimeout(() => {
            this.registerDone = false;
            this.router.navigateByUrl('/auth/login');
          }, 4000);

        } else {
          this.registerFailed = true;
          setTimeout(() => {
            this.registerFailed = false;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public form: FormGroup;
  public errorAlert: boolean = false;
  public updateFailed: boolean = false;
  public updateDone: boolean = false;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      employee: [false, []],
      cellPhone: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
    });
  }

  ngOnInit(): void {

  }

  updatePerfil(): void {
    const user = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      employee: this.form.value.employee,
      phoneNumber: this.form.value.phoneNumber,
      cellPhone: this.form.value.cellPhone
    } as User;

    this.userService.updatePerfil(user).subscribe({
      next: (resp) => {
        console.log(resp.success);
        if (resp.success) {
          this.updateDone = true;
          setTimeout(() => {
            this.updateDone = false;
            this.router.navigateByUrl('/auth/login');
          }, 4000);

        } else {
          this.updateFailed = true;
          setTimeout(() => {
            this.updateFailed = false;
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

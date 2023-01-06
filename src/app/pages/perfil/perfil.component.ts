import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.interface';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
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
    private router: Router,
    private authService: AuthenticateService
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
    this.form.value.name = this.authService.getUserInStorage()?.name || '';
    this.form.value.lastName = this.authService.getUserInStorage()?.lastName || '';
    this.form.value.employee = this.authService.getUserInStorage()?.employee || false;
    this.form.value.phoneNumber = this.authService.getUserInStorage()?.phoneNumber || '';
    this.form.value.cellNumber = this.authService.getUserInStorage()?.contactPhone || '';
  }

  updatePerfil(): void {
    const user = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      employee: this.form.value.employee,
      phoneNumber: this.form.value.phoneNumber,
      cellPhone: this.form.value.cellPhone,
      documentId: this.authService.getUserInStorage()?.email
    } as User;
    this.userService.updatePerfil(user).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.success) {
          this.updateDone = true;
          this.authService.setUserInStorage(resp);
          setTimeout(() => {
            this.updateDone = false;
            this.router.navigateByUrl('/pages/home');
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

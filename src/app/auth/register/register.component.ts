import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public errorAlert: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {

  }

}

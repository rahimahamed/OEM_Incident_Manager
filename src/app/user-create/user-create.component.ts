import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './../user';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {
  // model = new User();
  form: FormGroup;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this._userService.addUsers(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        // this.model = new User();
        setTimeout(() => (this.showSuccessMessage = false), 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else
          this.serverErrorMessages =
            'Something went wrong. Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this._userService.selectedUser = {
      username: '',
      password: '',
      email: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { matchingPasswords: true }; // Return as error: do not match
      }
    };
  }
}

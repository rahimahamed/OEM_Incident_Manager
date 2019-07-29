import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  model = {
    username: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   FormControl
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { UserService } from '../user.service';
// import { AuthGuard } from '../auth.guard';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent implements OnInit {
//   messageClass;
//   message;
//   processing = false;
//   form: FormGroup;
//   previousUrl;

//   constructor(
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private router: Router,
//     private authService: AuthService,
//     private authGuard: AuthGuard
//   ) {
//     this.createForm(); // Create Login Form when component is constructed
//   }

//   // model = {
//   //   username: '',
//   //   password: ''
//   // };
//   // emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   // serverErrorMessages: string;

//   // Function to create login form
//   createForm() {
//     this.form = this.formBuilder.group({
//       username: ['', Validators.required], // Username field
//       password: ['', Validators.required] // Password field
//     });
//   }

//   // Function to disable form
//   disableForm() {
//     this.form.controls['username'].disable(); // Disable username field
//     this.form.controls['password'].disable(); // Disable password field
//   }

//   // Function to enable form
//   enableForm() {
//     this.form.controls['username'].enable(); // Enable username field
//     this.form.controls['password'].enable(); // Enable password field
//   }

//   onLoginSubmit() {
//     this.processing = true; // Used to submit button while is being processed
//     this.disableForm(); // Disable form while being process
//     // Create user object from user's input
//     const user = {
//       username: this.form.get('username').value, // Username input field
//       password: this.form.get('password').value // Password input field
//     };

//     // // Function to send login data to API
//     this.authService.login(user).subscribe(
//       res => {
//       // Check if response was a success or error
//       if (!this.success) {
//         this.messageClass = 'alert alert-danger'; // Set bootstrap error class
//         this.message = data.message; // Set error message
//         this.processing = false; // Enable submit button
//         this.enableForm(); // Enable form for editting
//       } else {
//         this.messageClass = 'alert alert-success'; // Set bootstrap success class
//         this.message = data.message; // Set success message
//         // Function to store user's token in client local storage
//         this.authService.storeUserData(data.token, data.user);
//         // After 2 seconds, redirect to dashboard page
//         setTimeout(() => {
//           // Check if user was redirected or logging in for first time
//           if (this.previousUrl) {
//             this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
//           } else {
//             this.router.navigate(['/home']); // Navigate to dashboard view
//           }
//         }, 2000);
//       }
//     });
//   }

//   ngOnInit() {
//     // On page load, check if user was redirected to login
//     if (this.authGuard.redirectUrl) {
//       this.messageClass = 'alert alert-danger'; // Set error message: need to login
//       this.message = 'You must be logged in to view that page.'; // Set message
//       this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
//       this.authGuard.redirectUrl = undefined; // Erase previous URL
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //   date: number = Date.now();
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(x => (this.currentUser = x));

    // this.userService.getUser(User).subscribe(
    //   res => {
    //     this.currentUser = res['user'];
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  ngOnInit() {
    // this.authenticationService.currentUser.subscribe(
    //   user => this.currentUser = user);
  }

  day() {
    let v = new Date();
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return days[v.getDay()];
  }

  monthDateYear() {
    let t = new Date();
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
  }

  showTime() {
    let date = new Date();
    let time = '';

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    time = h + ':' + m + ':' + s;
    // setTimeout(this.showTime, 1000)
    return time;
  }
}

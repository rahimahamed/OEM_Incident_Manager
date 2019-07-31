import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../server';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //   date: number = Date.now();
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
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

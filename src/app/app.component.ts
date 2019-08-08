import { Component } from '@angular/core';

declare var showTime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: number = Date.now();

  showTime(){
    let date = new Date();
    let time = "";

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    time = h + ":" + m + ":" + s;
    //setTimeout(this.showTime, 1000)
    return time;
  }
}

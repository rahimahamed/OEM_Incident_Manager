import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  day(){
    let v = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[v.getDay()];
  }

  monthDateYear(){
    let t = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
    return months[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
  }



  showTime(){
    let date = new Date();
    let time = "";

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    time = h + ":" + m + ":" + s;

    if(h < 10){
      time = "0" + h + ":" + m + ":" + s;
    }
    if(m < 10){
      time = h + ":" + "0" + m + ":" + s;
    }
    if(s < 10){
      time = h + ":" + m + ":" + "0" + s;
    }

    //time = h + ":" + m + ":" + s;
    setTimeout(this.showTime, 1000)
    return time;
  }


  /*time = "";
  date = new Date();

  show(){
    let h = this.date.getHours();
    let m = this.date.getMinutes();
    let s = this.date.getSeconds();
    if(h == 0){
      h = 12;
      this.time = h + ":" + m + ":" + s;
    }
    if(h > 12){
      h = h - 12;
      this.time = h + ":" + m + ":" + s;
    }
    if(h < 10){
      this.time = "0" + h + ":" + m + ":" + s;
    }
    if(m < 10){
      this.time = h + ":" + "0" + m + ":" + s;
    }
    if(s < 10){
      this.time = h + ":" + m + ":" + "0" + s;
    }

    //var time = h + ":" + m + ":" + s;
    console.log(this.time);
    setTimeout(this.showTime, 1000);
    return '';
  }

  //timer:  = this.showTime();

  //date: number = Date.now();*/
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './../user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  model = new User();

  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmitUser() {
    this._userService.addUsers(this.model).subscribe(
      newUser => {
        this.ngOnInit();
        this.model = new User();
      }
    );
  }

}

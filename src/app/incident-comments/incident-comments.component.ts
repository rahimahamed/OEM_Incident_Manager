import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IncidentService } from './../incident.service';
import { Incident } from './../incident';
import { IncidentsDataSource } from '../incident.data.source';
import { UserService } from '../user.service';

@Component({
  selector: 'app-incident-comments',
  templateUrl: './incident-comments.component.html',
  styleUrls: ['./incident-comments.component.css']
})
export class IncidentCommentsComponent implements OnInit {
  form;
  commentForm;
  newComment = [];
  enabledComments = [];

  constructor() {}

  ngOnInit() {}
}

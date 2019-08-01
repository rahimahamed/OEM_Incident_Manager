import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../incident';
import { IncidentsDataSource } from '../../incident.data.source';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-incident-comments',
  templateUrl: './incident-comments.component.html',
  styleUrls: ['./incident-comments.component.css']
})
export class IncidentCommentsComponent implements OnInit {
  form;
  commentForm;
  newComment = [];
  processing = false;
  incidents;
  enabledComments = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private incidentService: IncidentService
  ) {
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ])
      ]
    });
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }

  //     // Function to get all incidents from the database
  // getAllIncidents() {
  //   // Function to GET all incidents from database
  //   this.incidentService.getIncidents().subscribe(data => {
  //     this.incidents = data.incidents; // Assign array to use in HTML
  //   });
  // }

  // Function to post a new comment on incident post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the incident post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }

  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.incidentService.postComment(id, comment).subscribe(data => {
      // this.getAllIncidents(); // Refresh all incidents to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the incident id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current incident post id to array
  }
  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  ngOnInit() {}
}

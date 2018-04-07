import {Component, ViewChild} from '@angular/core';

import {Post} from '../shared/post.model';
import {PostService} from '../shared/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';

@Component({
  selector: 'app-remove-post-dialog',
  templateUrl: './remove-post.dialog.html',
})

export class RemovePostDialogComponent {
  constructor() {
  }
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent {
  posts: Post[];
  newPostForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.newPostForm = this.formBuilder.group({
      'id': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
  }
  createNewPost(newPost: Post) {
    this.postService.createPost(newPost).subscribe((newPostWithId) => {
      this.posts.push(newPostWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  seePostDetails(post): void {
    if (post.default) {
      this.router.navigate([AppConfig.routes.postes + '/' + post.id]);
    }
  }

  remove(postToRemove: Post): void {
    const dialogRef = this.dialog.open(RemovePostDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePostById(postToRemove.id).subscribe(() => {
          this.postService.showSnackBar('postRemoved');
          this.posts = this.posts.filter(post => post.id !== postToRemove.id);
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'postDefault';
          }
        });
      }
    });
  }
}

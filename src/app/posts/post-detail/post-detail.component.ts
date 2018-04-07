import {Component} from '@angular/core';
import {Post} from '../shared/post.model';
import {PostService} from '../shared/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})

export class PostDetailComponent {
  post: Post;
  canVote: boolean;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.postService.getPostById(params['id']).subscribe((post: Post) => {
          this.post = post;
        });
      }
    });
  }


}

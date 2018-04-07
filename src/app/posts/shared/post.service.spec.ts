import {async, TestBed} from '@angular/core/testing';
import {PostService} from './post.service';

import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('PostService', () => {
  let postService;
  let newPostCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        PostService
      ]
    });

    postService = TestBed.get(PostService);
  });

  it('should contains posts', async(() => {
    postService.getAllPosts().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.posts);
    });
  }));

  it('should get post  by id 1', async(() => {
    postService.getPostById('1').subscribe((post) => {
      expect(post.id).toEqual(1);
    });
  }));

  it('should fail getting post by no id', async(() => {
    postService.getPostById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty post', async(() => {
    postService.createPost({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId post', async(() => {
    postService.deletepostById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  
  it('should return json response error', async(() => {
    expect(postService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('should create post', async(() => {
    postService.createPost({
      'description': '',
    }).subscribe((post) => {
      newPostCreated = post;
      expect(post.id).not.toBeNull();
    });
  }));

  

  

  it('should delete a post', async(() => {
    postService.deletePostById(newPostCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});

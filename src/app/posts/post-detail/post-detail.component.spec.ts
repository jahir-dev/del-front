import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {PostDetailComponent} from './post-detail.component';
import {PostsModule} from '../posts.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {PostService} from '../shared/post.service';

describe('PostDetailComponent', () => {
  let fixture;
  let component;
  let postService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        PostsModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        PostService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    postService = TestBed.get(PostService);
  }));

  it('should create post detail component', (() => {
    expect(component).toBeTruthy();
  }));

  
});

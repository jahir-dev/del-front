import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PostRoutingModule} from './posts-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {PostListComponent, RemovePostDialogComponent} from './post-list/post-list.component';
import {PostService} from './shared/post.service';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostsComponent} from './posts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PostRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsComponent,
    PostListComponent,
    RemovePostDialogComponent,
    PostDetailComponent
  ],
  entryComponents: [
    RemovePostDialogComponent
  ],
  providers: [
    PostService
  ]
})

export class PostsModule {
}

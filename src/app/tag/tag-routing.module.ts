import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagListComponent} from './tag-list/tag-list.component';
import {TagDetailComponent} from './tag-detail/tag-detail.component';
import {TagComponent} from './tag.component';

const heroesRoutes: Routes = [
  {
    path: '',
    component: TagComponent,
    children: [
      {path: '', component: TagListComponent},
      {path: ':id', component: TagDetailComponent}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

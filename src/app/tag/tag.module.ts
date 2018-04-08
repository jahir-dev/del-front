import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './tag-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import { TagListComponent,  RemoveTagDialogComponent } from './tag-list/tag-list.component';
import {TagService} from './shared/tag.service';
import {TagDetailComponent, NotifyUpdateComponent} from './tag-detail/tag-detail.component';
import {TagComponent} from './tag.component';

@NgModule({
 imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
   TagComponent,
   TagListComponent,
    RemoveTagDialogComponent,
    NotifyUpdateComponent,
    TagDetailComponent
  ],
 entryComponents: [
    RemoveTagDialogComponent,
    NotifyUpdateComponent
  ],
  providers: [
    TagService
  ]
  })
export class TagModule { }

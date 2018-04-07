import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ReponseRoutingModule} from './reponses-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {ReponseListComponent, RemoveReponseDialogComponent} from './reponse-list/reponse-list.component';
import {ReponseService} from './shared/reponse.service';
import {ReponseDetailComponent} from './reponse-detail/reponse-detail.component';
import {ReponsesComponent} from './reponses.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReponseRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReponsesComponent,
    ReponseListComponent,
    RemoveReponseDialogComponent,
    ReponseDetailComponent
  ],
  entryComponents: [
    RemoveReponseDialogComponent
  ],
  providers: [
    ReponseService
  ]
})

export class ReponsesModule {
}

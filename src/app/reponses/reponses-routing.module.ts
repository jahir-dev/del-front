import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReponseListComponent} from './reponse-list/reponse-list.component';
import {ReponseDetailComponent} from './reponse-detail/reponse-detail.component';
import {ReponsesComponent} from './reponses.component';

const ReponsesRoutes: Routes = [
  {
    path: '',
    component: ReponsesComponent,
    children: [
      {path: 'reponses/', component: ReponseListComponent},
      {path: ':id', component: ReponseDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ReponsesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ReponseRoutingModule {
}

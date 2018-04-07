import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SpecialiteListComponent} from './specialite-list/specialite-list.component';
import {SpecialiteDetailComponent} from './specialite-detail/specialite-detail.component';
import {SpecialitesComponent} from './specialites.component';

const specialitesRoutes: Routes = [
  {
    path: '',
    component: SpecialitesComponent,
    children: [
      {path: '', component: SpecialiteListComponent},
      {path: ':id', component: SpecialiteDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(specialitesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SpecialiteRoutingModule {
}

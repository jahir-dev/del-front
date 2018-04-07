import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SpecialiteRoutingModule} from './specialites-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {SpecialiteListComponent, RemoveSpecialiteDialogComponent} from './specialite-list/specialite-list.component';
import {SpecialiteService} from './shared/specialite.service';
import {SpecialiteDetailComponent} from './specialite-detail/specialite-detail.component';
import {SpecialitesComponent} from './specialites.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SpecialiteRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    SpecialitesComponent,
    SpecialiteListComponent,
    RemoveSpecialiteDialogComponent,
    SpecialiteDetailComponent
  ],
  entryComponents: [
    RemoveSpecialiteDialogComponent
  ],
  providers: [
    SpecialiteService
  ]
})

export class SpecialitesModule {
}

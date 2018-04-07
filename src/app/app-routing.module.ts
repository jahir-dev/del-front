import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TagListComponent} from './tag/tag-list/tag-list.component';
import {HeroTopComponent} from './heroes/hero-top/hero-top.component';
import {SpecialiteListComponent} from './specialites/specialite-list/specialite-list.component';
import {AppConfig} from './config/app.config';
import {Error404Component} from './core/error404/error-404.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  //{path: '', component: HeroTopComponent},
   {path: AppConfig.routes.heroes, loadChildren: 'app/heroes/heroes.module#HeroesModule'},
   {path: AppConfig.routes.tags, loadChildren: 'app/tag/tag.module#TagModule'},
   {path: AppConfig.routes.specialites, loadChildren: 'app/specialites/specialites.module#SpecialitesModule'},
   {path: AppConfig.routes.error404, component: Error404Component},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}

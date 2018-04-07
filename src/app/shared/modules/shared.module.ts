import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReponseService} from '../../reponses/shared/reponse.service';
import {PostService} from '../../posts/shared/post.service';
import {HeroService} from '../../heroes/shared/hero.service';
import {SpecialiteService} from '../../specialites/shared/specialite.service';
import {TagService} from '../../tag/shared/tag.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SampleModule} from 'angular-example-library';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    SampleModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    SampleModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        HeroService,
        ReponseService,
        PostService,
        SpecialiteService,
        TagService
      ]
    };
  }
}

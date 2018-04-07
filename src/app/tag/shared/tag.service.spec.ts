import {async, TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';

import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('TagService', () => {
 let TagService;
  let newTagCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        TagService
      ]
    });
    TagService = TestBed.get(TagService);
  });

  it('devrait contenir TAGS', async(() => {
    TagService.getAllTags().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.tags);
    });
  }));

   it('devrait obtenir le tag par id 1', async(() => {
    TagService.getTagById('1').subscribe((tag) => {
      expect(tag.id).toEqual(1);
    });
  }));

it('devrait échouer à créer un objet vide ', async(() => {
    TagService.createTag({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

   it('la suppression est echoué ', async(() => {
    TagService.deleteTagById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));


  it('devrait renvoyer l erreur de réponse json', async(() => {
    expect(TagService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('créer un tag', async(() => {
    TagService.createTag({
      'name': 'test',
      'alterEgo': 'test'
    }).subscribe((tag) => {
      newTagCreated = tag;
      expect(tag.id).not.toBeNull();
    });
  }));

 it('devrait supprimer un tag', async(() => {
    TagService.deleteTagById(newTagCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});
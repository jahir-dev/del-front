import {async, TestBed} from '@angular/core/testing';
import {ReponseService} from './reponse.service';

import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('ReponseService', () => {
  let reponseService;
  let newReponseCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ReponseService
      ]
    });

    reponseService = TestBed.get(ReponseService);
  });

  it('should contains reponses', async(() => {
    reponseService.getAllReponsees().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.reponses);
    });
  }));

  it('should get reponse by id 1', async(() => {
    reponseService.getReponseById('1').subscribe((reponse) => {
      expect(reponse.id).toEqual(1);
    });
  }));

  it('should fail getting reponse by no id', async(() => {
    reponseService.getReponseById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty reponse', async(() => {
    reponseService.createReponse({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId reponse', async(() => {
    reponseService.deleteReponseById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));



  it('should return json response error', async(() => {
    expect(reponseService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('should create reponse', async(() => {
    reponseService.createReponse({
      'id': 'test',
      'description': 'test'
    }).subscribe((reponse) => {
      newReponseCreated = reponse;
      expect(reponse.id).not.toBeNull();
    });
  }));

  

  

  it('should delete a reponse', async(() => {
    reponseService.deleteReponseById(newReponseCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});

import {async, TestBed} from '@angular/core/testing';
import {SpecialiteService} from './specialite.service';

import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('SpecialiteService', () => {
  let specialiteService;
  let newSpecialiteCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        SpecialiteService
      ]
    });

    specialiteService = TestBed.get(SpecialiteService);
  });

  it('should contains specialites', async(() => {
    specialiteService.getAllSpecialites().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.specialites);
    });
  }));

  it('should get specialite by id 1', async(() => {
    specialiteService.getSpecialiteById('1').subscribe((specialite) => {
      expect(specialite.id).toEqual(1);
    });
  }));

  it('should fail getting specialite by no id', async(() => {
    specialiteService.getSpecialiteById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty specialite', async(() => {
    specialiteService.createSpecialite({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId specialite', async(() => {
    specialiteService.deleteSpecialiteById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  

  it('should return json response error', async(() => {
    expect(specialiteService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('should create specialite', async(() => {
    specialiteService.createSpecialite({
      'name': 'test',
      'alterEgo': 'test'
    }).subscribe((specialite) => {
      newSpecialiteCreated = specialite;
      expect(specialite.id).not.toBeNull();
    });
  }));

 

 

  it('should delete a hero', async(() => {
    specialiteService.deleteSpecialiteById(newSpecialiteCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});

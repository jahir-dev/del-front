import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {ReponseDetailComponent} from './reponse-detail.component';
import {ReponsesModule} from '../Reponses.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {ReponseService} from '../shared/reponse.service';

describe('ReponseDetailComponent', () => {
  let fixture;
  let component;
  let reponseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        ReponsesModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ReponseService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReponseDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    reponseService = TestBed.get(ReponseService);
  }));

  it('should create reponse detail component', (() => {
    expect(component).toBeTruthy();
  }));

});

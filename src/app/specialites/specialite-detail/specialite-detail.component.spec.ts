import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {SpecialiteDetailComponent} from './specialite-detail.component';
import {SpecialitesModule} from '../specialites.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {SpecialiteService} from '../shared/specialite.service';

describe('SpecialiteDetailComponent', () => {
  let fixture;
  let component;
  let specialiteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        SpecialitesModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        SpecialiteService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialiteDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    specialiteService = TestBed.get(SpecialiteService);
  }));

  it('should create specialite detail component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should like a specialite', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});

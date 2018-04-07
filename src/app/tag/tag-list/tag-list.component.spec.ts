import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import { TagListComponent } from './tag-list.component';
import {TagModule} from '../tag.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

describe('TagListComponent', () => {
 let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
 imports: [
        TestsModule,
        TranslateModule.forRoot(),
        TagModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagListComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create tag list component', (() => {
    expect(component).toBeTruthy();
  }));
});

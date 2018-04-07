import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';
import {MatSnackBar} from '@angular/material';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private translateService: TranslateService,
              private title: Title,
              private meta: Meta,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.translateService = translateService;
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');

    this.title.setTitle('docteur en ligne');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this.meta.updateTag({
              name: 'description',
              content: 'docteur en ligne'
            });
            break;
              case '/tags' + AppConfig.routes.heroes:
            this.title.setTitle('la gestion des tags');
            this.meta.updateTag({
              name: 'description',
              content: 'la liste des tags'
            });
            break;
            case '/posts' + AppConfig.routes.posts:
            this.title.setTitle('la liste des posts');
            this.meta.updateTag({
              name: 'description',
              content: 'la liste des posts'
            });
            break;
            case '/reponses' + AppConfig.routes.reponses:
            this.title.setTitle('la liste des reponses');
            this.meta.updateTag({
              name: 'description',
              content: 'la liste des reponses'
            });
            break;
            case '/specialites' + AppConfig.routes.specialites:
            this.title.setTitle('la liste des specialités');
            this.meta.updateTag({
              name: 'description',
              content: 'la liste des specialites'
            });
            break;
          case '/' + AppConfig.routes.heroes:
            this.title.setTitle('Heroes list');
            this.meta.updateTag({
              name: 'description',
              content: 'List of super-heroes'
            });
            break;
        }
      }
    });

    this.checkBrowserFeatures();
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.translateService.get(['updateBrowser']).subscribe((texts) => {
        this.snackBar.open(texts['updateBrowser'], 'OK');
      });
    }

    return supported;
  }
}

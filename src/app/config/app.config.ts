import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    heroes: 'heroes',
    error404: '404',
    tags: 'tags',
    posts: 'posts',
    specialites: 'specialites',
    reponses: 'reponses'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes',
     tags:   'http://localhost:3080/tags',
     posts:   'http://localhost:3080/posts',
     reponses:   'http://localhost:3080/reponses',
     specialites: 'http://localhost:3080/specialites'
 },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app'
};

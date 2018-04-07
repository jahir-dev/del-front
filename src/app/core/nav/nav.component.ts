import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {ProgressBarService} from '../progress-bar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  currentLang: string;

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private progressBarService: ProgressBarService,
              private translateService: TranslateService) {
    this.appConfig = appConfig;
    this.loadMenus();
    this.currentLang = this.translateService.currentLang;

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  private loadMenus(): void {
    this.translateService.get(['acceuil', 'Gestion des Tags', 'Gestion des Spécialités'], {}).subscribe((texts: any) => {
      this.menuItems = [
        {link: '/', name: texts['acceuil']},
        {link: '/' + AppConfig.routes.tags, name: texts['Gestion des Tags']},
        {link: '/' + AppConfig.routes.specialites, name: texts['Gestion des Spécialités']},
      ];
    });
  }
}

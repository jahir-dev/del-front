import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Reponse} from './reponse.model';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ReponseService {
  private headers: HttpHeaders;
  private reponsesUrl: string;
  private translations: any;

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {
    this.reponsesUrl = AppConfig.endpoints.reponses;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['reponseCreated', 'saved', 'reponseRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  getAllReponses(): Observable<Reponse[]> {
    return this.http.get(this.reponsesUrl)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getReponseById(reponseId: string): Observable<Reponse> {
    return this.http.get(this.reponsesUrl + '/' + reponseId)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createReponse(reponse: any): Observable<Reponse> {
    return this.http
      .post(this.reponsesUrl, JSON.stringify({
        name: reponse.name,
        alterEgo: reponse.alterEgo
      }), {headers: this.headers})
      .map(response => {
        this.showSnackBar('reponseCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  deleteReponseById(id: any): Observable<Array<Reponse>> {
    const url = `${this.reponsesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.showSnackBar('reponseRemoved');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}

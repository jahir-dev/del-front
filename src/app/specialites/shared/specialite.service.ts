import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Specialite} from './specialite.model';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class SpecialiteService {
  private headers: HttpHeaders;
  private specialitesUrl: string;
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
    this.specialitesUrl = AppConfig.endpoints.specialites;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['specialiteCreated', 'saved', 'specialiteRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  getAllSpecialites(): Observable<Specialite[]> {
    return this.http.get(this.specialitesUrl)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getSpecialiteById(specialiteId: string): Observable<Specialite> {
    return this.http.get(this.specialitesUrl + '/' + specialiteId)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createSpecialite(specialite: any): Observable<Specialite> {
    return this.http
      .post(this.specialitesUrl, JSON.stringify({
        name: specialite.name,
        alterEgo: specialite.alterEgo
      }), {headers: this.headers})
      .map(response => {
        this.showSnackBar('specialiteCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

 


  deleteSpecialiteById(id: any): Observable<Array<Specialite>> {
    const url = `${this.specialitesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.showSnackBar('specialiteRemoved');
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

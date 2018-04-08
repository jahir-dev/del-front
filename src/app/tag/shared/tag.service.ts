import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import { Tag } from './tag.model';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TagService {
 private headers: HttpHeaders;
  private tagsUrl: string;
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
    this.tagsUrl = AppConfig.endpoints.tags;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['tagCreated', 'saved', 'tagRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

    getAllTags(): Observable<Tag[]> {
    return this.http.get(this.tagsUrl)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

   getTagById(tagId: string): Observable<Tag> {
    return this.http.get(this.tagsUrl + '/' + tagId)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

    createTag(tag: any): Observable<Tag> {
    return this.http
      .post(this.tagsUrl, JSON.stringify({
        label: tag.label,
      }), {headers: this.headers})
      .map(response => {
        this.showSnackBar('tag est créé');
        return response;
      })
      .catch(error => this.handleError(error));
  }
  updateTag (tag: Tag): Observable<any> {
  return this.http.put(this.tagsUrl + '/' + tag.id, tag, {headers: this.headers})
    .map((response) => {
        this.showSnackBar('tag est modifié');
        return response;
      })
      .catch(error => this.handleError(error));
  }

deleteTagById(id: any): Observable<Array<Tag>> {
  console.log('dans le service methode deleteTagById');
    const url = `${this.tagsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.showSnackBar('tag est supprimé');
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

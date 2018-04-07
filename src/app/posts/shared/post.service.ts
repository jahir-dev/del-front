import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Post} from './post.model';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PostService {
  private headers: HttpHeaders;
  private postsUrl: string;
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
    this.postsUrl = AppConfig.endpoints.posts;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['postCreated', 'saved', 'postRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get(this.postsUrl + '/' + postId)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createPost(post: any): Observable<Post> {
    return this.http
      .post(this.postsUrl, JSON.stringify({
        name: post.name,
        alterEgo: post.alterEgo
      }), {headers: this.headers})
      .map(response => {
        this.showSnackBar('postCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

 


  deletePostById(id: any): Observable<Array<Post>> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.showSnackBar('postRemoved');
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

import {Component} from '@angular/core';
import {Reponse} from '../shared/reponse.model';
import {ReponseService} from '../shared/reponse.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reponse-detail',
  templateUrl: './reponse-detail.component.html',
  styleUrls: ['./reponse-detail.component.scss']
})

export class ReponseDetailComponent {
  reponse: Reponse;
  canVote: boolean;

  constructor(private reponseService: ReponseService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.reponseService.getReponseById(params['id']).subscribe((reponse: Reponse) => {
          this.reponse = reponse;
        });
      }
    });
  }


}

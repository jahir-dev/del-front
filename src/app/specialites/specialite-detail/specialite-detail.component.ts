import {Component} from '@angular/core';
import {Specialite} from '../shared/specialite.model';
import {SpecialiteService} from '../shared/specialite.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-specialite-detail',
  templateUrl: './specialite-detail.component.html',
  styleUrls: ['./specialite-detail.component.scss']
})

export class SpecialiteDetailComponent {
  specialite: Specialite;
  canVote: boolean;

  constructor(private specialiteService: SpecialiteService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.specialiteService.getSpecialiteById(params['id']).subscribe((specialite: Specialite) => {
          this.specialite = specialite;
        });
      }
    });
  }

}

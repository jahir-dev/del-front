import {Component, ViewChild} from '@angular/core';

import {Specialite} from '../shared/specialite.model';
import {SpecialiteService} from '../shared/specialite.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';

@Component({
  selector: 'app-remove-specialite-dialog',
  templateUrl: './remove-specialite.dialog.html',
})

export class RemoveSpecialiteDialogComponent {
  constructor() {
  }
}

@Component({
  selector: 'app-specialite-list',
  templateUrl: './specialite-list.component.html',
  styleUrls: ['./specialite-list.component.scss']
})

export class SpecialiteListComponent {
  specialites: Specialite[];
  newSpecialiteForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private specialiteService: SpecialiteService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.newSpecialiteForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'alterEgo': ['', [Validators.required]]
    });
/*
    this.specialiteService.getAllSpecialites().subscribe((specialites: Array<Specialite>) => {
      this.specialites = specialites.sort((a, b) => {
        return b.likes - a.likes;
      });
    });*/
  }

  createNewSpecialite(newSpecialite: Specialite) {
    this.specialiteService.createSpecialite(newSpecialite).subscribe((newSpecialiteWithId) => {
      this.specialites.push(newSpecialiteWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  seeSpecialiteDetails(specialite): void {
    if (specialite.default) {
      this.router.navigate([AppConfig.routes.specialites + '/' + specialite.id]);
    }
  }

  remove(specialiteToRemove: Specialite): void {
    const dialogRef = this.dialog.open(RemoveSpecialiteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialiteService.deleteSpecialiteById(specialiteToRemove.id).subscribe(() => {
          this.specialiteService.showSnackBar('specialiteRemoved');
          this.specialites = this.specialites.filter(specialite => specialite.id !== specialiteToRemove.id);
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'specialiteDefault';
          }
        });
      }
    });
  }
}

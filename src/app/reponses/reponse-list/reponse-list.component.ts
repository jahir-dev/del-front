import {Component, ViewChild} from '@angular/core';

import {Reponse} from '../shared/reponse.model';
import {ReponseService} from '../shared/reponse.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';

@Component({
  selector: 'app-remove-reponse-dialog',
  templateUrl: './remove-reponse.dialog.html',
})

export class RemoveReponseDialogComponent {
  constructor() {
  }
}


@Component({
  selector: 'app-reponse-list',
  templateUrl: './reponse-list.component.html',
  styleUrls: ['./reponse-list.component.scss']
})

export class ReponseListComponent {
  reponses: Reponse[];
  newReponseForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private reponseService: ReponseService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder) {

this.newReponseForm = this.formBuilder.group({
'name': ['', [Validators.required]],
'alterEgo': ['', [Validators.required]]
});
/*
this.reponseService.getAllReponses().subscribe((reponses: Array<Reponse>) => {
this.reponses = reponses.sort((a, b) => {
return b.likes - a.likes;
});
});*/
    }



createNewReponse(newReponse: Reponse) {
this.reponseService.createReponse(newReponse).subscribe((newReponseWithId) => {
this.reponses.push(newReponseWithId);
this.myNgForm.resetForm();
}, (response: Response) => {
if (response.status === 500) {
this.error = 'errorHasOcurred';
}
});
}

seeReponseDetails(reponse): void {
if (reponse.default) {
this.router.navigate([AppConfig.routes.reponses + '/' + reponse.id]);
}
}

remove(reponseToRemove: Reponse): void {
const dialogRef = this.dialog.open(RemoveReponseDialogComponent);
dialogRef.afterClosed().subscribe(result => {
if (result) {
this.reponseService.deleteReponseById(reponseToRemove.id).subscribe(() => {
this.reponseService.showSnackBar('reponseRemoved');
this.reponses = this.reponses.filter(reponse => reponse.id !== reponseToRemove.id);
}, (response: Response) => {
if (response.status === 500) {
  this.error = 'reponseDefault';
}
});
}
});
}
}

import { Component, OnInit } from '@angular/core';

import {Tag} from '../shared/tag.model';
import {TagService} from '../shared/tag.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';
import { ViewChild } from '@angular/core';
@Component({
   selector: 'app-remove-tag-dialog',
   templateUrl: './remove-tag.dialog.html',
})
export class RemoveTagDialogComponent {
  constructor() {
  }
}

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})

export class TagListComponent {
  tags: Tag[];
  newTagForm: FormGroup;
  canVote = false;
  error: string;

 @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private tagService: TagService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.newTagForm = this.formBuilder.group({
      'label': ['', [Validators.required]],
    });

    this.tagService.getAllTags().subscribe(tags => this.tags = tags );

  }


  createNewTag(newTag: Tag) {
    this.tagService.createTag(newTag).subscribe((newTagWithId) => {
      this.tags.push(newTagWithId);
      this.myNgForm.resetForm();
      location.reload();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  seeTagDetails(tag): void {
      this.router.navigate([AppConfig.routes.tags + '/' + tag.id]);
  }

  remove(tagToRemove: Tag): void {
    this.tagService.deleteTagById(tagToRemove.id).subscribe(
      () => {
        location.reload();
      }
    );
    // this.router.navigate(['tags']);
  }
}

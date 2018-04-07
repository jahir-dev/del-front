import { Component, OnInit } from '@angular/core';
import {Tag} from '../shared/tag.model';
import {TagService} from '../shared/tag.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent  {
  tag: Tag;

    constructor(private tagService: TagService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.tagService.getTagById(params['id']).subscribe((tag: Tag) => {
          this.tag = tag;
        });
      }
    });
  }
}

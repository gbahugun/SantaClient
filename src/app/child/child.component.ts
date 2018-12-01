import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Child } from '../models/child';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  public child: Child;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getChild();
  }

  getChild(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getChild(id)
      .subscribe(child => { this.child = child; console.log(this.child); });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.dataService.updateChild(this.child, this.child.id)
      .subscribe(() => this.goBack());
  }

}

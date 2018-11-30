import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Child } from '../models/child'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: Child[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getList(): void {
    this.dataService.getChildren()
      .subscribe(children => { this.list = children; console.log(children); });
  }

}

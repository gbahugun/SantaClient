import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Child } from '../models/child'
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: Child[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.dataService.getChildren()
      .subscribe(children => { this.list = children; console.log(this.list);});
  }

  deleteChild(child: Child): void {
    this.list = this.list.filter(c => c !== child);
    this.dataService.deleteChild(child.id).subscribe(() => { this.getList; });
  }
}

@Pipe({ name: 'naughtyNice' })
export class NaughtyNicePipe implements PipeTransform {
  transform(value) {
    return value ? 'Naughty' : 'Nice';
  }
}

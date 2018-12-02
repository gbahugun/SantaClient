import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Child } from '../models/child'
import { Pipe, PipeTransform } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: Child[] = [];
  private token;
  private tokenPayload;
  public role;
  public admin: boolean;

  constructor(private dataService: DataService, public jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.admin = this.isAdmin();
    this.getList();
  }

  getList(): void {
    this.dataService.getChildren()
      .subscribe(children => { this.list = children; console.log(this.role); });
  }

  deleteChild(child: Child): void {
    this.list = this.list.filter(c => c !== child);
    this.dataService.deleteChild(child.id).subscribe(() => { this.getList; });
  }

  isAdmin(): boolean {
    this.token = localStorage.getItem('access_token');
    this.tokenPayload = this.jwtHelper.decodeToken(this.token);
    this.role = this.tokenPayload.role;
    if (this.role == "Admin") {
      return true;
    }
    return false;
  }
}

@Pipe({ name: 'naughtyNice' })
export class NaughtyNicePipe implements PipeTransform {
  transform(value) {
    return value ? 'Naughty' : 'Nice';
  }
}

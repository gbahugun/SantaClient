import { Component, OnInit } from '@angular/core';
import { Child } from '../models/child';
import { DataService } from '../data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent{

  public child: Child;

  childForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthday: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  constructor(private dataService: DataService) { }

  addChild(child: Child): void {
    this.dataService.addChild(child)
      .subscribe(() => { console.log(this.child); });
  }

  onSubmit() {
    this.child = this.childForm.value;
    this.addChild(this.child);
  }

}

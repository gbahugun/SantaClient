import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  public email: string;
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: DataService, private router: Router) { }

  public login() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['list']),
        err => this.error = 'Could not authenticate'
      );
  }

  public submit() {
    this.auth.register(this.email, this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.login(),
        err => this.error = 'Could not register'
      );
  }
}

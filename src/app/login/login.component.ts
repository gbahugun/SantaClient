import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: DataService, private router: Router) { }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
      result => this.router.navigate(['list']),
        err => this.error = 'Could not authenticate'
      );
  }
}

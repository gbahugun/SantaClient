import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getChildren() {
    return this.http.get('https://gbsantaapi.azurewebsites.net/api/children')
  }

  login() {
    return this.http.post('https://gbsantaapi.azurewebsites.net/login').pipe
  }

  register() {
    return this.http.get('https://gbsantaapi.azurewebsites.net/register')
  }
}

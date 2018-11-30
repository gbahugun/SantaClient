import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Child } from './models/child';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'https://gbsanta.azurewebsites.net';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.URL}/login`;
    return this.http.post<{ token: string }>(url, { username: username, password: password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  register(email: string, username: string, password: string): Observable<any> {
    const url = `${this.URL}/register`;
    return this.http.post(url, { email: email, username: username, password: password })
      .pipe(
      catchError(this.handleError)
      );
  }

  getChildren(): Observable<Child[]> {
    const url = `${this.URL}/api/children`;
    return this.http.get(url)
      .pipe(
        map(
          (res: Response) => res.json()
        )
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getChild(id: number): Observable<Child> {
    const url = `${this.URL}/api/children/${id}`;
    return this.http.get(url).pipe(
      map(
        (res: Response) => res.json()
      )
    );
  }

  /** POST: add a new hero to the database */
  addChild(child: Child): Observable<Child> {
    const url = `${this.URL}/api/children`;
    return this.http.post(url, child)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete the hero from the server */
  deleteChild(id: number): Observable<{}> {
    const url = `${this.URL}/api/children/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update the hero on the server */
  updateChild(child: Child, id: number): Observable<any> {
    const url = `${this.URL}/api/children/${id}`;
    return this.http.put(url, child).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

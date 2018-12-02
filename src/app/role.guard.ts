import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, public jwtHelper: JwtHelperService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const expectedRole = next.data.expectedRole;
    const token = localStorage.getItem('access_token');
    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (token) {
      if (tokenPayload.role !== expectedRole) {
        this.router.navigate(['list']);
        return false;
      }
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}

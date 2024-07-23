import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: string;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.url = GLOBAL.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId) && window.localStorage) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    if (isPlatformBrowser(this.platformId) && window.localStorage) {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        return false;
      }
try{
      const helper = new JwtHelperService();
      var decodedToken =helper.decodeToken(token);
      if (!decodedToken){
        console.log('No Acceso');
        localStorage.removeItem('token');
        return false;
      }
    }catch (error){
      localStorage.removeItem('token');
      return false;
    }
      return allowRoles.includes(decodedToken['role']);
    }
    return false;
  }
}

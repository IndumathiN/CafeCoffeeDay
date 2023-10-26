import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, User } from '../model/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_HOST = "http://localhost:3001/";
  constructor(private httpCient: HttpClient) { }

  login(userName: string, password: string): Observable<User>{
    const url = this.URL_HOST + "api/login";
    const body: LoginData = {
      email: userName,
      password: password
    };
    return this.httpCient.post<User>(url, body);
  }
}

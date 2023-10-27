import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterData, User } from '../model/auth'
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
  register(signupData:RegisterData): Observable<RegisterData>{
    const url = this.URL_HOST + "api/register";
    const body: RegisterData = signupData;
    return this.httpCient.post<RegisterData>(url, body);
  }
}

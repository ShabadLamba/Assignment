import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type User = { name: string; email: string; role: string; id: string };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginUrl = '/api/auth/login';
  static user: User;

  constructor(private https: HttpClient) {}

  login(data, headers) {
    const httpOptions = { ...headers };
    return this.https.post(this.loginUrl, data, httpOptions);
  }
}

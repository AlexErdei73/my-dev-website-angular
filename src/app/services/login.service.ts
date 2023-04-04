import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { User } from '../model/user';

interface LoginResponse {
  success: boolean;
  user: User | undefined;
  token: string | undefined;
  msg: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginState!: Login;
  constructor(private http: HttpClient) {
    this.loginState = {
      success: false,
      password: '',
      user: {
        _id: '',
        username: '',
        hash: '',
        isAdmin: false,
        name: '',
        jobTitle: '',
        bio: '',
      },
      token: '',
      msg: '',
    };
  }

  get state(): Login {
    return this.loginState;
  }

  set state(loginState: Login) {
    this.loginState = loginState;
  }

  login() {
    const uname = this.loginState.user.username;
    const pwd = this.loginState.password;
    this.http
      .post<LoginResponse>(
        'https://radiant-crag-39178.herokuapp.com/users/login',
        {
          username: uname,
          password: pwd,
        }
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.loginState = res as Login;
          }
        },
      });
  }

  resetPassword() {
    this.loginState.password = '';
  }
}

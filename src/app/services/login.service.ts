import { Injectable } from '@angular/core';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginState!: Login;
  constructor() {
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

  resetPassword() {
    this.loginState.password = '';
  }
}

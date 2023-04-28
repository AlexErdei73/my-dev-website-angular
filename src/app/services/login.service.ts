import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { User } from '../model/user';
import { ErrorHandlingService } from './error-handling.service';

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
  private setLoginState: any;
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
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
      } as User,
      token: '',
      msg: '',
    };
    //get loginState from localStorage
    const initialLoginState: Login = JSON.parse(
      localStorage.getItem('loginState') as string
    );
    if (initialLoginState) this.loginState = initialLoginState;
  }

  get state(): Login {
    return this.loginState;
  }

  set state(loginState: Login) {
    this.loginState = loginState;
  }

  private handleErrorCallBack = (errors: { msg: string }[]) => {
    this.loginState.msg = errors[0].msg;
    this.loginState.success = false;
    this.setLoginState(this.loginState);
  };

  login(setLoginstate: any) {
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
            //user logged in successfully
            this.resetPassword(); //Do not store password as it is sensitive information!!!
            //Store newLoginState, which contains the token, in localStorage
            localStorage.setItem('loginState', JSON.stringify(this.loginState));
            setLoginstate(this.loginState);
          }
        },
        error: (err) => {
          this.setLoginState = setLoginstate;
          this.errorHandlingService.handleErrors(err, this.handleErrorCallBack);
        },
      });
  }

  resetPassword() {
    this.loginState.password = '';
  }

  logout() {
    this.loginState.token = '';
    this.loginState.user.username = '';
    this.loginState.success = false;
    this.resetPassword();
    localStorage.removeItem('loginState');
  }

  createUser(user: User) {
    return this.http.post<{ success: boolean; errors: { msg: string }[] }>(
      'https://radiant-crag-39178.herokuapp.com/users/login',
      user
    );
  }

  updateUser(user: User, token: string) {
    return this.http.put<{ success: boolean; errors: { msg: string }[] }>(
      `https://radiant-crag-39178.herokuapp.com/users/${user._id}`,
      user,
      {
        headers: { ['Authorization']: token },
      }
    );
  }
}

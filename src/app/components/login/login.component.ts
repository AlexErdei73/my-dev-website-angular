import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface User {
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  loginState = this._loginState.state;
  login: User = {
    name: this.loginState.user.username,
    password: this.loginState.password,
  };
  constructor(private _loginState: LoginService) {}

  private setLoginMsg(msg: string) {
    this.loginState.msg = msg;
    this._loginState.state = this.loginState;
  }

  onSubmit(loginForm: { valid: any }) {
    let msg;
    if (!loginForm.valid) {
      msg = 'Please fill in all fields!';
      this.setLoginMsg(msg);
    }
    if (loginForm.valid) {
      this.setLoginMsg('');
      this.loginState.user.username = this.login.name;
      this.loginState.password = this.login.password;
      this._loginState.state = this.loginState;
      this._loginState.login();
      setTimeout(() => {
        this.loginState = this._loginState.state;
        console.log(this.loginState);
      }, 0);
      msg = this.loginState.msg;
    }
    window.alert(msg);
  }
}

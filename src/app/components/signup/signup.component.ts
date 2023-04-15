import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface Signup {
  username: string;
  password: string | undefined;
  name: string | undefined;
  jobTitle: string | undefined;
  bio: string | undefined;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  loginSuccess = this.loginService.state.success;
  errors: { msg: string }[] = [];
  signup: Signup = {
    username: '',
    password: '',
    name: '',
    jobTitle: '',
    bio: '',
  };
  ngOnInit(): void {}

  onSubmit(signupForm: { valid: any }) {
    if (signupForm.valid) {
      this.errors = [];
      console.log('Form valid!', this.signup);
    } else {
      this.errors.push({ msg: 'Form Invalid!' });
      console.log('Form Invalid!');
    }
  }
}

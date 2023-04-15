import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  loginSuccess = this.loginService.state.success;
  errors: { msg: string }[] = [];
  signup = {
    username: '',
    password: '',
    name: '',
    jobTitle: '',
    bio: '',
  } as User;
  ngOnInit(): void {}

  onSubmit(signupForm: { valid: any }) {
    if (signupForm.valid) {
      this.errors = [];
      console.log('Form valid!', this.signup);
      this.loginService.createUser(this.signup).subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    } else {
      this.errors.push({ msg: 'Form Invalid!' });
      console.log('Form Invalid!');
    }
  }
}

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
  errors!: { msg: string }[];
  signup = {
    username: '',
    password: '',
    name: '',
    jobTitle: '',
    bio: '',
  } as User;
  ngOnInit(): void {
    this.errors = [];
  }

  onSubmit(signupForm: { valid: any }) {
    if (signupForm.valid) {
      this.errors = [];
      this.loginService.createUser(this.signup).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          const error = err.error;
          if (err.status === 0) this.errors = [{ msg: error.message }];
          if (err.status === 401) this.errors = [{ msg: error.msg }];
          if (err.status !== 0 && err.status !== 401)
            this.errors = error.errors;
        },
      });
    } else {
      this.errors.push({ msg: 'Username and Password are required!' });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private errorHandling: ErrorHandlingService
  ) {}
  loginSuccess = this.loginService.state.success;
  errors!: { msg: string }[];
  signup = this.loginSuccess
    ? this.loginService.state.user
    : ({
        username: '',
        password: '',
        name: '',
        jobTitle: '',
        bio: '',
      } as User);
  ngOnInit(): void {
    this.errors = [];
  }

  onSubmit(signupForm: { valid: any }) {
    if (signupForm.valid) {
      this.errors = [];
      if (!this.loginSuccess)
        this.loginService.createUser(this.signup).subscribe({
          next: () => {
            this.router.navigateByUrl('/login');
          },
          error: (err) =>
            this.errors.push(this.errorHandling.handleErrors(err)[0]),
        });
      if (this.loginSuccess)
        this.loginService
          .updateUser(this.signup, this.loginService.state.token)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/login');
            },
            error: (err) =>
              this.errors.push(this.errorHandling.handleErrors(err)[0]),
          });
    } else {
      this.errors.push({ msg: 'Username and Password are required!' });
    }
  }
}

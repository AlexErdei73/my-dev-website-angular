import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleErrors(
    err: { error: any; status: number; message: string },
    done?: any
  ) {
    let errors: { msg: string }[] = [];
    const error = err.error;
    if (err.status === 0) errors = [{ msg: err.message }];
    if (err.status === 401) errors = [{ msg: error.msg }];
    if (err.status !== 0 && err.status !== 401) errors = error.errors;
    if (done) done(errors);
    return errors;
  }
}

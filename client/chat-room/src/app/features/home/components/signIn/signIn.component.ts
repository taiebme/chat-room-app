import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, AuthService} from '../../../../services';

@Component({
  selector: 'sign-in',
  templateUrl: 'signIn.component.html'
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  formSubmitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // easy access to form fields
  get form(): any {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    // check if form is valid
    if (this.signInForm.valid) {
      this.loading = true;
      this.authenticationService.signIn(this.form.email.value, this.form.password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['/rooms']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }
}

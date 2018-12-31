import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthService} from '../../../../services';


@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    formSubmitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            nickname: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // getter for easy access to form instance
    get form(): any {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.formSubmitted = true;

        // check if form is valid
        if (this.registerForm.valid) {
            this.loading = true;
            this.authService.signUp(this.registerForm.value)
                .subscribe(
                    () => {
                        this.alertService.success('Registration successful');
                        this.router.navigate(['/rooms']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }
}

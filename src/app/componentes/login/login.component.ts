import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { ToastrService } from 'ngx-toastr';
import { FIREBASE_ERRORS } from '../../helper/firebase-errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  valid: false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    console.log('login');
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage =
          FIREBASE_ERRORS[error.code] ||
          'Ocurrió un error inesperado. Intenta de nuevo.';
        this.toastr.error(errorMessage, 'Error');
        /* this.toastr.error(error, 'Error'); */
      });
  }

  /* prueba() {
    if (!this.valid) {
      this.toastr.error('error');
    }
  } */
}

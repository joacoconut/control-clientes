import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { ToastrService } from 'ngx-toastr';

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
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('desde error');
        this.toastr.error(error.message, 'Error');
      });
  }

  /* prueba() {
    if (!this.valid) {
      this.toastr.error('error');
    }
  } */
}

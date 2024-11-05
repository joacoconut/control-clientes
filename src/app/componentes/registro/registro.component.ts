import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../servicios/login.service';
import { error } from 'console';
import express from 'express';
import { FIREBASE_ERRORS } from '../../helper/firebase-errors';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  email: string;
  password: string;

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

  registro() {
    this.loginService
      .registrarse(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage =
          FIREBASE_ERRORS[error.code] ||
          'Ocurrió un error inesperado. Intenta de nuevo.';
        this.toastr.error(errorMessage, 'Error');
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private routerService: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.routerService.navigate(['/home']);
    }
  }

  onSubmit(): void {
    console.log('in submit')
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.settoken(data.token);
        this.routerService.navigate(['/home']);
      },
      error: err => {
        console.log('err', err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  forgotPassword(): void {
    alert('Oops');
  }
}

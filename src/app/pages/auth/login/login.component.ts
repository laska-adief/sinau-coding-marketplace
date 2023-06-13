import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/interfaces/login-dto';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  login() {
    const loginData: LoginDTO = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        if (res?.message === 'LOGIN SUCCESS') {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Success',
          });
          res.data['logindate'] = new Date();
          this.authService.setLoginDataLocalStorage(JSON.stringify(res?.data));
          this.router.navigate(['/dashboard']);
        } else if (res?.message === 'LOGIN FAILED') {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Username or Password is Incorrect',
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/interfaces/register-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  profilname: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    const registerData: RegisterDTO = {
      username: this.username,
      profilname: this.profilname,
      password: this.password,
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        if (res) {
          console.log('sucees register');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

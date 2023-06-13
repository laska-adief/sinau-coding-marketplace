import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../interfaces/login-dto';
import { RegisterDTO } from '../interfaces/register-dto';
import { ProfilDTO } from '../interfaces/profil-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO) {
    return this.http.post('http://159.223.57.121:8090/auth/login', loginData);
  }

  setLoginDataLocalStorage(profilData: string) {
    localStorage.setItem('profil', profilData);
  }

  isLogin() {
    const profil: any = localStorage.getItem('profil');
    const profilData = JSON.parse(profil);
    if (profilData?.token) {
      return true;
    }

    return false;
  }

  register(registerData: RegisterDTO) {
    return this.http.post(
      'http://159.223.57.121:8090/auth/register',
      registerData
    );
  }

  getProfilInfo() {
    const profil: any = localStorage.getItem('profil');
    const profilData = JSON.parse(profil);

    if (profilData) {
      return profilData;
    }

    return null;
  }
}

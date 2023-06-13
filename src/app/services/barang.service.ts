import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { BarangDTO } from '../interfaces/barang-dto';

@Injectable({
  providedIn: 'root',
})
export class BarangService {
  token: string = '';
  header;

  isForm = new BehaviorSubject(false);
  isForm$ = this.isForm.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    const profil = authService.getProfilInfo();
    if (profil?.token) this.token = profil.token;
    this.header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  readonly URL = 'http://159.223.57.121:8090/';

  getAllBarang(page: number = 1, limit: number) {
    return this.http.get(`${this.URL}barang/find-all`, {
      params: { offset: page, limit: limit },
      headers: this.header,
    });
  }

  getOneBarang(id: number) {
    return this.http.get(`${this.URL}barang/find-by-id/${id}`, {
      headers: this.header,
    });
  }

  tambahBarang(dataBarang: BarangDTO) {
    return this.http.post(`${this.URL}barang/create`, dataBarang, {
      headers: this.header,
    });
  }

  updateBarang(dataBarang: BarangDTO, id: number) {
    return this.http.put(`${this.URL}barang/update/${id}`, dataBarang, {
      headers: this.header,
    });
  }

  hapusBarang(id: number) {
    return this.http.delete(`${this.URL}barang/delete/${id}`, {
      headers: this.header,
    });
  }
}

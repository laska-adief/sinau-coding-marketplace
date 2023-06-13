import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { SupplierDTO } from '../interfaces/supplier-dto';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
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

  getAllSupplierNoLimit(page: number = 1) {
    return this.http.get(`${this.URL}supplier/find-all`, {
      params: { offset: page, limit: 1000 },
      headers: this.header,
    });
  }

  getAllSupplier(page: number = 1, limit: number) {
    return this.http.get(`${this.URL}supplier/find-all`, {
      params: { offset: page, limit: limit },
      headers: this.header,
    });
  }

  getOneSupplier(id: number) {
    return this.http.get(`${this.URL}supplier/find-by-id/${id}`, {
      headers: this.header,
    });
  }

  tambahSupplier(dataSupplier: SupplierDTO) {
    return this.http.post(`${this.URL}supplier/create`, dataSupplier, {
      headers: this.header,
    });
  }

  updateSupplier(dataSupplier: SupplierDTO, id: number) {
    return this.http.put(`${this.URL}supplier/update/${id}`, dataSupplier, {
      headers: this.header,
    });
  }

  hapusSupplier(id: number) {
    return this.http.delete(`${this.URL}supplier/delete/${id}`, {
      headers: this.header,
    });
  }
}

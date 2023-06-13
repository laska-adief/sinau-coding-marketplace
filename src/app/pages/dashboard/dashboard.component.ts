import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BarangService } from 'src/app/services/barang.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profilData: any;
  isForm: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private barangService: BarangService
  ) {}

  ngOnInit(): void {
    this.getProfile();

    this.router.events.subscribe({
      next: (val) => {
        console.log('val rounte change vent', val);
        if (val instanceof NavigationEnd) {
          if (
            val.url === '/dashboard/barang/tambah' ||
            val.url.includes('/dashboard/barang/update/') ||
            val.url === '/dashboard/supplier/tambah' ||
            val.url.includes('/dashboard/supplier/update/')
          ) {
            this.isForm = true;
          } else {
            this.isForm = false;
          }
        }
      },
    });

    this.barangService.isForm$.subscribe({
      next: (val) => {
        if (
          this.router.url === '/dashboard/barang/tambah' ||
          this.router.url.includes('/dashboard/barang/update/') ||
          this.router.url === '/dashboard/supplier/tambah' ||
          this.router.url.includes('/dashboard/supplier/update/')
        ) {
          this.isForm = true;
        } else {
          this.isForm = false;
        }
      },
    });
  }

  getProfile() {
    this.profilData = this.authService.getProfilInfo();
    console.log(this.profilData);
  }
}

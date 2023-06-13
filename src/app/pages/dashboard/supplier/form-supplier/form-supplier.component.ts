import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-form-supplier',
  templateUrl: './form-supplier.component.html',
  styleUrls: ['./form-supplier.component.scss'],
})
export class FormSupplierComponent implements OnInit {
  isUpdate: boolean = false;
  namasupplier: string = '';
  alamatsupplier: string = '';
  notelpsupplier: string = '';
  supplierIdUpdate: number = 0;

  constructor(
    private supplierService: SupplierService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isTambahOrUpdate();
  }

  isTambahOrUpdate() {
    if (this.router.url === '/dashboard/supplier/tambah') {
      this.isUpdate = false;
    } else {
      this.route.params.subscribe({
        next: (val: any) => {
          if (val?.id) {
            this.supplierIdUpdate = val.id;
            this.setDataForUpdate();
          }
        },
      });
      this.isUpdate = true;
    }
  }

  setDataForUpdate() {
    this.supplierService.getOneSupplier(this.supplierIdUpdate).subscribe({
      next: (res: any) => {
        if (res?.data) {
          console.log('one supplier', res);
          const dataSupplier = res.data;
          this.namasupplier = dataSupplier.namaSupplier;
          this.alamatsupplier = dataSupplier.alamat;
          this.notelpsupplier = dataSupplier.noTelp;
        }
      },
    });
  }

  submit() {
    if (this.isUpdate) {
      this.updateSupplier();
    } else {
      this.tambahSupplier();
    }
  }

  createPayload() {
    const dataSupplier = {
      namaSupplier: this.namasupplier,
      alamat: this.alamatsupplier,
      noTelp: this.notelpsupplier,
    };
    console.log('data Supplier', dataSupplier);
    return dataSupplier;
  }

  tambahSupplier() {
    const dataSupplier = this.createPayload();
    this.supplierService.tambahSupplier(dataSupplier).subscribe({
      next: (res: any) => {
        if (res?.message === 'SAVE SUCCESS') {
          console.log('suscces');
          this.messageService.add({
            severity: 'success',
            summary: 'Supplier Berhasil Ditambah',
          });
          this.namasupplier = '';
          this.alamatsupplier = '';
          this.notelpsupplier = '';
        }
      },
    });
  }

  updateSupplier() {
    const supplierData = this.createPayload();
    this.supplierService
      .updateSupplier(supplierData, this.supplierIdUpdate)
      .subscribe({
        next: (res: any) => {
          if (res?.message === 'UPDATE SUCCES') {
            console.log('suscces');
            this.messageService.add({
              severity: 'success',
              summary: 'Supplier Berhasil Diupdate',
            });
            this.setDataForUpdate();
            // this.router.navigate(['dashboard/barang']);
          }
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SupplierDTO } from 'src/app/interfaces/supplier-dto';
import { BarangService } from 'src/app/services/barang.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-form-barang',
  templateUrl: './form-barang.component.html',
  styleUrls: ['./form-barang.component.scss'],
})
export class FormBarangComponent implements OnInit {
  isUpdate: boolean = false;
  barangIdUpdate: number = 0;
  namabarang: string = '';
  hargabarang: number = 0;
  stokbarang: number = 0;
  supplierbarang: number = 0;

  supplierList: SupplierDTO[] = [];
  constructor(
    private barangService: BarangService,
    private supplierService: SupplierService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isTambahOrUpdate();
    this.getAllSupplier();
  }

  isTambahOrUpdate() {
    if (this.router.url === '/dashboard/barang/tambah') {
      this.isUpdate = false;
    } else {
      this.route.params.subscribe({
        next: (val: any) => {
          if (val?.id) {
            this.barangIdUpdate = val.id;
            this.setDataForUpdate();
          }
        },
      });
      this.isUpdate = true;
    }
  }

  setDataForUpdate() {
    this.barangService.getOneBarang(this.barangIdUpdate).subscribe({
      next: (res: any) => {
        if (res?.data) {
          console.log('one barang', res);
          const dataBarang = res.data;
          this.namabarang = dataBarang.namaBarang;
          this.hargabarang = dataBarang.harga;
          this.stokbarang = dataBarang.stok;
          this.supplierbarang = dataBarang.supplier.id;
        }
      },
    });
  }

  getAllSupplier() {
    this.supplierService.getAllSupplierNoLimit().subscribe({
      next: (res: any) => {
        if (res?.data?.length) {
          console.log('res supplier', res);
          this.supplierList = res.data.reverse();
        }
      },
    });
  }

  submit() {
    if (this.isUpdate) {
      this.updateBarang();
    } else {
      this.tambahBarang();
    }
  }

  createPayload() {
    const supplierData: SupplierDTO | any = this.supplierList.find(
      (sup) => sup.id == this.supplierbarang
    );

    const dataBarang = {
      namaBarang: this.namabarang,
      stok: this.stokbarang,
      harga: this.hargabarang,
      supplier: supplierData,
    };
    console.log('data Barang', dataBarang);
    return dataBarang;
  }

  tambahBarang() {
    const dataBarang = this.createPayload();
    this.barangService.tambahBarang(dataBarang).subscribe({
      next: (res: any) => {
        if (res?.message === 'SAVE SUCCESS') {
          console.log('suscces');
          this.messageService.add({
            severity: 'success',
            summary: 'Barang Berhasil Ditambah',
          });
          this.namabarang = '';
          this.hargabarang = 0;
          this.stokbarang = 0;
          this.supplierbarang = 0;
        }
      },
    });
  }

  updateBarang() {
    const dataBarang = this.createPayload();
    this.barangService.updateBarang(dataBarang, this.barangIdUpdate).subscribe({
      next: (res: any) => {
        if (res?.message === 'UPDATE SUCCES') {
          console.log('suscces');
          this.messageService.add({
            severity: 'success',
            summary: 'Barang Berhasil Diupdate',
          });
          this.setDataForUpdate();
          // this.router.navigate(['dashboard/barang']);
        }
      },
    });
  }
}

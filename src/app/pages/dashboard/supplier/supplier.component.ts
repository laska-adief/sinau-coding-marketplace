import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { SupplierDTO } from 'src/app/interfaces/supplier-dto';
import { BarangService } from 'src/app/services/barang.service';
import { SupplierService } from 'src/app/services/supplier.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  supplierData: SupplierDTO[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  limit: number = 10;

  fileName = 'SupplierData.xlsx';

  constructor(
    private barangService: BarangService,
    private supplierService: SupplierService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllSupplier();
  }

  getAllSupplier(event?: LazyLoadEvent | any) {
    let page = 1;
    if (event?.first && event?.rows) {
      page = event?.first / event?.rows + 1;
    }
    console.log('lm', this.limit);
    this.loading = true;
    this.supplierService.getAllSupplier(page, this.limit).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.data?.length) {
          this.loading = false;
          this.supplierData = res.data;
          this.totalRecords = res.total_record;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  tambahUpdateSupplier() {
    this.barangService.isForm.next(true);
  }

  hapusSupplier(id: number) {
    this.supplierService.hapusSupplier(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'DELETE SUCCESS') {
          this.messageService.add({
            severity: 'success',
            summary: 'Delete Success',
          });
          this.getAllSupplier();
        }
      },
    });
  }

  changePage(event: any) {
    if (event.rows) {
      this.limit = event.rows;
      this.getAllSupplier();
    }
  }

  exportSupplier() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}

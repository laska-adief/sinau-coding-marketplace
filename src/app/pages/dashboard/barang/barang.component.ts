import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { BarangDTO } from 'src/app/interfaces/barang-dto';
import { BarangService } from 'src/app/services/barang.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-barang',
  templateUrl: './barang.component.html',
  styleUrls: ['./barang.component.scss'],
})
export class BarangComponent implements OnInit {
  barangData: BarangDTO[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  limit: number = 10;

  fileName = 'BarangData.xlsx';

  constructor(
    private barangService: BarangService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllBarang();
  }

  getAllBarang(event?: LazyLoadEvent | any) {
    let page = 1;
    if (event?.first && event?.rows) {
      page = event?.first / event?.rows + 1;
    }

    this.loading = true;
    this.barangService.getAllBarang(page, this.limit).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.data?.length) {
          this.loading = false;
          this.barangData = res.data;
          this.totalRecords = res.total_record;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  tambahUpdateBarang() {
    this.barangService.isForm.next(true);
  }

  hapusBarang(id: number) {
    this.barangService.hapusBarang(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'DELETE SUCCESS') {
          this.messageService.add({
            severity: 'success',
            summary: 'Delete Success',
          });
          this.getAllBarang();
        }
      },
    });
  }

  changePage(event: any) {
    if (event.rows) {
      this.limit = event.rows;
      this.getAllBarang();
    }
  }

  exportBarang() {
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

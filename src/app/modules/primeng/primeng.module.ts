import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

const modules = [ToastModule, TableModule];

@NgModule({
  declarations: [],
  imports: [...modules, CommonModule],
  exports: [...modules],
})
export class PrimengModule {}

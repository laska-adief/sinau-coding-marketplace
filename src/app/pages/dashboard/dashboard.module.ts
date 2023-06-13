import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BarangComponent } from './barang/barang.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PrimengModule } from 'src/app/modules/primeng/primeng.module';
import { FormBarangComponent } from './barang/form-barang/form-barang.component';
import { FormSupplierComponent } from './supplier/form-supplier/form-supplier.component';

@NgModule({
  declarations: [DashboardComponent, BarangComponent, SupplierComponent, FormBarangComponent, FormSupplierComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, PrimengModule],
})
export class DashboardModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BarangComponent } from './barang/barang.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FormBarangComponent } from './barang/form-barang/form-barang.component';
import { FormSupplierComponent } from './supplier/form-supplier/form-supplier.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'barang', pathMatch: 'full' },
      { path: 'barang', component: BarangComponent },
      { path: 'barang/tambah', component: FormBarangComponent },
      { path: 'barang/update/:id', component: FormBarangComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'supplier/tambah', component: FormSupplierComponent },
      { path: 'supplier/update/:id', component: FormSupplierComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

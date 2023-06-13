import { SupplierDTO } from './supplier-dto';

export interface BarangDTO {
  id?: number;
  namaBarang: string;
  stok: number;
  harga: number;
  supplier: SupplierDTO;
}

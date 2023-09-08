import { RowDataPacket } from "mysql2";

export interface iProduct extends RowDataPacket {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}

export interface iPackedProduct extends RowDataPacket {
  code: number;
  name: string;
  sales_price: number;
  pack_id: number;
  qty: number;
}

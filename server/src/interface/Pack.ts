import { RowDataPacket } from "mysql2";

export interface iPack extends RowDataPacket {
  id?: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

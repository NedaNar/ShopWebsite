import { ProductType } from "../utils/ProductType";

export interface Item {
  id: number;
  name: string;
  type: ProductType;
  img: string;
  descr: string;
  price: number;
  itemCpunt: number;
}

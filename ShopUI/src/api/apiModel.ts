import { ProductCategory } from "../utils/ProductCategory";

export interface Item {
  id: number;
  name: string;
  category: ProductCategory;
  img: string;
  descr: string;
  price: number;
  itemCount: number;
}

export interface Rating {
  id: number;
  comment: string;
  itemRating: number;
}

export interface CartItem extends Item {
  quantity: number;
}

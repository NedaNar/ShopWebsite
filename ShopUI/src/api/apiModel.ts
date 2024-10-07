import { OrderStatus } from "../utils/OrderStatus";
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

export interface CartItem extends Item {
  quantity: number;
}

export interface Rating {
  id?: number;
  comment: string;
  itemRating: number;
  userId: number;
  itemId: number;
}

export interface Order {
  id?: number;
  totalPrice: number;
  address: string;
  phoneNumber: string;
  orderDate: string;
  status: OrderStatus;
  userId: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id?: number;
  quantity: number;
  itemId: number;
  item?: Item;
}

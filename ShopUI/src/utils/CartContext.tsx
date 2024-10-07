import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Item } from "../api/apiModel";
import { useNavigate } from "react-router";
import { toastInfo, toastSuccess } from "./toastUtils";

interface CartContextProps {
  children: React.ReactNode;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item, showToast?: boolean) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
}

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateItemQuantity: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export const CartProvider = ({ children }: CartContextProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item: Item, showToast?: boolean) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

    let newCart: CartItem[];

    if (itemInCart) {
      newCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (showToast)
      toastSuccess(
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{`${item.name} added to cart!`}</span>
          <button
            className="btn-small"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => {
              console.log("click");
              navigate("/cart");
            }}
          >
            View Cart
          </button>
        </div>
      );
  };

  const removeFromCart = (itemId: number) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toastInfo(`Item removed from cart.`);
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

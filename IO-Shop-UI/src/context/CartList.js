import { createContext, useContext } from 'react';

export const CartList= createContext();

export function useCartList() {
  return useContext(CartList);
}
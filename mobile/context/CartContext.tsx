import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Product } from '../data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  total: number;
  count: number;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'nocti_cart_mobile_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    })();
  }, [items]);

  const add = (product: Product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, quantity: Math.min(i.quantity + qty, 99) } : i);
      return [...prev, { id: product.id, product, quantity: Math.min(qty, 99) }];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const increase = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, 99) } : i));
  const decrease = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 0) } : i).filter(i => i.quantity > 0));
  const clear = () => setItems([]);

  const { total, count } = useMemo(() => {
    const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    return { total, count };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, total, count, add, remove, increase, decrease, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

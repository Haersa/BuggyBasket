'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BasketContext = createContext();

const GUEST_BASKET_KEY = 'guest_basket';

function getGuestBasket() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_BASKET_KEY)) || [];
  } catch {
    return [];
  }
}

function saveGuestBasket(items) {
  localStorage.setItem(GUEST_BASKET_KEY, JSON.stringify(items));
}

export function BasketProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  };

  const fetchBasket = useCallback(async () => {
    if (!isLoggedIn()) {
      setItems(getGuestBasket());
      return;
    }
    try {
      const res = await fetch('/api/basket', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch basket:', err);
    }
  }, []);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const mergeGuestBasket = useCallback(async () => {
    const guestItems = getGuestBasket();
    if (guestItems.length === 0) return;
    const token = localStorage.getItem('token');
    for (const item of guestItems) {
      await fetch('/api/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: item.product_id, quantity: item.quantity }),
      });
    }
    localStorage.removeItem(GUEST_BASKET_KEY);
    await fetchBasket();
  }, [fetchBasket]);

  const addItem = async (product_id, quantity = 1, productDetails = null) => {
    if (!isLoggedIn()) {
      const guestBasket = getGuestBasket();
      const existing = guestBasket.find((i) => i.product_id === product_id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        guestBasket.push({
          id: Date.now(),
          product_id,
          quantity,
          name: productDetails?.name || 'Product',
          price: productDetails?.price || 0,
          image_url: productDetails?.image_url || null,
        });
      }
      saveGuestBasket(guestBasket);
      setItems([...guestBasket]);
      return true;
    }
    const res = await fetch('/api/basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ product_id, quantity }),
    });
    if (res.ok) { await fetchBasket(); return true; }
    return false;
  };

  const removeItem = async (id) => {
    if (!isLoggedIn()) {
      const guestBasket = getGuestBasket().filter((i) => i.id !== id);
      saveGuestBasket(guestBasket);
      setItems(guestBasket);
      return;
    }
    const res = await fetch(`/api/basket/item?itemId=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.ok) await fetchBasket();
  };

  const updateQuantity = async (id, quantity) => {
    if (!isLoggedIn()) {
      const guestBasket = getGuestBasket().map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      saveGuestBasket(guestBasket);
      setItems(guestBasket);
      return;
    }
    const res = await fetch(`/api/basket/item?itemId=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) await fetchBasket();
  };

  const clearBasket = async () => {
    if (!isLoggedIn()) {
      localStorage.removeItem(GUEST_BASKET_KEY);
      setItems([]);
      return;
    }
    const res = await fetch('/api/basket', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.ok) setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <BasketContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearBasket,
      fetchBasket,
      mergeGuestBasket,
      itemCount,
      total,
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
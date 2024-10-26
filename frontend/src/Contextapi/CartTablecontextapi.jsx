import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartTableProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  
  const updateCart = (updatedCart) => {
    setCarts(updatedCart);
  };

  return (
    <CartContext.Provider value={{ carts, updateCart,setCarts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useUpdatedCarts = () => useContext(CartContext);

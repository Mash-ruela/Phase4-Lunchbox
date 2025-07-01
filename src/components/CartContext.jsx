import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Use product_id if id is not available
      const productId = product.id || product.product_id;
      
      // Check if product already exists in cart
      const existingItem = prev.find(item => 
        (item.id === productId) || (item.product_id === productId)
      );
      
      if (existingItem) {
        // If exists, increase quantity
        return prev.map(item =>
          (item.id === productId || item.product_id === productId)
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // If new, add to cart with quantity 1
        return [...prev, { 
          ...product, 
          id: productId, // Ensure consistent ID field
          quantity: 1 
        }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + (parseFloat(item.product_cost) * (item.quantity || 1)),
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
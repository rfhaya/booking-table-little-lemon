import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getPrice,
  calculateSubtotal,
} from "../utils/orderUtils";

const CartContext = createContext();

/* =========================================
   CART PROVIDER
========================================= */

export function CartProvider({ children }) {
  /* =========================================
     INITIAL CART
  ========================================= */

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        "littleLemonCart"
      );

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      /*
        Normalize cart data.

        This ensures:
        - price is always a valid number
        - quantity is always valid
      */
      return parsedCart.map((item) => ({
        ...item,
        price: getPrice(item.price),
        quantity: Math.max(
          1,
          Number(item.quantity) || 1
        ),
      }));
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });

  /* =========================================
     SAVE CART TO LOCAL STORAGE
  ========================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        "littleLemonCart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cart]);

  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = (
    product,
    quantity = 1
  ) => {
    if (!product?.id) {
      return;
    }

    const safeQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    /*
      Convert price safely.

      Example:
      "$9.00" → 9
      "$12.99" → 12.99
      15 → 15
    */
    const normalizedPrice = getPrice(
      product.price
    );

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      /* ITEM ALREADY EXISTS */

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 0) +
                  safeQuantity,
              }
            : item
        );
      }

      /* ADD NEW ITEM */

      return [
        ...prevCart,
        {
          ...product,
          price: normalizedPrice,
          quantity: safeQuantity,
        },
      ];
    });
  };

  /* =========================================
     REMOVE FROM CART
  ========================================= */

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================
     UPDATE QUANTITY
  ========================================= */

  const updateQuantity = (
    id,
    quantity
  ) => {
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity)) {
      return;
    }

    /* REMOVE IF QUANTITY <= 0 */

    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = () => {
    setCart([]);

    try {
      localStorage.removeItem(
        "littleLemonCart"
      );
    } catch (error) {
      console.error(
        "Failed to clear cart:",
        error
      );
    }
  };

  /* =========================================
     CART ITEM COUNT
  ========================================= */

  const cartCount = cart.reduce(
    (total, item) => {
      return (
        total +
        (Number(item.quantity) || 0)
      );
    },
    0
  );

  /* =========================================
     CART SUBTOTAL
  ========================================= */

  const cartSubtotal =
    calculateSubtotal(cart);

  /* =========================================
     PROVIDER
  ========================================= */

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================================
   CUSTOM HOOK
========================================= */

export function useCart() {
  const context = useContext(
    CartContext
  );

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;

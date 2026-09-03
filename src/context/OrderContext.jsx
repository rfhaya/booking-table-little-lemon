import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  /* ========================================
     LOAD ORDER FROM LOCAL STORAGE
  ======================================== */

  const [order, setOrder] = useState(() => {
    try {
      const savedOrder =
        localStorage.getItem("lastOrder");

      if (!savedOrder) {
        return null;
      }

      return JSON.parse(savedOrder);
    } catch (error) {
      console.error(
        "Failed to load saved order:",
        error
      );

      return null;
    }
  });

  /* ========================================
     SAVE ORDER TO LOCAL STORAGE
  ======================================== */

  useEffect(() => {
    try {
      if (order) {
        localStorage.setItem(
          "lastOrder",
          JSON.stringify(order)
        );
      } else {
        localStorage.removeItem(
          "lastOrder"
        );
      }
    } catch (error) {
      console.error(
        "Failed to save order:",
        error
      );
    }
  }, [order]);

  /* ========================================
     CREATE ORDER
  ======================================== */

  const createOrder = (orderData) => {
    const now = new Date();

    const newOrder = {
      id: `ORDER-${Date.now()}`,

      orderNumber: `LLM-${Date.now()
        .toString()
        .slice(-7)}`,

      /*
        STATUS AWAL
      */
      status: "confirmed",

      /*
        IMPORTANT:
        ISO STRING agar timer realtime
        bisa menghitung waktu dengan benar
      */
      createdAt: now.toISOString(),

      estimatedDelivery:
        orderData?.delivery?.method ===
        "pickup"
          ? "20 - 30 minutes"
          : "30 - 45 minutes",

      /*
        ORDER DATA
      */
      ...orderData,
    };

    setOrder(newOrder);

    return newOrder;
  };

  /* ========================================
     UPDATE STATUS
  ======================================== */

  const updateOrderStatus = (status) => {
    const allowedStatuses = [
      "confirmed",
      "preparing",
      "delivery",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return;
    }

    setOrder((prevOrder) => {
      if (!prevOrder) {
        return null;
      }

      return {
        ...prevOrder,
        status,
      };
    });
  };

  /* ========================================
     CLEAR ORDER
  ======================================== */

  const clearOrder = () => {
    setOrder(null);

    try {
      localStorage.removeItem("lastOrder");
    } catch (error) {
      console.error(
        "Failed to clear order:",
        error
      );
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        createOrder,
        updateOrderStatus,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used inside OrderProvider"
    );
  }

  return context;
}
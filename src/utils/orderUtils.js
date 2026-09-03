export const TAX_RATE = 0.0875;

export const FREE_DELIVERY_MINIMUM = 50;

export const DELIVERY_FEE = 4.99;

/* =========================================
   PRICE NORMALIZER
========================================= */

export const getPrice = (price) => {
  // Already a number
  if (typeof price === "number") {
    return Number.isFinite(price) ? price : 0;
  }

  // String price
  if (typeof price === "string") {
    const cleanedPrice = price
      .replace(/[^0-9.,-]/g, "")
      .replace(",", ".");

    const parsedPrice = parseFloat(cleanedPrice);

    return Number.isFinite(parsedPrice)
      ? parsedPrice
      : 0;
  }

  return 0;
};

/* =========================================
   FORMAT PRICE
========================================= */

export const formatPrice = (price) => {
  return `$${getPrice(price).toFixed(2)}`;
};

/* =========================================
   SUBTOTAL
========================================= */

export const calculateSubtotal = (items = []) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    const price = getPrice(item?.price);
    const quantity = Math.max(
      1,
      Number(item?.quantity) || 1
    );

    return total + price * quantity;
  }, 0);
};

/* =========================================
   TAX
========================================= */

export const calculateTax = (subtotal = 0) => {
  return getPrice(subtotal) * TAX_RATE;
};

/* =========================================
   DELIVERY FEE
========================================= */

export const calculateDeliveryFee = (
  subtotal = 0,
  deliveryMethod = "delivery"
) => {
  const safeSubtotal = getPrice(subtotal);

  if (deliveryMethod === "pickup") {
    return 0;
  }

  if (safeSubtotal <= 0) {
    return 0;
  }

  if (safeSubtotal >= FREE_DELIVERY_MINIMUM) {
    return 0;
  }

  return DELIVERY_FEE;
};

/* =========================================
   ORDER TOTAL
========================================= */

export const calculateOrderTotal = ({
  items = [],
  deliveryMethod = "delivery",
} = {}) => {
  const subtotal = calculateSubtotal(items);

  const tax = calculateTax(subtotal);

  const deliveryFee = calculateDeliveryFee(
    subtotal,
    deliveryMethod
  );

  const total =
    subtotal +
    tax +
    deliveryFee;

  return {
    subtotal,
    tax,
    deliveryFee,
    total,
  };
};
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

import { useOrder } from "../../context/OrderContext";

import "./TrackOrder.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faBoxOpen,
  faClipboardCheck,
  faUtensils,
  faStore,
  faMotorcycle,
  faHouse,
  faCheck,
  faLocationDot,
  faClock,
  faCreditCard,
  faMoneyBillWave,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

function TrackOrder() {
  const { order } = useOrder();

  /* ========================================
     REALTIME TIMER
  ======================================== */

  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [fallbackCreatedTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ========================================
     EMPTY STATE
  ======================================== */

  if (!order) {
    return (
      <>
        <Header />

        <main className="trackOrder-page">
          <div className="trackOrder-empty">
            <div className="trackOrder-empty-icon">
              <FontAwesomeIcon icon={faBoxOpen} />
            </div>

            <h1>No Active Order</h1>

            <p>
              You don't have an active order to track right now. Explore our
              menu and place your next order.
            </p>

            <Link to="/menu" className="trackOrder-empty-btn">
              Browse Menu
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /* ========================================
     HELPERS
  ======================================== */

  const parsePrice = (price) => {
    if (typeof price === "number") return price;

    if (typeof price === "string") {
      return Number(price.replace(/[^0-9.-]+/g, "")) || 0;
    }

    return 0;
  };

  const formatPrice = (price) => {
    return `$${Number(price || 0).toFixed(2)}`;
  };

  /* ========================================
     ORDER DATA
  ======================================== */

  const orderItems = Array.isArray(order.items) ? order.items : [];

  const deliveryMethod = String(
    order?.delivery?.method || "delivery",
  ).toLowerCase();

  const isPickup = deliveryMethod === "pickup";

  /* ========================================
     CUSTOMER ADDRESS
  ======================================== */

  const customerEmail = String(order?.customer?.email || "")
    .trim()
    .toLowerCase();

  const isEmail = (value) => {
    if (!value) return false;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  };

  const addressParts = [
    order?.delivery?.address,
    order?.delivery?.street,
    order?.delivery?.apartment,
    order?.delivery?.city,
    order?.delivery?.state,
    order?.delivery?.zipCode,
    order?.delivery?.postalCode,
  ]
    .map((item) => String(item || "").trim())
    .filter((item) => {
      if (!item) return false;

      if (isEmail(item)) return false;

      if (customerEmail && item.toLowerCase() === customerEmail) {
        return false;
      }

      return true;
    });

  const fullAddress = addressParts.join(", ");

  /* ========================================
     INSTRUCTIONS
  ======================================== */

  const instructions =
    order?.note ||
    order?.notes ||
    order?.delivery?.note ||
    order?.delivery?.notes ||
    order?.delivery?.instructions ||
    "No special instructions provided.";

  /* ========================================
     ORDER TIME
  ======================================== */

  let orderCreatedTime = fallbackCreatedTime;

  if (order?.createdAt) {
    const parsedTime = new Date(order.createdAt).getTime();

    if (!Number.isNaN(parsedTime)) {
      orderCreatedTime = parsedTime;
    }
  }

  /* ========================================
     ORDER PROGRESS
  ======================================== */

  const ONE_MINUTE = 60 * 1000;

  const PREPARING_TIME = ONE_MINUTE;
  const THIRD_STEP_TIME = 3 * ONE_MINUTE;
  const FINAL_STEP_TIME = 5 * ONE_MINUTE;

  const elapsedTime = Math.max(0, currentTime - orderCreatedTime);

  let currentStep = 0;

  if (elapsedTime >= FINAL_STEP_TIME) {
    currentStep = 3;
  } else if (elapsedTime >= THIRD_STEP_TIME) {
    currentStep = 2;
  } else if (elapsedTime >= PREPARING_TIME) {
    currentStep = 1;
  }

  /* ========================================
     COUNTDOWN
  ======================================== */

  const formatCountdown = (targetTime) => {
    const remaining = Math.max(0, targetTime - elapsedTime);

    if (remaining <= 0) return "0s";

    const totalSeconds = Math.ceil(remaining / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
    }

    return `${seconds}s`;
  };

  /* ========================================
     ORDER STEPS
  ======================================== */

  const steps = isPickup
    ? [
        {
          id: "placed",
          title: "Order Placed",
          icon: faClipboardCheck,
          description: currentStep === 0 ? "Order received" : "Completed",
        },
        {
          id: "preparing",
          title: "Preparing",
          icon: faUtensils,
          description:
            currentStep >= 1
              ? currentStep === 1
                ? "Kitchen is preparing"
                : "Completed"
              : `Starts in ${formatCountdown(PREPARING_TIME)}`,
        },
        {
          id: "ready",
          title: "Ready for Pickup",
          icon: faStore,
          description:
            currentStep >= 2
              ? currentStep === 2
                ? "Ready at restaurant"
                : "Completed"
              : `Estimated in ${formatCountdown(THIRD_STEP_TIME)}`,
        },
        {
          id: "picked-up",
          title: "Picked Up",
          icon: faCheck,
          description:
            currentStep >= 3
              ? "Order completed"
              : `Estimated in ${formatCountdown(FINAL_STEP_TIME)}`,
        },
      ]
    : [
        {
          id: "placed",
          title: "Order Placed",
          icon: faClipboardCheck,
          description: currentStep === 0 ? "Order received" : "Completed",
        },
        {
          id: "preparing",
          title: "Preparing",
          icon: faUtensils,
          description:
            currentStep >= 1
              ? currentStep === 1
                ? "Kitchen is preparing"
                : "Completed"
              : `Starts in ${formatCountdown(PREPARING_TIME)}`,
        },
        {
          id: "delivery",
          title: "Out for Delivery",
          icon: faMotorcycle,
          description:
            currentStep >= 2
              ? currentStep === 2
                ? "On the way"
                : "Completed"
              : `Estimated in ${formatCountdown(THIRD_STEP_TIME)}`,
        },
        {
          id: "delivered",
          title: "Delivered",
          icon: faHouse,
          description:
            currentStep >= 3
              ? "Order completed"
              : `Estimated in ${formatCountdown(FINAL_STEP_TIME)}`,
        },
      ];

  /* ========================================
     STATUS TEXT
  ======================================== */

  const getStatusTitle = () => {
    if (isPickup) {
      switch (currentStep) {
        case 0:
          return "Your pickup order has been placed";

        case 1:
          return "Your order is being prepared";

        case 2:
          return "Your order is ready for pickup";

        case 3:
          return "Your order has been picked up";

        default:
          return "Order Status";
      }
    }

    switch (currentStep) {
      case 0:
        return "Your order has been placed";

      case 1:
        return "Your order is being prepared";

      case 2:
        return "Your order is on the way";

      case 3:
        return "Your order has been delivered";

      default:
        return "Order Status";
    }
  };

  const getStatusDescription = () => {
    if (isPickup) {
      switch (currentStep) {
        case 0:
          return "We've received your order and will begin preparing it shortly.";

        case 1:
          return "Our kitchen team is currently preparing your food.";

        case 2:
          return "Your order is ready. Please pick it up at the restaurant.";

        case 3:
          return "Your order has been picked up. Enjoy your meal!";

        default:
          return "";
      }
    }

    switch (currentStep) {
      case 0:
        return "We've received your order and will begin preparing it shortly.";

      case 1:
        return "Our kitchen team is currently preparing your food.";

      case 2:
        return "Your delivery partner is heading to your location.";

      case 3:
        return "Your order has been successfully delivered. Enjoy your meal!";

      default:
        return "";
    }
  };

  const getCurrentStatusIcon = () => {
    if (isPickup) {
      if (currentStep === 3) return faCheck;
      if (currentStep === 2) return faStore;
      if (currentStep === 1) return faUtensils;

      return faClipboardCheck;
    }

    if (currentStep === 3) return faHouse;
    if (currentStep === 2) return faMotorcycle;
    if (currentStep === 1) return faUtensils;

    return faClipboardCheck;
  };

  /* ========================================
     PAYMENT
  ======================================== */

  const paymentMethod =
    order?.payment?.method || order?.paymentMethod || "card";

  const normalizedPaymentMethod = String(paymentMethod).toLowerCase();

  const isCashPayment = normalizedPaymentMethod.includes("cash");

  const paymentIcon = isCashPayment ? faMoneyBillWave : faCreditCard;

  const getPaymentLabel = () => {
    if (isCashPayment) {
      return isPickup ? "Cash Payment" : "Cash on Delivery";
    }

    if (normalizedPaymentMethod.includes("paypal")) {
      return "PayPal";
    }

    if (normalizedPaymentMethod.includes("card")) {
      return "Card Payment";
    }

    return paymentMethod;
  };

  const getPaymentStatus = () => {
    if (!isCashPayment) {
      return "Payment completed";
    }

    if (currentStep === 3) {
      return "Payment completed";
    }

    return isPickup ? "Pay at the restaurant" : "Pay cash upon delivery";
  };

  /* ========================================
     TOTALS
  ======================================== */

  const calculatedSubtotal = orderItems.reduce((total, item) => {
    const price = parsePrice(item.price);
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  const subtotal =
    typeof order?.subtotal === "number" ? order.subtotal : calculatedSubtotal;

  const deliveryFee = isPickup
    ? 0
    : typeof order?.deliveryFee === "number"
      ? order.deliveryFee
      : 0;

  const tax = typeof order?.tax === "number" ? order.tax : subtotal * 0.0875;

  const total =
    typeof order?.total === "number"
      ? order.total
      : subtotal + deliveryFee + tax;

  /* ========================================
     DATE
  ======================================== */

  const formatOrderDate = (dateValue) => {
    if (!dateValue) return "Recently";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  /* ========================================
     ESTIMATED TIME
  ======================================== */

  const estimatedTime =
    currentStep === 3
      ? isPickup
        ? "Order picked up"
        : "Order delivered"
      : isPickup
        ? order?.estimatedDelivery || "20 - 30 minutes"
        : order?.estimatedDelivery || "30 - 45 minutes";

  /* ========================================
     RENDER
  ======================================== */

  return (
    <>
      <Header />

      <main className="trackOrder-page">
        <div className="trackOrder-container">
          {/* PAGE HEADING */}

          <section className="trackOrder-heading">
            <div>
              <span className="trackOrder-label">LIVE ORDER STATUS</span>

              <h1>Track Your Order</h1>

              <p>
                {isPickup
                  ? "Follow your order from preparation until it's ready for pickup."
                  : "Follow your order from preparation until it arrives at your door."}
              </p>
            </div>

            <Link to="/menu" className="trackOrder-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} />
              Explore Our Menu
            </Link>
          </section>

          {/* GREEN STATUS CARD */}

          <section className="track-status-card">
            <div className="status-icon">
              <FontAwesomeIcon icon={faBoxOpen} />
            </div>

            <div className="status-main">
              <span className="status-label">CURRENT STATUS</span>

              <h2>{getStatusTitle()}</h2>

              <p>{getStatusDescription()}</p>

              <p className="status-placed-date">
                Placed on {formatOrderDate(order?.createdAt)}
              </p>
            </div>

            <div className="status-order-info">
              <div className="order-number-block">
                <span>ORDER NUMBER</span>

                <strong>{order?.orderNumber || "LM-5816348"}</strong>
              </div>

              <div className="status-divider" />

              <div className="pickup-time">
                <FontAwesomeIcon icon={faClock} />

                <div>
                  <span>
                    {isPickup ? "Estimated Pickup" : "Estimated Delivery"}
                  </span>

                  <strong>{estimatedTime}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================
              BIG CONTENT CARD
          ===================================== */}

          <section className="trackOrder-content-card">
            <div className="trackOrder-grid">
              {/* LEFT COLUMN */}

              <div className="trackOrder-left">
                {/* STATUS */}

                <section className="detail-card status-card">
                  <div className="detail-card-title">
                    <h2>{isPickup ? "Pickup Status" : "Delivery Status"}</h2>
                  </div>

                  <div className="order-progress">
                    {steps.map((step, index) => {
                      const completed = index < currentStep;

                      const active = index === currentStep;

                      return (
                        <div
                          className={`progress-step ${
                            completed ? "completed" : ""
                          } ${active ? "active" : ""}`}
                          key={step.id}
                        >
                          {index !== 0 && (
                            <div
                              className={`progress-line ${
                                index <= currentStep ? "line-completed" : ""
                              }`}
                            />
                          )}

                          <div className="progress-icon">
                            <FontAwesomeIcon
                              icon={completed ? faCheck : step.icon}
                            />
                          </div>

                          <h4>{step.title}</h4>

                          <p>{step.description}</p>

                          {completed && (
                            <span className="step-check">
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="status-message">
                    <div className="status-message-icon">
                      <FontAwesomeIcon icon={getCurrentStatusIcon()} />
                    </div>

                    <div>
                      <h3>{getStatusTitle()}</h3>

                      <p>{getStatusDescription()}</p>
                    </div>
                  </div>
                </section>

                {/* INFORMATION */}

                <section className="detail-card information-card">
                  <div className="information-header">
                    <div className="information-main-icon">
                      <FontAwesomeIcon
                        icon={isPickup ? faStore : faLocationDot}
                      />
                    </div>

                    <h2>
                      {isPickup ? "Pickup Information" : "Delivery Information"}
                    </h2>
                  </div>

                  <div className="information-grid">
                    <div className="information-location">
                      <span className="information-label">
                        {isPickup ? "Pickup Location" : "Delivery Address"}
                      </span>

                      {isPickup ? (
                        <>
                          <strong>Little Lemon Restaurant</strong>

                          <p>Chicago, Illinois</p>
                        </>
                      ) : (
                        <strong>
                          {fullAddress || "Delivery address not provided"}
                        </strong>
                      )}
                    </div>

                    <div className="information-instruction">
                      <span className="information-label">
                        {isPickup
                          ? "Pickup Instructions"
                          : "Delivery Instructions"}
                      </span>

                      <p>{instructions}</p>
                    </div>
                  </div>

                  <div className="information-extra">
                    <div className="extra-row">
                      <div className="extra-icon">
                        <FontAwesomeIcon icon={faClock} />
                      </div>

                      <div>
                        <strong>
                          {isPickup
                            ? "Estimated Pickup Time"
                            : "Estimated Delivery Time"}
                        </strong>

                        <p>{estimatedTime}</p>
                      </div>
                    </div>

                    {!isPickup && (
                      <>
                        <div className="extra-divider" />

                        <div className="extra-row">
                          <div className="extra-icon">
                            <FontAwesomeIcon icon={faMotorcycle} />
                          </div>

                          <div>
                            <strong>Delivery Status</strong>

                            <p>
                              {currentStep < 2
                                ? "Your delivery partner will be assigned soon."
                                : currentStep === 3
                                  ? "Your order has been delivered."
                                  : "Your delivery partner is on the way."}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN */}

              <aside className="trackOrder-right">
                {/* ORDER SUMMARY */}

                <section className="detail-card summary-card">
                  <div className="summary-title">
                    <h2>Order Summary</h2>
                  </div>

                  {/* SCROLL AREA */}

                  <div className="summary-items">
                    {orderItems.length > 0 ? (
                      orderItems.map((item, index) => {
                        const quantity = Number(item.quantity) || 1;

                        const price = parsePrice(item.price);

                        return (
                          <div className="summary-item" key={item.id || index}>
                            <div className="summary-item-image">
                              {item.image ? (
                                <img src={item.image} alt={item.name} />
                              ) : (
                                <div className="summary-placeholder">🍽️</div>
                              )}
                            </div>

                            <div className="summary-item-info">
                              <h3>{item.name}</h3>

                              <p>Qty: {quantity}</p>
                            </div>

                            <strong>{formatPrice(price * quantity)}</strong>
                          </div>
                        );
                      })
                    ) : (
                      <p className="no-order-items">No items found.</p>
                    )}
                  </div>

                  {/* FIXED CALCULATION */}

                  <div className="summary-bottom">
                    <div className="summary-calculation">
                      <div className="summary-row">
                        <span>Subtotal</span>

                        <strong>{formatPrice(subtotal)}</strong>
                      </div>

                      <div className="summary-row">
                        <span>{isPickup ? "Pickup Fee" : "Delivery Fee"}</span>

                        <strong>
                          {deliveryFee === 0
                            ? "FREE"
                            : formatPrice(deliveryFee)}
                        </strong>
                      </div>

                      <div className="summary-row">
                        <span>Tax (8.75%)</span>

                        <strong>{formatPrice(tax)}</strong>
                      </div>
                    </div>

                    <div className="summary-total">
                      <span>Total</span>

                      <strong>{formatPrice(total)}</strong>
                    </div>
                  </div>
                </section>

                {/* PAYMENT */}

                <section className="detail-card payment-card">
                  <h2>Payment Method</h2>

                  <div className="payment-content">
                    <div className="payment-icon">
                      <FontAwesomeIcon icon={paymentIcon} />
                    </div>

                    <div className="payment-info">
                      <strong>{getPaymentLabel()}</strong>

                      <span
                        className={
                          isCashPayment && currentStep < 3
                            ? "payment-pending"
                            : "payment-completed"
                        }
                      >
                        {getPaymentStatus()}
                      </span>
                    </div>

                    <strong className="payment-total">
                      {formatPrice(total)}
                    </strong>
                  </div>
                </section>

                {/* HELP */}

                <section className="detail-card help-card">
                  <div className="help-icon">
                    <FontAwesomeIcon icon={faHeadset} />
                  </div>

                  <div className="help-content">
                    <h3>Need help?</h3>

                    <p>Contact our support team.</p>

                    <span>We're happy to help!</span>
                  </div>

                  <Link to="/contact" className="contact-support-btn">
                    Contact Support
                  </Link>
                </section>
              </aside>
            </div>

            {/* FOOTER INSIDE BIG CARD */}

            <section className="trackOrder-footer-message">
              <div className="footer-message-item">
                <span className="footer-leaf">❦</span>

                <div>
                  <h3>Thank you for ordering from Little Lemon!</h3>

                  <p>We appreciate your support.</p>
                </div>
              </div>

              <div className="footer-message-item footer-message-highlight">
                <span className="footer-leaf">❦</span>

                <div>
                  <h3>Fresh, Authentic, Delivered to You</h3>

                  <p>Made with love, just for you.</p>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>

      <ScrollReveal animation="fade-up" delay={200}>
        <Footer />
      </ScrollReveal>
    </>
  );
}

export default TrackOrder;

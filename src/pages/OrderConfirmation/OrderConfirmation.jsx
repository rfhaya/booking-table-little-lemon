import { Link, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useOrder } from "../../context/OrderContext";

import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faEnvelope,
  faHouse,
  faClock,
  faLocationDot,
  faArrowRight,
  faCreditCard,
faNoteSticky
} from "@fortawesome/free-solid-svg-icons";

import {
  TAX_RATE,
  getPrice,
  formatPrice,
  calculateSubtotal,
} from "../../utils/orderUtils";

function OrderConfirmation() {
  const navigate = useNavigate();
  const { order } = useOrder();

  /* ===============================
     NO ORDER FOUND
  =============================== */

  if (!order) {
    return (
      <>
        <Header />

        <main className="orderConfirm-page">
          <div className="no-order-found">
            <div className="no-order-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <h1>No Order Found</h1>

            <p>
              There is no recent order to display. Please place an order first.
            </p>

            <Link to="/menu" className="browse-menu-btn">
              Browse Menu
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /* ===============================
     ORDER ITEMS
  =============================== */

  const orderItems = Array.isArray(order.items) ? order.items : [];

  /* ===============================
     ORDER CALCULATIONS
  =============================== */

  const calculatedSubtotal = calculateSubtotal(orderItems);

  const orderSubtotal =
    typeof order.subtotal === "number" && Number.isFinite(order.subtotal)
      ? order.subtotal
      : calculatedSubtotal;

  const orderDeliveryFee =
    typeof order.deliveryFee === "number" && Number.isFinite(order.deliveryFee)
      ? order.deliveryFee
      : 0;

  const calculatedTax = orderSubtotal * TAX_RATE;

  const orderTax =
    typeof order.tax === "number" && Number.isFinite(order.tax)
      ? order.tax
      : calculatedTax;

  const calculatedTotal = orderSubtotal + orderDeliveryFee + orderTax;

  const orderTotal =
    typeof order.total === "number" && Number.isFinite(order.total)
      ? order.total
      : calculatedTotal;

  /* ===============================
     DELIVERY INFORMATION
  =============================== */

  const recipientName =
    order?.customer?.fullName || order?.delivery?.recipientName || "Customer";

  const customerEmail = order?.customer?.email || "";

  const deliveryMethod = order?.delivery?.method || "delivery";

  /* ===============================
   PAYMENT & NOTES
=============================== */

const paymentMethod =
  order?.payment?.method ||
  "Not specified";

const orderNotes =
  order?.delivery?.instructions ||
  order?.notes ||
  "";

  const isEmail = (value) => {
    if (!value) return false;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  };

  /* ===============================
     CLEAN DELIVERY ADDRESS

     Only actual address data is used.
     Email will automatically be removed.
  =============================== */

  const fullAddress = [
    order?.delivery?.address,
    order?.delivery?.apartment,
    order?.delivery?.city,
    order?.delivery?.state,
    order?.delivery?.zipCode,
  ]
    .filter((item) => {
      if (!item) return false;

      const value = String(item).trim();

      return value !== "" && !isEmail(value) && value !== customerEmail;
    })
    .join(", ");

  return (
    <>
      <Header />

      <div className="orderConfirm-page">
        <main className="orderConfirm-main">
          {/* ===============================
              BREADCRUMB
          =============================== */}

          <div className="confirmation-breadcrumb">
            <Link to="/cart">Cart</Link>

            <span>›</span>

            <Link to="/checkout">Checkout</Link>

            <span>›</span>

            <span className="active-breadcrumb">Confirmation</span>
          </div>

          {/* ===============================
              HERO
          =============================== */}

          <section className="confirmation-hero">
            <div className="confirmation-left">
              <div className="success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>

              <h1>Thank You!</h1>

              <h2>Your order has been placed successfully.</h2>

              <p className="confirmation-description">
                We've received your order and it is now being prepared.
                <br />
                You will receive an email confirmation shortly with your order
                details.
              </p>

              {/* EMAIL CONFIRMATION */}

              <div className="email-confirmation-card">
                <div className="email-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>

                <div>
                  <p>A confirmation email has been sent to</p>

                  <strong>{customerEmail || "Email not available"}</strong>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="confirmation-actions">
                <Link to="/" className="back-home-btn">
                  <FontAwesomeIcon icon={faHouse} />
                  Back to Home
                </Link>

                <button
                  type="button"
                  className="view-order-btn"
                  onClick={() => navigate("/track-order")}
                >
                  View My Order
                </button>
              </div>
            </div>

            {/* VISUAL */}

            <div className="confirmation-visual">
              <div className="visual-circle" />

              <div className="order-bag">
                <div className="bag-top" />

                <div className="bag-content">
                  <div className="bag-logo">
                    <span>🍋</span>

                    <h3>Little Lemon</h3>

                    <p>MEDITERRANEAN KITCHEN</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===============================
              ORDER SUMMARY
          =============================== */}

          <section className="confirmation-order-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>

              <div className="order-meta">
                <strong>Order #{order.orderNumber}</strong>

                <span>{order.createdAt}</span>
              </div>
            </div>

            <div className="confirmation-summary-content">
              {/* ORDER ITEMS */}

              <div className="confirmation-items">
                {orderItems.map((item, index) => {
                  const price = getPrice(item.price);

                  const quantity = Math.max(1, Number(item.quantity) || 1);

                  const itemTotal = price * quantity;

                  return (
                    <div
                      className="confirmation-order-item"
                      key={item.id || index}
                    >
                      <div className="confirmation-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <span>🍽️</span>
                        )}
                      </div>

                      <div className="confirmation-item-info">
                        <h3>{item.name}</h3>

                        <p>Quantity: {quantity}</p>
                      </div>

                      <strong className="confirmation-item-price">
                        {formatPrice(itemTotal)}
                      </strong>
                    </div>
                  );
                })}
              </div>

              {/* PAYMENT SUMMARY */}

              <div className="confirmation-price-summary">
                <div className="price-row">
                  <span>Subtotal</span>

                  <strong>{formatPrice(orderSubtotal)}</strong>
                </div>

                <div className="price-row">
                  <span>
                    {deliveryMethod === "pickup" ? "Pickup" : "Delivery Fee"}
                  </span>

                  <strong>
                    {orderDeliveryFee === 0
                      ? "FREE"
                      : formatPrice(orderDeliveryFee)}
                  </strong>
                </div>

                <div className="price-row">
                  <span>
                    Tax ({(TAX_RATE * 100).toFixed(2)}
                    %)
                  </span>

                  <strong>{formatPrice(orderTax)}</strong>
                </div>

                <div className="confirmation-total-row">
                  <span>Total</span>

                  <strong>{formatPrice(orderTotal)}</strong>
                </div>

                {/* DELIVERY INFORMATION */}

                <div className="delivery-info-confirmation">
                  {/* ESTIMATED TIME */}

                  <div className="delivery-info-row">
                    <div className="delivery-small-icon">
                      <FontAwesomeIcon icon={faClock} />
                    </div>

                    <div>
                      <strong>
                        {deliveryMethod === "pickup"
                          ? "Estimated Pickup Time"
                          : "Estimated Delivery Time"}
                      </strong>

                      <p>
                        {order.estimatedDelivery ||
                          (deliveryMethod === "pickup"
                            ? "20 - 30 minutes"
                            : "30 - 45 minutes")}
                      </p>
                    </div>
                  </div>

                  {/* DELIVERY ADDRESS */}

                  <div className="delivery-info-row">
                    <div className="delivery-small-icon">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <div>
                      <strong>
                        {deliveryMethod === "pickup"
                          ? "Pickup Location"
                          : "Delivering To"}
                      </strong>

                      {deliveryMethod === "pickup" ? (
                        <p>Little Lemon Restaurant</p>
                      ) : (
                        <>
                          {/* CUSTOMER NAME */}

                          <p className="recipient-name">{recipientName}</p>

                          {/* CLEAN ADDRESS - NO EMAIL */}

                          <p>{fullAddress || "Address not available"}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* PAYMENT METHOD */}

<div className="delivery-info-row">
  <div className="delivery-small-icon">
    <FontAwesomeIcon icon={faCreditCard} />
  </div>

  <div>
    <strong>Payment Method</strong>

    <p className="payment-method-text">
      {paymentMethod}
    </p>
  </div>
</div>


{/* ORDER NOTES */}

<div className="delivery-info-row order-notes-row">
  <div className="delivery-small-icon">
    <FontAwesomeIcon icon={faNoteSticky} />
  </div>

  <div>
    <strong>Order Notes</strong>

    <p>
      {orderNotes
        ? orderNotes
        : "No special instructions provided."}
    </p>
  </div>
</div>
                </div>
              </div>
            </div>
          </section>

          {/* ===============================
              TRACK ORDER
          =============================== */}

          <section className="track-order-card">
            <div className="track-order-icon">
              <FontAwesomeIcon icon={faClock} />
            </div>

            <div className="track-order-text">
              <h2>Track Your Order</h2>

              <p>Follow your order status in real-time.</p>
            </div>

            <button
              type="button"
              className="track-order-btn"
              onClick={() => navigate("/track-order")}
            >
              Track Order
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </section>
        </main>

        <ScrollReveal animation="fade-up" delay={300}>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}

export default OrderConfirmation;

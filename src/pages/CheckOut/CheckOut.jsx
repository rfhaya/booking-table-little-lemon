import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckOut.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faCreditCard,
  faMoneyBillWave,
  faLock,
  faLocationDot,
  faTruck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import {
  TAX_RATE,
  DELIVERY_FEE,
  getPrice,
  formatPrice,
  calculateOrderTotal,
} from "../../utils/orderUtils";

function CheckOut() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { createOrder } = useOrder();

  /* =========================================
     CHECKOUT STEP
  ========================================= */

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* =========================================
     FORM DATA
  ========================================= */

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",

    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",

    instructions: "",

    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  /* =========================================
     DELIVERY METHOD
  ========================================= */

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  /* =========================================
     PAYMENT METHOD
  ========================================= */

  const [paymentMethod, setPaymentMethod] = useState("card");

  /* =========================================
     INPUT HANDLER
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     ORDER CALCULATION
  ========================================= */

  const { subtotal, tax, deliveryFee, total } = calculateOrderTotal({
    items: cart,
    deliveryMethod,
  });

  const totalItems = cart.reduce(
    (totalQuantity, item) =>
      totalQuantity + Math.max(1, Number(item.quantity) || 1),
    0,
  );

  /* =========================================
     STEP VALIDATION
  ========================================= */

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    if (deliveryMethod === "pickup") {
      return true;
    }

    if (!formData.address.trim()) {
      alert("Please enter your street address.");
      return false;
    }

    if (!formData.city.trim()) {
      alert("Please enter your city.");
      return false;
    }

    if (!formData.zipCode.trim()) {
      alert("Please enter your ZIP code.");
      return false;
    }

    return true;
  };

  const validateStep4 = () => {
    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) {
        alert("Please enter the name on your card.");
        return false;
      }

      if (!formData.cardNumber.trim()) {
        alert("Please enter your card number.");
        return false;
      }

      if (!formData.expiryDate.trim()) {
        alert("Please enter your card expiry date.");
        return false;
      }

      if (!formData.cvv.trim()) {
        alert("Please enter your CVV.");
        return false;
      }
    }

    return true;
  };

  /* =========================================
     NEXT STEP
  ========================================= */

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (deliveryMethod === "pickup") {
        setCurrentStep(4);
      } else {
        setCurrentStep(3);
      }

      return;
    }

    if (currentStep === 3) {
      if (!validateStep3()) return;

      setCurrentStep(4);
    }
  };

  /* =========================================
     PREVIOUS STEP
  ========================================= */

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      return;
    }

    if (currentStep === 3) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 4) {
      if (deliveryMethod === "delivery") {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }
    }
  };

  /* =========================================
     EDIT STEP
  ========================================= */

  const handleEditStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     PLACE ORDER
  ========================================= */

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        navigate("/order-confirmation");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

  const handlePlaceOrder = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!validateStep4()) {
      return;
    }

    const orderItems = cart.map((item) => ({
      ...item,
      price: getPrice(item.price),
      quantity: Math.max(1, Number(item.quantity) || 1),
    }));

    const orderData = {
      items: orderItems,

      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      },

      delivery: {
        method: deliveryMethod,

        recipientName: formData.fullName.trim(),

        address: deliveryMethod === "delivery" ? formData.address.trim() : "",

        apartment:
          deliveryMethod === "delivery" ? formData.apartment.trim() : "",

        city: deliveryMethod === "delivery" ? formData.city.trim() : "",

        state: deliveryMethod === "delivery" ? formData.state.trim() : "",

        zipCode: deliveryMethod === "delivery" ? formData.zipCode.trim() : "",

        instructions:
          deliveryMethod === "delivery" ? formData.instructions.trim() : "",
      },

      payment: {
        method: paymentMethod,
      },

      subtotal,
      tax,
      deliveryFee,
      total,
    };

    const newOrder = createOrder(orderData);

    localStorage.setItem("lastOrder", JSON.stringify(newOrder));

    clearCart();

    setShowSuccessModal(true);
  };

  /* =========================================
     STEP STATUS
  ========================================= */

  const getStepClass = (step) => {
    if (step === currentStep) return "active";

    if (step < currentStep) return "completed";

    if (deliveryMethod === "pickup" && step === 3 && currentStep === 4) {
      return "skipped";
    }

    return "";
  };

  return (
    <>
      <Header />

      <div className="checkout-page">
        <main className="checkout-main">
          {/* =====================================
              BREADCRUMB
          ===================================== */}

          <div className="checkout-breadcrumb">
            <Link to="/cart">Cart</Link>
            <span>›</span>
            <span className="active-breadcrumb">Checkout</span>
          </div>

          {/* =====================================
              PAGE HEADER
          ===================================== */}

          <div className="checkout-heading">
            <div>
              <h1>Checkout</h1>

              <p>Complete your order in just a few simple steps.</p>
            </div>

            <Link to="/cart" className="back-cart-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Cart
            </Link>
          </div>

          {/* =====================================
              EMPTY CART
          ===================================== */}

          {cart.length === 0 ? (
            <div className="checkout-empty">
              <h2>Your cart is empty</h2>

              <p>Add something delicious before checking out.</p>

              <Link to="/menu">Browse Menu</Link>
            </div>
          ) : (
            <>
              {/* =====================================
                  PROGRESS STEPPER
              ===================================== */}

              <div className="checkout-steps">
                <div className={`checkout-step ${getStepClass(1)}`}>
                  <div className="checkout-progress-number">
                    {currentStep > 1 ? <FontAwesomeIcon icon={faCheck} /> : "1"}
                  </div>

                  <span>Contact</span>
                </div>

                <div className={`checkout-step ${getStepClass(2)}`}>
                  <div className="checkout-progress-number">
                    {currentStep > 2 ? <FontAwesomeIcon icon={faCheck} /> : "2"}
                  </div>

                  <span>Delivery</span>
                </div>

                <div className={`checkout-step ${getStepClass(3)}`}>
                  <div className="checkout-progress-number">
                    {deliveryMethod === "pickup" && currentStep === 4 ? (
                      "—"
                    ) : currentStep > 3 ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      "3"
                    )}
                  </div>

                  <span>Address</span>
                </div>

                <div className={`checkout-step ${getStepClass(4)}`}>
                  <div className="checkout-progress-number">4</div>

                  <span>Payment</span>
                </div>
              </div>

              {/* =====================================
                  MAIN CHECKOUT GRID
              ===================================== */}

              <div className="checkout-layout">
                {/* =================================
                    CHECKOUT WIZARD
                ================================= */}

                <div className="checkout-wizard">
                  {/* =================================
                      STEP 1 - CONTACT
                  ================================= */}

                  <section
                    className={`checkout-section ${
                      currentStep === 1
                        ? "is-active"
                        : currentStep > 1
                          ? "is-completed"
                          : ""
                    }`}
                  >
                    <div className="checkout-section-header">
                      <div className="checkout-section-number">
                        {currentStep > 1 ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          "1"
                        )}
                      </div>

                      <div className="checkout-section-heading">
                        <h2>Contact Information</h2>

                        {currentStep > 1 && (
                          <p className="completed-summary">
                            {formData.fullName} · {formData.email}
                          </p>
                        )}

                        {currentStep === 1 && <p>How can we contact you?</p>}
                      </div>

                      {currentStep > 1 && (
                        <button
                          type="button"
                          className="edit-step-btn"
                          onClick={() => handleEditStep(1)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                          Edit
                        </button>
                      )}
                    </div>

                    {currentStep === 1 && (
                      <div className="checkout-section-content">
                        <div className="checkout-form-grid">
                          <div className="checkout-input-group full-width">
                            <label>Full Name *</label>

                            <input
                              type="text"
                              name="fullName"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="checkout-input-group">
                            <label>Email Address *</label>

                            <input
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="checkout-input-group">
                            <label>Phone Number *</label>

                            <input
                              type="tel"
                              name="phone"
                              placeholder="+1 (000) 000-0000"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="checkout-actions">
                          <button
                            type="button"
                            className="continue-btn"
                            onClick={handleNextStep}
                          >
                            Continue
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* =================================
                      STEP 2 - DELIVERY
                  ================================= */}

                  {currentStep >= 2 && (
                    <section
                      className={`checkout-section ${
                        currentStep === 2
                          ? "is-active"
                          : currentStep > 2
                            ? "is-completed"
                            : ""
                      }`}
                    >
                      <div className="checkout-section-header">
                        <div className="checkout-section-number">
                          {currentStep > 2 ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            "2"
                          )}
                        </div>

                        <div className="checkout-section-heading">
                          <h2>Delivery Method</h2>

                          {currentStep > 2 ? (
                            <p className="completed-summary">
                              {deliveryMethod === "delivery"
                                ? "Home Delivery"
                                : "Restaurant Pickup"}
                            </p>
                          ) : (
                            <p>How would you like to receive your order?</p>
                          )}
                        </div>

                        {currentStep > 2 && (
                          <button
                            type="button"
                            className="edit-step-btn"
                            onClick={() => handleEditStep(2)}
                          >
                            <FontAwesomeIcon icon={faPen} />
                            Edit
                          </button>
                        )}
                      </div>

                      {currentStep === 2 && (
                        <div className="checkout-section-content">
                          <div className="delivery-methods">
                            <button
                              type="button"
                              className={`delivery-option ${
                                deliveryMethod === "delivery" ? "active" : ""
                              }`}
                              onClick={() => setDeliveryMethod("delivery")}
                            >
                              <div className="delivery-option-icon">
                                <FontAwesomeIcon icon={faTruck} />
                              </div>

                              <div className="delivery-option-content">
                                <strong>Delivery</strong>

                                <span>30–45 minutes</span>
                              </div>

                              <span className="delivery-price">
                                {formatPrice(DELIVERY_FEE)}
                              </span>
                            </button>

                            <button
                              type="button"
                              className={`delivery-option ${
                                deliveryMethod === "pickup" ? "active" : ""
                              }`}
                              onClick={() => setDeliveryMethod("pickup")}
                            >
                              <div className="delivery-option-icon">
                                <FontAwesomeIcon icon={faLocationDot} />
                              </div>

                              <div className="delivery-option-content">
                                <strong>Pickup</strong>

                                <span>Ready in 20–30 minutes</span>
                              </div>

                              <span className="delivery-price">FREE</span>
                            </button>
                          </div>

                          <div className="checkout-actions">
                            <button
                              type="button"
                              className="previous-btn"
                              onClick={handlePreviousStep}
                            >
                              <FontAwesomeIcon icon={faArrowLeft} />
                              Back
                            </button>

                            <button
                              type="button"
                              className="continue-btn"
                              onClick={handleNextStep}
                            >
                              Continue
                              <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                          </div>
                        </div>
                      )}
                    </section>
                  )}

                  {/* =================================
                      STEP 3 - ADDRESS
                  ================================= */}

                  {deliveryMethod === "delivery" && currentStep >= 3 && (
                    <section
                      className={`checkout-section ${
                        currentStep === 3
                          ? "is-active"
                          : currentStep > 3
                            ? "is-completed"
                            : ""
                      }`}
                    >
                      <div className="checkout-section-header">
                        <div className="checkout-section-number">
                          {currentStep > 3 ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            "3"
                          )}
                        </div>

                        <div className="checkout-section-heading">
                          <h2>Delivery Address</h2>

                          {currentStep > 3 ? (
                            <p className="completed-summary">
                              {formData.address}, {formData.city}
                            </p>
                          ) : (
                            <p>Where should we deliver your order?</p>
                          )}
                        </div>

                        {currentStep > 3 && (
                          <button
                            type="button"
                            className="edit-step-btn"
                            onClick={() => handleEditStep(3)}
                          >
                            <FontAwesomeIcon icon={faPen} />
                            Edit
                          </button>
                        )}
                      </div>

                      {currentStep === 3 && (
                        <div className="checkout-section-content">
                          <div className="checkout-form-grid">
                            <div className="checkout-input-group full-width">
                              <label>Street Address *</label>

                              <input
                                type="text"
                                name="address"
                                placeholder="123 Main Street"
                                value={formData.address}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group full-width">
                              <label>Apartment / Suite</label>

                              <input
                                type="text"
                                name="apartment"
                                placeholder="Apartment, suite, etc."
                                value={formData.apartment}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group">
                              <label>City *</label>

                              <input
                                type="text"
                                name="city"
                                placeholder="Your city"
                                value={formData.city}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group">
                              <label>State</label>

                              <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group">
                              <label>ZIP Code *</label>

                              <input
                                type="text"
                                name="zipCode"
                                placeholder="00000"
                                value={formData.zipCode}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group full-width">
                              <label>Delivery Instructions</label>

                              <textarea
                                name="instructions"
                                placeholder="Any special instructions?"
                                value={formData.instructions}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="checkout-actions">
                            <button
                              type="button"
                              className="previous-btn"
                              onClick={handlePreviousStep}
                            >
                              <FontAwesomeIcon icon={faArrowLeft} />
                              Back
                            </button>

                            <button
                              type="button"
                              className="continue-btn"
                              onClick={handleNextStep}
                            >
                              Continue
                              <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                          </div>
                        </div>
                      )}
                    </section>
                  )}

                  {/* =================================
                      STEP 4 - PAYMENT
                  ================================= */}

                  {currentStep === 4 && (
                    <section className="checkout-section is-active">
                      <div className="checkout-section-header">
                        <div className="checkout-section-number">4</div>

                        <div className="checkout-section-heading">
                          <h2>Payment Method</h2>

                          <p>Choose how you'd like to pay.</p>
                        </div>
                      </div>

                      <div className="checkout-section-content">
                        <div className="payment-methods">
                          <button
                            type="button"
                            className={`payment-option ${
                              paymentMethod === "card" ? "active" : ""
                            }`}
                            onClick={() => setPaymentMethod("card")}
                          >
                            <FontAwesomeIcon icon={faCreditCard} />
                            Credit / Debit Card
                          </button>

                          <button
                            type="button"
                            className={`payment-option ${
                              paymentMethod === "cash" ? "active" : ""
                            }`}
                            onClick={() => setPaymentMethod("cash")}
                          >
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                            Cash on Delivery
                          </button>
                        </div>

                        {paymentMethod === "card" && (
                          <div className="card-payment-form">
                            <div className="checkout-input-group full-width">
                              <label>Name on Card *</label>

                              <input
                                type="text"
                                name="cardName"
                                placeholder="John Doe"
                                value={formData.cardName}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-input-group full-width">
                              <label>Card Number *</label>

                              <input
                                type="text"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="checkout-form-grid">
                              <div className="checkout-input-group">
                                <label>Expiry Date *</label>

                                <input
                                  type="text"
                                  name="expiryDate"
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="checkout-input-group">
                                <label>CVV *</label>

                                <input
                                  type="password"
                                  name="cvv"
                                  placeholder="•••"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="secure-payment">
                          <FontAwesomeIcon icon={faLock} />

                          <span>
                            Your payment information is secure and encrypted.
                          </span>
                        </div>

                        <div className="checkout-actions">
                          <button
                            type="button"
                            className="previous-btn"
                            onClick={handlePreviousStep}
                          >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Back
                          </button>

                          <button
                            type="button"
                            className="place-order-main-btn"
                            onClick={handlePlaceOrder}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            Place Order
                          </button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                {/* =================================
                    ORDER SUMMARY
                ================================= */}

                <aside className="checkout-order-summary">
                  <div className="checkout-summary-header">
                    <h2>Order Summary</h2>

                    <span>
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="checkout-summary-items">
                    {cart.map((item, index) => {
                      const itemPrice = getPrice(item.price);

                      const quantity = Math.max(1, Number(item.quantity) || 1);

                      return (
                        <div
                          className="checkout-summary-item"
                          key={item.id || index}
                        >
                          <div className="summary-item-image">
                            {item.image ? (
                              <img src={item.image} alt={item.name} />
                            ) : (
                              <span>🍽️</span>
                            )}

                            <span className="summary-quantity">{quantity}</span>
                          </div>

                          <div className="summary-item-info">
                            <h3>{item.name}</h3>

                            <p>{formatPrice(itemPrice)} each</p>
                          </div>

                          <strong>{formatPrice(itemPrice * quantity)}</strong>
                        </div>
                      );
                    })}
                  </div>

                  <div className="checkout-price-details">
                    <div className="checkout-price-row">
                      <span>Subtotal</span>

                      <strong>{formatPrice(subtotal)}</strong>
                    </div>

                    <div className="checkout-price-row">
                      <span>Delivery</span>

                      <strong>
                        {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                      </strong>
                    </div>

                    <div className="checkout-price-row">
                      <span>
                        Tax ({(TAX_RATE * 100).toFixed(2)}
                        %)
                      </span>

                      <strong>{formatPrice(tax)}</strong>
                    </div>

                    <div className="checkout-total">
                      <span>Total</span>

                      <strong>{formatPrice(total)}</strong>
                    </div>
                  </div>

                  <p className="checkout-summary-note">
                    Your order details will be reviewed before confirmation.
                  </p>
                </aside>
              </div>
            </>
          )}
        </main>

        {showSuccessModal && (
          <div className="checkout-success-overlay">
            <div className="checkout-success-popup">
              <div className="success-check-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>

              <div className="success-popup-content">
                <span>ORDER SUCCESSFUL</span>

                <h2>Your order is confirmed!</h2>

                <p>
                  Thank you for ordering from Little Lemon. We're preparing your
                  delicious meal.
                </p>

                <div className="success-redirect">
                  <span className="redirect-loader"></span>
                  Redirecting to your order details...
                </div>
              </div>
            </div>
          </div>
        )}

        <ScrollReveal animation="fade-up" delay={300}>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}

export default CheckOut;

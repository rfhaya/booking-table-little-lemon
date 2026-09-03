import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

import { useCart } from "../../context/CartContext";
import { menuData } from "../../mock-data/menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

import {
  faArrowLeft,
  faBagShopping,
  faBolt,
  faCartShopping,
  faCircleInfo,
  faLeaf,
  faLock,
  faMinus,
  faPlus,
  faTrashCan,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import {
  TAX_RATE,
  FREE_DELIVERY_MINIMUM,
  getPrice,
  formatPrice,
  calculateOrderTotal,
} from "../../utils/orderUtils";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  /* =========================================
     CART CALCULATIONS
  ========================================= */

  const totalItems = cart.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0),
    0
  );

  const {
    subtotal,
    tax,
    deliveryFee,
    total,
  } = calculateOrderTotal({
    items: cart,
    deliveryMethod: "delivery",
  });

  /* =========================================
     FREE DELIVERY
  ========================================= */

  const freeDeliveryTarget =
    FREE_DELIVERY_MINIMUM;

  const remainingForFreeDelivery = Math.max(
    freeDeliveryTarget - subtotal,
    0
  );

  const deliveryProgress =
    subtotal > 0
      ? Math.min(
          (subtotal / freeDeliveryTarget) *
            100,
          100
        )
      : 0;

  /* =========================================
     CLEAR CART
  ========================================= */

  const handleClearCart = () => {
    clearCart();
  };

  /* =========================================
     CHECKOUT
  ========================================= */

  const handleCheckout = () => {
    if (!cart.length) return;

    navigate("/checkout");
  };

  /* =========================================
     QUANTITY HANDLERS
  ========================================= */

  const handleIncrease = (item) => {
    const currentQuantity =
      Number(item.quantity) || 1;

    updateQuantity(
      item.id,
      currentQuantity + 1
    );
  };

  const handleDecrease = (item) => {
    const currentQuantity =
      Number(item.quantity) || 1;

    if (currentQuantity <= 1) {
      return;
    }

    updateQuantity(
      item.id,
      currentQuantity - 1
    );
  };

  /* =========================================
     MENU ITEMS
  ========================================= */

  const allMenuItems = Object.values(
    menuData || {}
  ).flatMap((category) => {
    if (Array.isArray(category)) {
      return category;
    }

    if (Array.isArray(category?.items)) {
      return category.items;
    }

    return [];
  });

  /* =========================================
     RECOMMENDATIONS
  ========================================= */

  const recommendations = allMenuItems
    .filter(
      (item) =>
        !cart.some(
          (cartItem) =>
            cartItem.id === item.id
        )
    )
    .slice(0, 4);

  return (
    <>
      <Header />

      <div className="cart-page">
        <main>

          {/* =========================================
              HERO
          ========================================= */}

          <section className="cart-page-hero">
            <div className="cart-page-hero__overlay" />

            <div className="cart-page-hero__content">
              <FontAwesomeIcon
                icon={faPagelines}
                className="cart-page-hero__icon"
              />

              <h1>Your Cart</h1>

              <div className="cart-page-hero__divider">
                <span />
                <i />
                <span />
              </div>

              <p>
                Review your items and proceed
                to checkout.
              </p>
            </div>
          </section>

          {/* =========================================
              MAIN CART
          ========================================= */}

          <section className="cart-main-section">
            <div className="cart-container">
              <div className="cart-layout">

                {/* =====================================
                    LEFT - CART ITEMS
                ===================================== */}

                <div className="cart-items">
                  <div className="cart-items-card">

                    <div className="cart-items-card__header">
                      <h2 className="cart-section-title">
                        Cart Items ({totalItems})
                      </h2>

                      {cart.length > 0 && (
                        <span className="cart-items-count">
                          {totalItems}{" "}
                          {totalItems === 1
                            ? "Item"
                            : "Items"}
                        </span>
                      )}
                    </div>

                    {/* EMPTY CART */}

                    {cart.length === 0 ? (
                      <div className="cart-empty">
                        <div className="cart-empty__icon">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                          />
                        </div>

                        <h3>
                          Your cart is empty
                        </h3>

                        <p>
                          Looks like you haven't
                          added anything yet.
                        </p>

                        <Link
                          to="/menu"
                          className="cart-empty__button"
                        >
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                          />
                          Browse Menu
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="cart-items-scroll">
                          <div className="cart-items-list">

                            {cart.map(
                              (item, index) => {
                                const itemPrice =
                                  getPrice(
                                    item.price
                                  );

                                const quantity =
                                  Math.max(
                                    1,
                                    Number(
                                      item.quantity
                                    ) || 1
                                  );

                                const itemTotal =
                                  itemPrice *
                                  quantity;

                                return (
                                  <article
                                    className="cart-item-card"
                                    key={
                                      item.id ||
                                      index
                                    }
                                  >
                                    {/* IMAGE */}

                                    <div className="cart-item-card__image">
                                      {item.image ? (
                                        <img
                                          src={
                                            item.image
                                          }
                                          alt={
                                            item.name
                                          }
                                        />
                                      ) : (
                                        <div className="cart-item-image-placeholder">
                                          <FontAwesomeIcon
                                            icon={
                                              faCartShopping
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>

                                    {/* CONTENT */}

                                    <div className="cart-item-card__content">
                                      <h3>
                                        {item.name}
                                      </h3>

                                      <p>
                                        {item.description ||
                                          item
                                            .details
                                            ?.description ||
                                          "Freshly prepared with quality ingredients."}
                                      </p>

                                      <strong>
                                        {formatPrice(
                                          itemPrice
                                        )}
                                      </strong>
                                    </div>

                                    {/* ACTIONS */}

                                    <div className="cart-item-card__actions">

                                      {/* QUANTITY */}

                                      <div className="cart-quantity">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDecrease(
                                              item
                                            )
                                          }
                                          disabled={
                                            quantity <=
                                            1
                                          }
                                          aria-label="Decrease quantity"
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              faMinus
                                            }
                                          />
                                        </button>

                                        <span>
                                          {quantity}
                                        </span>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleIncrease(
                                              item
                                            )
                                          }
                                          aria-label="Increase quantity"
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              faPlus
                                            }
                                          />
                                        </button>
                                      </div>

                                      {/* ITEM TOTAL */}

                                      <div className="cart-item-total">
                                        <small>
                                          Total
                                        </small>

                                        <strong>
                                          {formatPrice(
                                            itemTotal
                                          )}
                                        </strong>
                                      </div>

                                      {/* REMOVE */}

                                      <button
                                        type="button"
                                        className="cart-remove-button"
                                        onClick={() =>
                                          removeFromCart(
                                            item.id
                                          )
                                        }
                                        aria-label={`Remove ${item.name}`}
                                      >
                                        <FontAwesomeIcon
                                          icon={
                                            faTrashCan
                                          }
                                        />
                                      </button>
                                    </div>
                                  </article>
                                );
                              }
                            )}

                          </div>
                        </div>

                        {/* BOTTOM ACTIONS */}

                        <div className="cart-bottom-actions">
                          <Link
                            to="/menu"
                            className="continue-shopping-button"
                          >
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                            />
                            Continue Shopping
                          </Link>

                          <button
                            type="button"
                            className="clear-cart-button"
                            onClick={
                              handleClearCart
                            }
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* =====================================
                    RIGHT - ORDER SUMMARY
                ===================================== */}

                <aside className="cart-summary">
                  <div className="cart-summary__inner">

                    <h2>
                      Order Summary
                    </h2>

                    <div className="summary-divider" />

                    {/* SUBTOTAL */}

                    <div className="summary-row">
                      <span>
                        Subtotal (
                        {totalItems}{" "}
                        {totalItems === 1
                          ? "item"
                          : "items"}
                        )
                      </span>

                      <strong>
                        {formatPrice(
                          subtotal
                        )}
                      </strong>
                    </div>

                    {/* TAX */}

                    <div className="summary-row">
                      <span>
                        Tax (
                        {(TAX_RATE * 100).toFixed(
                          2
                        )}
                        %)
                      </span>

                      <strong>
                        {formatPrice(tax)}
                      </strong>
                    </div>

                    {/* DELIVERY */}

                    <div className="summary-row">
                      <span className="delivery-fee-label">
                        Delivery Fee

                        <FontAwesomeIcon
                          icon={faCircleInfo}
                        />
                      </span>

                      <strong>
                        {deliveryFee === 0 &&
                        subtotal > 0
                          ? "FREE"
                          : formatPrice(
                              deliveryFee
                            )}
                      </strong>
                    </div>

                    <div className="summary-divider summary-total-divider" />

                    {/* TOTAL */}

                    <div className="summary-total">
                      <span>Total</span>

                      <strong>
                        {formatPrice(total)}
                      </strong>
                    </div>

                    {/* FREE DELIVERY */}

                    {cart.length > 0 && (
                      <div className="free-delivery-card">
                        <div className="free-delivery-card__top">
                          <FontAwesomeIcon
                            icon={faTruck}
                          />

                          <p>
                            {remainingForFreeDelivery >
                            0 ? (
                              <>
                                You're{" "}

                                <strong>
                                  {formatPrice(
                                    remainingForFreeDelivery
                                  )}
                                </strong>

                                {" "}away from

                                <br />

                                <b>
                                  FREE delivery!
                                </b>
                              </>
                            ) : (
                              <>
                                <strong>
                                  Congratulations!
                                </strong>

                                <br />

                                <b>
                                  You've unlocked
                                  FREE delivery!
                                </b>
                              </>
                            )}
                          </p>
                        </div>

                        <div className="delivery-progress">
                          <div className="delivery-progress__track">
                            <span
                              style={{
                                width: `${deliveryProgress}%`,
                              }}
                            />
                          </div>

                          <small>
                            {formatPrice(
                              freeDeliveryTarget
                            )}
                          </small>
                        </div>
                      </div>
                    )}

                    {/* CHECKOUT */}

                    <button
                      type="button"
                      className="proceed-checkout-button"
                      disabled={
                        cart.length === 0
                      }
                      onClick={
                        handleCheckout
                      }
                    >
                      <FontAwesomeIcon
                        icon={faLock}
                      />
                      Proceed to Checkout
                    </button>

                    {/* SEPARATOR */}

                    <div className="checkout-separator">
                      <span />
                      <p>or</p>
                      <span />
                    </div>

                    {/* PAYPAL */}

                    <button
                      type="button"
                      className="paypal-button"
                      disabled={
                        cart.length === 0
                      }
                    >
                      Checkout with

                      <strong>
                        Pay<span>Pal</span>
                      </strong>
                    </button>

                    {/* BENEFITS */}

                    <div className="checkout-benefits">

                      <div className="checkout-benefit">
                        <FontAwesomeIcon
                          icon={faLock}
                        />

                        <div>
                          <h4>
                            Secure Checkout
                          </h4>

                          <p>
                            Your payment information
                            <br />
                            is safe with us.
                          </p>
                        </div>
                      </div>

                      <div className="checkout-benefit">
                        <FontAwesomeIcon
                          icon={faBolt}
                        />

                        <div>
                          <h4>
                            Fresh & Fast
                          </h4>

                          <p>
                            We prepare your order
                            <br />
                            fresh and deliver fast.
                          </p>
                        </div>
                      </div>

                      <div className="checkout-benefit">
                        <FontAwesomeIcon
                          icon={faLeaf}
                        />

                        <div>
                          <h4>
                            Best Quality
                          </h4>

                          <p>
                            We use the finest ingredients
                            <br />
                            in every dish.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </aside>

              </div>
            </div>
          </section>

          {/* =========================================
              RECOMMENDATIONS
          ========================================= */}

          {recommendations.length > 0 && (
            <section className="cart-recommendations">
              <div className="cart-container">

                <div className="recommendations-heading">
                  <h2>
                    You May Also Like
                  </h2>

                  <div className="recommendations-heading__divider">
                    <span />
                    <i />
                    <span />
                  </div>
                </div>

                <div className="recommendations-grid">

                  {recommendations.map(
                    (item, index) => {
                      const itemPrice =
                        getPrice(item.price);

                      return (
                        <article
                          className="recommendation-card"
                          key={
                            item.id || index
                          }
                        >
                          <div className="recommendation-card__image">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                              />
                            ) : (
                              <div className="recommendation-image-placeholder">
                                <FontAwesomeIcon
                                  icon={
                                    faCartShopping
                                  }
                                />
                              </div>
                            )}
                          </div>

                          <div className="recommendation-card__content">
                            <h3>
                              {item.name}
                            </h3>

                            <p>
                              {item.description ||
                                item
                                  .details
                                  ?.description ||
                                "Freshly prepared with quality ingredients."}
                            </p>

                            <strong>
                              {formatPrice(
                                itemPrice
                              )}
                            </strong>

                            <button
                              type="button"
                              onClick={() =>
                                addToCart(
                                  item,
                                  1
                                )
                              }
                            >
                              Add to Cart
                            </button>
                          </div>
                        </article>
                      );
                    }
                  )}

                </div>
              </div>
            </section>
          )}

          {/* =========================================
              PROMO SECTION
          ========================================= */}

          <section className="cart-promo-section">
            <div className="cart-container">
              <div className="cart-promo">

                <div className="cart-promo__content">
                  <div className="cart-promo__icon">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                    />
                  </div>

                  <div>
                    <h3>
                      Have a promo code?
                    </h3>

                    <p>
                      You can apply it in the next
                      step.
                    </p>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faPagelines}
                  className="cart-promo__decoration"
                />

              </div>
            </div>
          </section>

        </main>

        <ScrollReveal
          animation="fade-up"
          delay={300}
        >
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}

export default Cart;
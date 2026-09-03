import { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

import "./Menu.css";

import { useCart } from "../../context/CartContext";

import {
  faArrowRight,
  faLeaf,
  faSeedling,
  faUtensils,
  faCakeCandles,
  faGlassWater,
  faXmark,
  faMinus,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { menuCategories, menuData } from "../../mock-data/menu";

export default function Menus() {
  const [activeCategory, setActiveCategory] = useState("starters");
  const [cartSuccess, setCartSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const iconMap = {
    seedling: faSeedling,
    leaf: faLeaf,
    utensils: faUtensils,
    cake: faCakeCandles,
    glass: faGlassWater,
  };

  const currentMenu = menuData[activeCategory];

  /* ===============================
     OPEN DETAIL MODAL
  =============================== */

  const openDetails = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  /* ===============================
     CLOSE MODAL
  =============================== */

  const closeDetails = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  /* ===============================
     QUANTITY
  =============================== */

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  /* ===============================
     ADD TO CART
  =============================== */

  const handleAddToCart = () => {
    if (!selectedItem) return;

    addToCart(selectedItem, quantity);

    closeDetails();

    setCartSuccess(true);

    setTimeout(() => {
      setCartSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Header />

      <div className="restaurant-menu-page">
        <main>
          {/* ================= HERO ================= */}

          <section className="menu-page-hero">
            <div className="menu-page-hero__overlay" />

            <div className="menu-page-hero__content">
              <span className="menu-page-hero__eyebrow">
                <FontAwesomeIcon icon={faLeaf} />
                OUR MENU
              </span>

              <h1>
                Mediterranean
                <br />
                Flavors, Made Fresh
              </h1>

              <div className="menu-page-hero__line" />

              <p>
                Discover vibrant flavors, fresh ingredients, and thoughtfully
                crafted dishes inspired by the Mediterranean.
              </p>

              <Link to="/reservations" className="menu-page-hero__button">
                Book a Table
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </section>

          {/* ================= CATEGORY NAV ================= */}

          <section className="menu-category-nav">
            <div className="menu-category-nav__inner">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`menu-category-nav__item ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <FontAwesomeIcon icon={iconMap[category.icon]} />

                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ================= MENU CONTENT ================= */}

          <section className="menu-list">
            <div className="menu-list__container">
              <div className="menu-active-section">
                {/* HEADER */}

                <div className="menu-active-section__header">
                  <div>
                    <div className="menu-section__title">
                      <h2>{currentMenu.title}</h2>

                      <span />
                    </div>

                    <p className="menu-active-section__subtitle">
                      {currentMenu.subtitle}
                    </p>
                  </div>

                  {/* <span className="menu-active-section__count">
                    {currentMenu.items.length} Items
                  </span> */}
                </div>

                {/* GRID */}

                <div className="menu-section__grid" key={activeCategory}>
                  {currentMenu.items.map((item) => (
                    <article className="menu-food-card" key={item.id} onClick={() => openDetails(item)}>
                      <div className="menu-food-card__image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="menu-food-card__content">
                        <h3>{item.name}</h3>

                        <p>{item.description}</p>

                        <div className="menu-food-card__bottom">
                          <strong>{item.price}</strong>

                          <button
                            type="button"
                            onClick={() => openDetails(item)}
                          >
                            Details
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}

          <section className="menu-bottom-cta">
            <div className="menu-bottom-cta__content">
              <span>THE LITTLE LEMON EXPERIENCE</span>

              <h2>Great food is even better when shared.</h2>

              <p>
                Book a table and enjoy an unforgettable Mediterranean dining
                experience with us.
              </p>
            </div>

            <div className="menu-bottom-cta__image" />
          </section>
        </main>

        {/* ================= DETAIL MODAL ================= */}

        {selectedItem && (
          <div className="menu-detail-modal" onClick={closeDetails}>
            <div
              className="menu-detail-modal__content"
              onClick={(event) => event.stopPropagation()}
            >
              {/* CLOSE */}

              <button
                type="button"
                className="menu-detail-modal__close"
                onClick={closeDetails}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              {/* IMAGE */}

              <div className="menu-detail-modal__image">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>

              {/* INFO */}

              <div className="menu-detail-modal__info">
                <span className="menu-detail-modal__category">
                  {currentMenu.title}
                </span>

                <h2>{selectedItem.name}</h2>

                <span className="menu-detail-modal__price">
                  {selectedItem.price}
                </span>

                <p className="menu-detail-modal__description">
                  {selectedItem.details.description}
                </p>

                {/* META */}

                <div className="menu-detail-modal__meta">
                  <div>
                    <span>Calories</span>

                    <strong>{selectedItem.details.calories}</strong>
                  </div>

                  <div>
                    <span>Preparation</span>

                    <strong>{selectedItem.details.preparationTime}</strong>
                  </div>

                  <div>
                    <span>Dietary</span>

                    <strong>{selectedItem.details.dietary}</strong>
                  </div>
                </div>

                {/* INGREDIENTS */}

                <div className="menu-detail-modal__ingredients">
                  <h4>Ingredients</h4>

                  <div>
                    {selectedItem.details.ingredients.map((ingredient) => (
                      <span key={ingredient}>{ingredient}</span>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="menu-detail-modal__actions">
                  {/* QUANTITY */}

                  <div className="menu-quantity">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      aria-label="Decrease quantity"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Increase quantity"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    className="menu-add-cart-button"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ================= CART SUCCESS TOAST ================= */}

        {cartSuccess && (
          <div className="menu-cart-success" role="status">
            <div className="menu-cart-success__icon">✓</div>

            <div className="menu-cart-success__content">
              <strong>Added to Cart!</strong>

              <span>Your item has been added successfully.</span>
            </div>

            <Link to="/cart" className="menu-cart-success__link">
              View Cart
            </Link>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

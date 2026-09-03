import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Navbar/Navbar";
import lemonLogo from "../../assets/lemon.png";

import "./Header.css";

import { useCart } from "../../context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartCount } = useCart();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  return (
    <header
      className={`header ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="header-container">


        {/* LOGO */}

        <Link
          to="/"
          className="header-logo"
          aria-label="Little Lemon Home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={lemonLogo}
            alt="Little Lemon"
          />

          <div className="logo-text">
            <span className="logo-name">
              Little Lemon
            </span>

            <span className="logo-subtitle">
              RESTAURANT
            </span>
          </div>
        </Link>


        {/* NAVIGATION */}

        <Nav
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />


        {/* RIGHT SIDE */}

        <div className="header-right">


          {/* CART */}

          <Link
            to="/cart"
            className="header-cart"
            aria-label={`Shopping Cart (${cartCount} items)`}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
            />

            {cartCount > 0 && (
              <span className="header-cart-count">
                {cartCount > 99
                  ? "99+"
                  : cartCount}
              </span>
            )}
          </Link>


          {/* BOOKING */}

          <Link
            to="/reservations"
            className="header-booking"
          >
            Book a Table
          </Link>


          {/* MOBILE MENU */}

          <button
            type="button"
            className={`menu-toggle ${
              menuOpen ? "menu-active" : ""
            }`}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <FontAwesomeIcon
              icon={
                menuOpen
                  ? faXmark
                  : faBars
              }
            />
          </button>

        </div>

      </div>
    </header>
  );
}
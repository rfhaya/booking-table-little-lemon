import { Link } from "react-router-dom";
import "./Footer.css";
import lemonLogo from "../../assets/lemon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faPhoneAlt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer-main">
        <div className="footer-container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={lemonLogo} alt="Little Lemon" />
              <div className="footer-logo-text">
                <span>Little Lemon</span>
                <small>RESTAURANT</small>
              </div>
            </Link>
            <p>
              A family-owned Mediterranean restaurant, serving fresh and
              authentic dishes since 2010.
            </p>

            <div className="footer-socials">
              <a href="https://www.instagram.com/" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.facebook.com/" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://x.com/" aria-label="X">
                <FontAwesomeIcon icon={faX} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>

            <nav aria-label="Footer navigation">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/reservations">Reservations</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/catering">Catering</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-column">
            <h3>Hours</h3>
            <div className="footer-hours">
              <div>
                <strong>Mon - Fri</strong>
                <span>11:00 AM - 10:00 PM</span>
              </div>

              <div>
                <strong>Sat - Sun</strong>
                <span>10:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>

            <address className="footer-contact">
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>
                  123 Lemon Tree Street,
                  <br />
                  Chicago, IL 60607
                </span>
              </div>
              <div>
                <FontAwesomeIcon icon={faPhoneAlt} />
                <a href="tel:+13125551234">(312) 555-1234</a>
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div className="footer-column footer-newsletter">
            <h3>Newsletter</h3>
            <p>
              Subscribe to get special offers
              <br />
              and updates.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <p>© 2026 Little Lemon Restaurant. All rights reserved.</p>

          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

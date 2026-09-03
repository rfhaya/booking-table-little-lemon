import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav
      className={`nav ${menuOpen ? "nav-open" : ""}`}
      aria-label="Main navigation"
    >
      <ul className="nav-list">

        <li className="nav-item">
          <NavLink
            to="/"
            end
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/menu"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/reservations"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Reservations
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/contact"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}
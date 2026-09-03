import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./Home.css";
import * as Images from "../../assets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

import Footer from "../../components/Footer/Footer";

import {
  faArrowLeft,
  faArrowRight,
  faCalendarAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

import { menuCategories, menuData } from "../../mock-data/menu";

function Home() {
  const seasonalFavorites = [
    menuData.starters.items[0],
    menuData.salads.items[0],
    menuData.mains.items[0],
  ];

  return (
    <>
      <Header />

      <div className="home-page">
        <main>
          <section className="home-page-hero">
            <div className="home-page-hero-overlay"></div>

            <div className="home-page-hero-container">
              <div className="home-page-hero-content">
                <div className="home-page-hero-accent home-page-hero-item"></div>

                <h1 className="home-page-hero-item">Little Lemon</h1>

                <h2 className="home-page-hero-item">
                  Chicago's <span>Mediterranean</span> Kitchen
                </h2>

                <div className="home-page-hero-description home-page-hero-item">
                  <p>Traditional family recipes, served with a modern twist.</p>

                  <p>
                    Inspired by the vibrant flavors of Italy, Greece, and
                    Turkey.
                  </p>
                </div>

                <div className="home-page-hero-actions home-page-hero-item">
                  <Link
                    to="/reservations"
                    className="home-page-hero-button home-page-hero-button-primary"
                  >
                    Reserve a Table
                    <span>
                      <FontAwesomeIcon icon={faUtensils} />
                    </span>
                  </Link>

                  <Link
                    to="/menu"
                    className="home-page-hero-button home-page-hero-button-secondary"
                  >
                    Explore Menu
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="home-page-about-section">
            <article className="home-page-about-content">
              <ScrollReveal
                animation="fade-left"
                delay={0}
                className="home-page-about-image"
              >
                <img
                  src={Images.restaurantImage}
                  alt="Little Lemon restaurant"
                />
              </ScrollReveal>

              <div className="home-page-about-text">
                <ScrollReveal
                  as="span"
                  animation="fade-up"
                  delay={0}
                  className="home-page-section-eyebrow"
                >
                  <FontAwesomeIcon icon={faPagelines} /> ABOUT US
                </ScrollReveal>

                <ScrollReveal as="h2" animation="fade-up" delay={100}>
                  A Little Taste of the
                  <span> Mediterranean</span>
                </ScrollReveal>

                <ScrollReveal as="p" animation="fade-up" delay={200}>
                  Little Lemon is a family-owned restaurant in the heart of
                  Chicago. We bring together generations of Italian family
                  recipes and fresh flavors inspired by Greece and Turkey.
                </ScrollReveal>

                <ScrollReveal as="p" animation="fade-up" delay={300}>
                  Good food, warm hospitality, and a place for everyone.
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={400}>
                  <Link to="/about" className="home-page-section-button">
                    Our Story
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </article>
          </section>

          <section className="home-page-specials-section">
            <article className="home-page-specials-content">
              <div className="home-page-specials-header">
                <div>
                  <ScrollReveal
                    as="span"
                    animation="fade-up"
                    delay={0}
                    className="home-page-section-eyebrow"
                  >
                    — THIS WEEK'S SPECIALS
                  </ScrollReveal>

                  <ScrollReveal as="h2" animation="fade-up" delay={100}>
                    Seasonal Favorites
                  </ScrollReveal>
                </div>

                <ScrollReveal animation="fade-left" delay={200}>
                  <Link to="/menu" className="home-page-specials-link">
                    View Full Menu
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>

              <div className="home-page-menu-grid">
                {seasonalFavorites.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    as="article"
                    animation="fade-up"
                    delay={index * 150}
                    className="home-page-menu-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="home-page-menu-card-image"
                    />

                    <div className="home-page-menu-card-body">
                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <div className="home-page-menu-card-footer">
                        <span className="home-page-menu-card-price">
                          {item.price}
                        </span>

                        <Link
                          to="/menu"
                          className="home-page-menu-card-action"
                          aria-label={`View ${item.name}`}
                        >
                          🍋
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </article>
          </section>

          <section className="home-page-why-section">
            <article className="home-page-why-content">
              <div className="home-page-why-title">
                <ScrollReveal as="h2" animation="fade-up">
                  Why Little Lemon?
                </ScrollReveal>
              </div>

              <div className="home-page-why-grid">
                {/* CARD 1 */}
                <ScrollReveal
                  as="article"
                  animation="fade-up"
                  delay={0}
                  className="home-page-why-card"
                >
                  <div className="home-page-why-icon">
                    <img src={Images.IconIngredient} alt="Icon Ingredients" />
                  </div>

                  <h3>Fresh Ingredients</h3>

                  <p>Seasonal ingredients sourced with care.</p>
                </ScrollReveal>

                {/* CARD 2 */}
                <ScrollReveal
                  as="article"
                  animation="fade-up"
                  delay={120}
                  className="home-page-why-card"
                >
                  <div className="home-page-why-icon">
                    <img src={Images.IconHatChef} alt="Icon Hat Chef" />
                  </div>

                  <h3>Family Recipes</h3>

                  <p>Inspired by generations of Italian cooking.</p>
                </ScrollReveal>

                {/* CARD 3 */}
                <ScrollReveal
                  as="article"
                  animation="fade-up"
                  delay={240}
                  className="home-page-why-card"
                >
                  <div className="home-page-why-icon">
                    <FontAwesomeIcon icon={faPagelines} />
                  </div>

                  <h3>Mediterranean Flavors</h3>

                  <p>Italian, Greek, and Turkish influences.</p>
                </ScrollReveal>

                {/* CARD 4 */}
                <ScrollReveal
                  as="article"
                  animation="fade-up"
                  delay={360}
                  className="home-page-why-card"
                >
                  <div className="home-page-why-icon">
                    <img src={Images.IconLove} alt="Icon Love" />
                  </div>

                  <h3>Made with Love</h3>

                  <p>Good food made for sharing.</p>
                </ScrollReveal>
              </div>
            </article>
          </section>

          <section className="home-page-space-section">
            <article className="home-page-space-content">
              <div className="home-page-space-text">
                <ScrollReveal
                  as="span"
                  animation="fade-up"
                  className="home-page-section-eyebrow"
                >
                  — OUR RESTAURANT
                </ScrollReveal>

                <ScrollReveal as="h2" animation="fade-up" delay={100}>
                  More Than Just a Meal
                </ScrollReveal>

                <ScrollReveal as="p" animation="fade-up" delay={200}>
                  A warm, relaxed place to gather, share stories, and enjoy good
                  food any time of the day.
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <Link to="/about" className="home-page-section-button">
                    See Our Space
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>

              <div className="home-page-space-gallery">
                <ScrollReveal animation="zoom-in" delay={0}>
                  <img src={Images.interiorImage} alt="Little Lemon interior" />
                </ScrollReveal>

                <ScrollReveal animation="zoom-in" delay={100}>
                  <img src={Images.chefImage} alt="Chef preparing food" />
                </ScrollReveal>

                <ScrollReveal animation="zoom-in" delay={200}>
                  <img src={Images.foodImage} alt="Mediterranean food" />
                </ScrollReveal>

                <ScrollReveal animation="zoom-in" delay={300}>
                  <img src={Images.diningImage} alt="Guests dining" />
                </ScrollReveal>
              </div>
            </article>
          </section>

          <section className="home-page-story-section">
            <article className="home-page-story-content">
              <ScrollReveal animation="fade-left">
                <div className="home-page-story-image">
                  <img src={Images.foundersImage} alt="Little Lemon founders" />
                </div>
              </ScrollReveal>

              <div className="home-page-story-text">
                <ScrollReveal
                  as="span"
                  animation="fade-up"
                  className="home-page-section-eyebrow"
                >
                  <FontAwesomeIcon icon={faPagelines} /> OUR STORY
                </ScrollReveal>

                <ScrollReveal as="h2" animation="fade-up" delay={100}>
                  A Family Dream,
                  <span> Served Daily</span>
                </ScrollReveal>

                <ScrollReveal as="p" animation="fade-up" delay={200}>
                  Mario and Adrian, two brothers from Italy, pursued their
                  shared dream of creating a place where traditional family
                  recipes meet the diverse flavors of the Mediterranean.
                </ScrollReveal>

                <div className="home-page-founder-list">
                  <ScrollReveal animation="fade-up" delay={300}>
                    <div className="home-page-founder-item">
                      <h3>Mario</h3>
                      <span>Chef & Co-Founder</span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal animation="fade-up" delay={400}>
                    <div className="home-page-founder-item">
                      <h3>Adrian</h3>
                      <span>Marketing & Co-Founder</span>
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal animation="fade-up" delay={500}>
                  <Link to="/about" className="home-page-section-button">
                    Read Our Story
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </article>
          </section>

          <section className="home-page-testimonial-section">
            <article className="home-page-testimonial-content">
              <ScrollReveal animation="fade-right" delay={0}>
                <button
                  className="home-page-testimonial-button"
                  aria-label="Previous testimonial"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </ScrollReveal>

              <div className="home-page-testimonial-body">
                <ScrollReveal animation="zoom-in" delay={100}>
                  <blockquote>
                    “The food feels authentic, the atmosphere is warm, and every
                    dish tastes thoughtfully made.”
                  </blockquote>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={250}>
                  <div className="home-page-testimonial-stars">★★★★★</div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={350}>
                  <span className="home-page-testimonial-author">
                    — Sarah M.
                  </span>
                </ScrollReveal>
              </div>

              <ScrollReveal animation="fade-left" delay={0}>
                <button
                  className="home-page-testimonial-button"
                  aria-label="Next testimonial"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </ScrollReveal>
            </article>
          </section>

          <section className="home-page-cta">
            <div className="home-page-cta-content">
              <ScrollReveal animation="zoom-in">
                <div className="home-page-cta-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </ScrollReveal>

              <div className="home-page-cta-text">
                <ScrollReveal as="h2" animation="fade-up" delay={100}>
                  Good Food Is Better When Shared.
                </ScrollReveal>

                <ScrollReveal as="p" animation="fade-up" delay={200}>
                  Join us for a relaxed Mediterranean dining experience in the
                  heart of Chicago.
                </ScrollReveal>
              </div>

              <ScrollReveal animation="fade-left" delay={300}>
                <Link to="/reservations" className="home-page-cta-button">
                  Reserve Your Table
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <ScrollReveal animation="fade-up" delay={300}>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}

export default Home;

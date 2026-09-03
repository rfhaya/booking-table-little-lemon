import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import * as Images from "../../assets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faLeaf,
  faHeart,
  faQuoteLeft,
  faUtensils,
  faCalendarDays,
  faBagShopping,
  faGift,
  faUsers,
  faCakeCandles,
  faBriefcase,
  faChampagneGlasses,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

export default function AboutUs() {
  return (
    <>
      <Header />

      <div className="restaurant-about-page">
        <main>
          {/* HERO */}
          <section className="showcase-hero">
            <div className="showcase-hero-veil"></div>

            <article className="showcase-hero-wrapper">
              <div className="showcase-hero-body">
                <ScrollReveal animation="fade-up" delay={0}>
                  <span className="badge-label badge-label-light">
                    <FontAwesomeIcon icon={faLeaf} />
                    Our Restaurant
                  </span>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                  <h1>
                    A Mediterranean
                    <br />
                    Experience
                  </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="showcase-hero-bar"></div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <p>
                    At Little Lemon, we bring the warmth of Mediterranean
                    hospitality to Chicago.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={400}>
                  <p>
                    Fresh ingredients, time-honored recipes, and a welcoming
                    atmosphere—every detail is crafted for you.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={500}>
                  <Link to="/reservations" className="showcase-hero-cta">
                    Book a Table
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </article>
          </section>

          {/* OUR STORY */}
          <section className="legacy-section">
            <article className="legacy-wrapper">
              <ScrollReveal animation="fade-left" className="legacy-media-box">
                <img
                  src={Images.HeroAboutUsImage}
                  alt="Little Lemon restaurant"
                />
              </ScrollReveal>

              <div className="legacy-text-box">
                <ScrollReveal animation="fade-up">
                  <h2>Our Story</h2>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                  <div className="info-divider-line"></div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <p>
                    Little Lemon was founded in 2010 by husband and wife team,
                    Jason and Maria. Jason, a passionate garden architect,
                    brings creativity to every dish, while Maria ensures every
                    guest feels at home.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <p>
                    Together, they created a place where delicious food, great
                    company, and memorable moments come together.
                  </p>
                </ScrollReveal>

                <div className="pillars-grid">
                  <ScrollReveal
                    animation="fade-up"
                    delay={100}
                    className="pillar-card"
                  >
                    <div className="pillar-icon-wrap">
                      <FontAwesomeIcon icon={faLeaf} />
                    </div>

                    <h3>Fresh Ingredients</h3>

                    <p>
                      We use locally sourced produce and the freshest seasonal
                      ingredients.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal
                    animation="fade-up"
                    delay={200}
                    className="pillar-card"
                  >
                    <div className="pillar-icon-wrap">
                      <FontAwesomeIcon icon={faUtensils} />
                    </div>

                    <h3>Authentic Recipes</h3>

                    <p>
                      Traditional Mediterranean recipes with a modern and
                      healthy twist.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal
                    animation="fade-up"
                    delay={300}
                    className="pillar-card"
                  >
                    <div className="pillar-icon-wrap">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>

                    <h3>Made with Love</h3>

                    <p>
                      Every dish is prepared with care and passion, just for
                      you.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </article>
          </section>

          {/* PERFECT FOR ANY OCCASION */}
          <section className="perfect-occasion-section">
            <div className="occasion-top">
              <ScrollReveal animation="fade-up">
                <h2>Perfect for Any Occasion</h2>

                <div className="occasion-divider">
                  <span></span>
                  <FontAwesomeIcon icon={faPagelines} />
                  <span></span>
                </div>

                <p className="occasion-subtitle">
                  Whatever the celebration, we'll make it unforgettable.
                </p>
              </ScrollReveal>

              <div className="occasion-grid">
                <ScrollReveal animation="fade-up" delay={100}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faChampagneGlasses} />
                    </div>

                    <h3>Celebrations</h3>

                    <p>
                      Make your special moments even more memorable with great
                      food.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={150}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>

                    <h3>Corporate Events</h3>

                    <p>Impress your guests with fresh Mediterranean flavors.</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faCakeCandles} />
                    </div>

                    <h3>Private Parties</h3>

                    <p>
                      Birthdays, anniversaries, and celebrations made special.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={250}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>

                    <h3>Group Dining</h3>

                    <p>Bring everyone together around delicious food.</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>

                    <h3>Special Events</h3>

                    <p>
                      Gather, celebrate, and create lasting memories together.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={350}>
                  <div className="occasion-item">
                    <div className="occasion-icon">
                      <FontAwesomeIcon icon={faGift} />
                    </div>

                    <h3>Custom Events</h3>

                    <p>Tell us your vision and we'll help bring it to life.</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* OUR SERVICES */}
          <section className="our-services-section">
            <div className="our-services-inner">
              {/* LEFT IMAGE */}
              <ScrollReveal animation="fade-right" className="services-visual">
                <img
                  src={Images.HeroAboutUs2Image}
                  alt="Little Lemon dining experience"
                />

                <div className="services-image-overlay">
                  <span>The Little Lemon Experience</span>
                </div>
              </ScrollReveal>

              {/* RIGHT CONTENT */}
              <div className="services-content">
                <ScrollReveal animation="fade-up">
                  <div className="services-heading">
                    <span className="services-eyebrow">WHAT WE OFFER</span>

                    <h2>Our Services</h2>

                    <div className="services-title-line"></div>

                    <p>
                      From everyday dining to memorable celebrations, every
                      experience at Little Lemon is made with care, flavor, and
                      genuine hospitality.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="services-list">
                  <ScrollReveal animation="fade-up" delay={100}>
                    <div className="services-list-item">
                      <div className="services-list-icon">
                        <FontAwesomeIcon icon={faUtensils} />
                      </div>

                      <div className="services-list-text">
                        <span className="service-number">01</span>

                        <h3>Dine-In Experience</h3>

                        <p>
                          Authentic Mediterranean dining in a warm and welcoming
                          atmosphere.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal animation="fade-up" delay={200}>
                    <div className="services-list-item">
                      <div className="services-list-icon">
                        <FontAwesomeIcon icon={faBagShopping} />
                      </div>

                      <div className="services-list-text">
                        <span className="service-number">02</span>

                        <h3>Takeaway & Delivery</h3>

                        <p>
                          Freshly prepared dishes ready to enjoy wherever you
                          are.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal animation="fade-up" delay={300}>
                    <div className="services-list-item">
                      <div className="services-list-icon">
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </div>

                      <div className="services-list-text">
                        <span className="service-number">03</span>

                        <h3>Table Reservations</h3>

                        <p>
                          Reserve ahead and let us prepare a memorable dining
                          experience.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal animation="fade-up" delay={400}>
                    <div className="services-list-item">
                      <div className="services-list-icon">
                        <FontAwesomeIcon icon={faHeart} />
                      </div>

                      <div className="services-list-text">
                        <span className="service-number">04</span>

                        <h3>Private Dining</h3>

                        <p>
                          Intimate experiences for celebrations and meaningful
                          moments.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section className="gallery-showcase">
            <article className="gallery-inner">
              <ScrollReveal animation="fade-up">
                <h2>A Glimpse Inside</h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <div className="info-divider-line"></div>
              </ScrollReveal>

              <div className="gallery-tiles">
                <ScrollReveal
                  animation="zoom-in"
                  delay={0}
                  className="gallery-tile-item"
                >
                  <img
                    src={Images.interiorImage}
                    alt="Little Lemon dining area"
                  />
                </ScrollReveal>

                <ScrollReveal
                  animation="zoom-in"
                  delay={100}
                  className="gallery-tile-item"
                >
                  <img src={Images.foodImage} alt="Mediterranean dining" />
                </ScrollReveal>

                <ScrollReveal
                  animation="zoom-in"
                  delay={200}
                  className="gallery-tile-item"
                >
                  <img src={Images.diningImage} alt="Restaurant bar" />
                </ScrollReveal>

                <ScrollReveal
                  animation="zoom-in"
                  delay={300}
                  className="gallery-tile-item"
                >
                  <img src={Images.restaurantImage} alt="Restaurant interior" />
                </ScrollReveal>
              </div>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="gallery-link-wrap">
                  <Link to="/gallery" className="outline-navigation-btn">
                    View More Photos
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            </article>
          </section>

          {/* MEET THE CHEF */}
          <section className="masterchef-section">
            <article className="masterchef-grid">
              <div className="masterchef-bio">
                <ScrollReveal animation="fade-up">
                  <span className="badge-label badge-label-light">
                    <FontAwesomeIcon icon={faLeaf} />
                    Meet Our Chef
                  </span>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                  <h2>Jason Miller</h2>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="masterchef-accent-line"></div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <p>
                    With a love for nature and Mediterranean flavors, Jason
                    creates dishes that are simple, seasonal, and full of
                    character.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={400}>
                  <span className="masterchef-autograph">Jason Miller</span>
                </ScrollReveal>
              </div>

              <ScrollReveal
                animation="zoom-in"
                delay={150}
                className="masterchef-photo-frame"
              >
                <img src={Images.chef2Image} alt="Chef Jason Miller" />
              </ScrollReveal>

              <ScrollReveal
                animation="fade-left"
                delay={250}
                className="masterchef-creed"
              >
                <h3>Jason's Philosophy</h3>

                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="masterchef-quote-icon"
                />

                <p>
                  Good food starts with great ingredients and brings people
                  together.
                </p>
              </ScrollReveal>
            </article>
          </section>

          {/* TESTIMONIAL */}
          <section className="reviews-banner">
            <article className="reviews-wrapper">
              <ScrollReveal
                animation="zoom-in"
                className="reviews-quote-symbol"
              >
                <FontAwesomeIcon icon={faQuoteLeft} />
              </ScrollReveal>

              <div className="reviews-text-group">
                <ScrollReveal animation="fade-up" delay={100}>
                  <blockquote>
                    The atmosphere is cozy, the service is wonderful, and the
                    food is simply amazing.
                  </blockquote>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="reviews-rating-stars">★ ★ ★ ★ ★</div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <span>— Emily R.</span>
                </ScrollReveal>
              </div>

              <ScrollReveal
                animation="fade-left"
                delay={200}
                className="reviews-media-thumb"
              >
                <img
                  src={Images.dining2Image}
                  alt="Little Lemon signature dish"
                />
              </ScrollReveal>
            </article>
          </section>

          {/* CTA */}
          <section className="calltoaction-ribbon">
            <div className="calltoaction-veil"></div>

            <article className="calltoaction-inner">
              <div className="calltoaction-message">
                <ScrollReveal animation="fade-up">
                  <h2>
                    Create beautiful memories
                    <br />
                    over <span>great food.</span>
                  </h2>
                </ScrollReveal>
              </div>

              <ScrollReveal animation="fade-left" delay={150}>
                <Link to="/reservations" className="calltoaction-action-btn">
                  Book a Table
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
              </ScrollReveal>
            </article>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

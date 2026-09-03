import { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./Contact.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faUtensils,
  faPaperPlane,
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Fake API request
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.5;

          if (isSuccess) {
            resolve();
          } else {
            reject(new Error("Failed to send message"));
          }
        }, 1500);
      });

      setNotification({
        show: true,
        type: "success",
        title: "Message Sent!",
        message:
          "Thank you for contacting us. We've received your message and will get back to you soon.",
      });

      // Reset form setelah sukses
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setNotification({
        show: true,
        type: "error",
        title: "Something Went Wrong",
        message:
          "We couldn't send your message right now. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-page">
        <main>
          {/* =========================================
              HERO
          ========================================= */}
          <section className="contact-page-hero">
            <div className="contact-page-hero-overlay"></div>

            <div className="contact-page-hero-container">
              <div className="contact-page-hero-content">
                <ScrollReveal animation="fade-up" delay={0}>
                  <span className="contact-page-hero-eyebrow">
                    GET IN TOUCH
                  </span>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                  <h1>
                    Contact <span>Us</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="contact-page-hero-divider">
                    <span></span>
                    <FontAwesomeIcon icon={faUtensils} />
                    <span></span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={300}>
                  <p>
                    We'd love to hear from you. Whether you have a question,
                    feedback, or just want to say hello, we're here for you!
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* =========================================
              CONTACT CONTENT
          ========================================= */}
          <section className="contact-main-section">
            <div className="contact-main-container">
              {/* LEFT */}
              <div className="contact-info">
                <ScrollReveal animation="fade-up">
                  <h2>Get in Touch</h2>
                </ScrollReveal>

                {/* Address */}
                <ScrollReveal animation="fade-up" delay={100}>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <div className="contact-info-text">
                      <h3>Address</h3>
                      <p>
                        123 Lemon Tree Street
                        <br />
                        Chicago, IL 60607, USA
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Phone */}
                <ScrollReveal animation="fade-up" delay={150}>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div className="contact-info-text">
                      <h3>Phone</h3>
                      <p>(312) 555-1234</p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Email */}
                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>

                    <div className="contact-info-text">
                      <h3>Email</h3>
                      <p>hello@littlelemon.com</p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Hours */}
                <ScrollReveal animation="fade-up" delay={250}>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faClock} />
                    </div>

                    <div className="contact-info-text">
                      <h3>Opening Hours</h3>
                      <p>
                        Mon - Sun: 11:00 AM - 10:00 PM
                        <br />
                        We're open every day to serve you!
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Order */}
                <ScrollReveal animation="fade-up" delay={300}>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faUtensils} />
                    </div>

                    <div className="contact-info-text">
                      <h3>Order Online</h3>
                      <p>Enjoy our dishes from the comfort of your home.</p>

                      <Link to="/menu" className="contact-order-link">
                        Order Now
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* RIGHT FORM */}
              <div className="contact-form-wrapper">
                <ScrollReveal animation="fade-up">
                  <div className="contact-form-heading">
                    <h2>Send Us a Message</h2>
                    <p>
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-up" delay={100}>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-grid">
                      <div className="contact-form-group">
                        <label htmlFor="name">
                          Full Name <span>*</span>
                        </label>

                        <input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          required
                        />
                      </div>

                      <div className="contact-form-group">
                        <label htmlFor="email">
                          Email Address <span>*</span>
                        </label>

                        <input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          required
                        />
                      </div>

                      <div className="contact-form-group">
                        <label htmlFor="phone">Phone Number</label>

                        <input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                        />
                      </div>

                      <div className="contact-form-group">
                        <label htmlFor="subject">
                          Subject <span>*</span>
                        </label>

                        <select id="subject" required defaultValue="">
                          <option value="" disabled>
                            Select a subject
                          </option>

                          <option value="reservation">
                            Reservation Inquiry
                          </option>

                          <option value="feedback">Feedback</option>

                          <option value="event">Private Event</option>

                          <option value="general">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div className="contact-form-group contact-message-group">
                      <label htmlFor="message">
                        Message <span>*</span>
                      </label>

                      <textarea
                        id="message"
                        rows="6"
                        placeholder="Write your message here..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="contact-submit-button">
                      Send Message
                      <span>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </span>
                    </button>

                    <small>* Required fields</small>
                  </form>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* =========================================
              LOCATION
          ========================================= */}
          <section className="contact-location-section">
            <div className="contact-location-container">
              <ScrollReveal animation="fade-right">
                <div className="contact-map">
                  <div className="contact-map-grid"></div>

                  <div className="contact-map-road road-one"></div>
                  <div className="contact-map-road road-two"></div>
                  <div className="contact-map-road road-three"></div>

                  <span className="contact-map-label label-one">
                    W Washington Blvd
                  </span>

                  <span className="contact-map-label label-two">West Loop</span>

                  <span className="contact-map-label label-three">
                    Fulton Market
                  </span>

                  <div className="contact-map-pin">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>

                  <div className="contact-map-restaurant">
                    <strong>Little Lemon</strong>
                    <span>Restaurant</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left">
                <div className="contact-location-content">
                  <span className="contact-location-eyebrow">FIND US</span>

                  <h2>Visit Us</h2>

                  <div className="contact-location-line"></div>

                  <p>
                    Located in the heart of Chicago, we're just minutes away
                    from West Loop, Fulton Market, and the Riverwalk.
                  </p>

                  <button className="contact-directions-button">
                    Get Directions
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* =========================================
              NEWSLETTER
          ========================================= */}
          <section className="contact-newsletter">
            <div className="contact-newsletter-container">
              <div className="contact-newsletter-lemon">🍋</div>

              <div className="contact-newsletter-text">
                <ScrollReveal animation="fade-up">
                  <h2>Stay Connected</h2>
                  <p>
                    Subscribe to get special offers and
                    <br />
                    updates from Little Lemon.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal animation="fade-left">
                <form
                  className="contact-newsletter-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email address"
                  />

                  <button type="submit" aria-label="Subscribe">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </section>
        </main>

        {notification.show && (
          <div className="contact-notification-overlay">
            <div
              className={`contact-notification ${notification.type}`}
              role="alert"
            >
              <button
                className="contact-notification-close"
                onClick={() =>
                  setNotification((prev) => ({
                    ...prev,
                    show: false,
                  }))
                }
                aria-label="Close notification"
              >
                ×
              </button>

              <div className="contact-notification-icon">
                {notification.type === "success" ? "✓" : "!"}
              </div>

              <h2>{notification.title}</h2>

              <p>{notification.message}</p>

              <button
                className="contact-notification-button"
                onClick={() =>
                  setNotification((prev) => ({
                    ...prev,
                    show: false,
                  }))
                }
              >
                {notification.type === "success" ? "Great!" : "Try Again"}
              </button>
            </div>
          </div>
        )}

        <ScrollReveal animation="fade-up" delay={100}>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
}

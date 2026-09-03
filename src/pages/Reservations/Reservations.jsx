import { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Reservations.css";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faClock,
  faUsers,
  faGift,
  faCircleInfo,
  faChair,
  faLocationDot,
  faUtensils,
  faCheck,
  faPhone,
  faUser,
  faDoorOpen,
  faSeedling,
  faTableCellsLarge,
  faClipboardList,
  faUserAlt,
  faBuilding,
  faChevronDown,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { privateRooms, rooms, tables } from "../../mock-data/tables";
import { existingBookings } from "../../mock-data/existingBookings";

export default function Reservations() {
  const [bookingStep, setBookingStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    notes: "",
  });

  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservationType, setReservationType] = useState("table");
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const tableScrollRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    const slider = tableScrollRef.current;
    if (!slider) return;

    isDragging.current = true;
    hasDragged.current = false;

    startX.current = e.clientX;
    scrollLeft.current = slider.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const slider = tableScrollRef.current;
    if (!slider) return;

    const distance = e.clientX - startX.current;

    // Baru dianggap drag kalau mouse benar-benar digeser
    if (Math.abs(distance) > 5) {
      hasDragged.current = true;

      slider.classList.add("is-dragging");
      slider.scrollLeft = scrollLeft.current - distance;
    }
  };

  const handleMouseUp = () => {
    const slider = tableScrollRef.current;

    if (slider) {
      slider.classList.remove("is-dragging");
    }

    isDragging.current = false;

    // Reset setelah click event selesai
    setTimeout(() => {
      hasDragged.current = false;
    }, 0);
  };

  const handleMouseLeave = () => {
    const slider = tableScrollRef.current;

    if (slider) {
      slider.classList.remove("is-dragging");
    }

    isDragging.current = false;
  };

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isTimeBooked = (
    selectedDate,
    selectedTime,
    bookingDate,
    bookingTime,
    duration,
  ) => {
    if (selectedDate !== bookingDate) {
      return false;
    }

    const selectedMinutes = timeToMinutes(selectedTime);
    const bookingStart = timeToMinutes(bookingTime);
    const bookingEnd = bookingStart + duration * 60;

    // Waktu yang dipilih berada dalam durasi booking
    return selectedMinutes >= bookingStart && selectedMinutes < bookingEnd;
  };

  /* =========================================
     DYNAMIC CHAIR RENDERING
  ========================================= */

  const renderTableChairs = (seats, type, area) => {
    if (type === "round") {
      const radius = area === "lounge" ? 52 : 58;

      return Array.from({ length: seats }).map((_, index) => {
        const angle = -90 + (360 / seats) * index;
        const radian = (angle * Math.PI) / 180;

        return (
          <span
            key={`chair-${index}`}
            className="table-chair round-chair"
            style={{
              "--chair-x": `${50 + Math.cos(radian) * radius}%`,
              "--chair-y": `${50 + Math.sin(radian) * radius}%`,
              "--chair-rotation": `${angle + 90}deg`,
            }}
          />
        );
      });
    }

    const squarePositions = {
      2: [
        { x: 50, y: -14, rotation: 0 },
        { x: 50, y: 114, rotation: 0 },
      ],

      3: [
        { x: 50, y: -14, rotation: 0 },
        { x: 114, y: 50, rotation: 90 },
        { x: 50, y: 114, rotation: 0 },
      ],

      4: [
        { x: 50, y: -14, rotation: 0 },
        { x: 114, y: 50, rotation: 90 },
        { x: 50, y: 114, rotation: 0 },
        { x: -14, y: 50, rotation: 90 },
      ],

      6: [
        { x: 26, y: -14, rotation: 0 },
        { x: 74, y: -14, rotation: 0 },
        { x: 114, y: 50, rotation: 90 },
        { x: 74, y: 114, rotation: 0 },
        { x: 26, y: 114, rotation: 0 },
        { x: -14, y: 50, rotation: 90 },
      ],
    };

    return (squarePositions[seats] || squarePositions[4]).map(
      (chair, index) => (
        <span
          key={`chair-${index}`}
          className="table-chair square-chair"
          style={{
            "--chair-x": `${chair.x}%`,
            "--chair-y": `${chair.y}%`,
            "--chair-rotation": `${chair.rotation}deg`,
          }}
        />
      ),
    );
  };

  /* =========================================
     PRIVATE ROOM CHAIRS
  ========================================= */

  const renderPrivateChairs = (seats) => {
    const positions = [];

    const horizontal = seats >= 8 ? seats - 2 : seats;

    const topCount = Math.ceil(horizontal / 2);
    const bottomCount = Math.floor(horizontal / 2);

    for (let i = 0; i < topCount; i += 1) {
      positions.push({
        x: ((i + 1) / (topCount + 1)) * 100,
        y: -14,
        rotation: 0,
      });
    }

    for (let i = 0; i < bottomCount; i += 1) {
      positions.push({
        x: ((i + 1) / (bottomCount + 1)) * 100,
        y: 114,
        rotation: 0,
      });
    }

    if (seats >= 8) {
      positions.push({
        x: -9,
        y: 50,
        rotation: 90,
      });

      positions.push({
        x: 109,
        y: 50,
        rotation: 90,
      });
    }

    return positions.slice(0, seats).map((chair, index) => (
      <i
        key={`private-chair-${index}`}
        className="private-chair"
        style={{
          "--chair-x": `${chair.x}%`,
          "--chair-y": `${chair.y}%`,
          "--chair-rotation": `${chair.rotation}deg`,
        }}
      />
    ));
  };

  /* =========================================
     FILTER TABLES BY AREA
  ========================================= */

  const visibleTables = tables.filter((table) => {
    if (selectedArea === "all") return true;

    return table.area === selectedArea;
  });

  /* =========================================
   GUEST COUNT
========================================= */

  const getGuestCount = () => Number(bookingData.guests) || 0;

  /* =========================================
   CHECK TABLE BOOKING
========================================= */

  const isTableBooked = (table) => {
    if (!bookingData.date || !bookingData.time) {
      return false;
    }

    return existingBookings.some((booking) => {
      if (booking.type !== "table") return false;

      if (booking.tableId !== table.id) return false;

      if (booking.area !== table.area) return false;

      return isTimeBooked(
        bookingData.date,
        bookingData.time,
        booking.date,
        booking.time,
        booking.duration,
      );
    });
  };

  /* =========================================
   CHECK ROOM BOOKING
========================================= */

  const isRoomBooked = (room) => {
    if (!bookingData.date || !bookingData.time) {
      return false;
    }

    return existingBookings.some((booking) => {
      if (booking.type !== "area") return false;

      if (booking.roomId !== room.id) return false;

      return isTimeBooked(
        bookingData.date,
        bookingData.time,
        booking.date,
        booking.time,
        booking.duration,
      );
    });
  };

  /* =========================================
   TABLE STATUS
========================================= */

  const getTableStatus = (table) => {
    const guests = getGuestCount();

    // Table manually unavailable
    if (!table.available) {
      return "unavailable";
    }

    // Date dan time wajib untuk cek booking
    if (!bookingData.date || !bookingData.time) {
      return "locked";
    }

    // Table sudah dibooking pada waktu tersebut
    if (isTableBooked(table)) {
      return "unavailable";
    }

    // Kalau guest sudah dipilih, baru cek kapasitas
    if (guests > 0 && table.seats < guests) {
      return "unavailable";
    }

    return "available";
  };

  /* =========================================
   ROOM STATUS
========================================= */

  const getRoomStatus = (room) => {
    // Room manually unavailable
    if (!room.available) {
      return "unavailable";
    }

    // Date dan time belum dipilih
    if (!bookingData.date || !bookingData.time) {
      return "locked";
    }

    // Room sudah dibooking
    if (isRoomBooked(room)) {
      return "unavailable";
    }

    return "available";
  };

  /* =========================================
   RESET INVALID TABLE
========================================= */

  useEffect(() => {
    if (!selectedTable) return;

    const status = getTableStatus(selectedTable);

    if (status !== "available") {
      setSelectedTable(null);
    }
  }, [bookingData.date, bookingData.time, bookingData.guests, selectedTable]);

  /* =========================================
   RESET INVALID ROOM
========================================= */

  useEffect(() => {
    if (!selectedRoom) return;

    const status = getRoomStatus(selectedRoom);

    if (status !== "available") {
      setSelectedRoom(null);
    }
  }, [bookingData.date, bookingData.time, selectedRoom]);

  /* =========================================
     STEP VALIDATION
  ========================================= */

  const bookingComplete =
    bookingData.name &&
    bookingData.phone &&
    bookingData.date &&
    bookingData.time &&
    bookingData.guests;

  /* =========================================
     HANDLE BOOKING INPUT
  ========================================= */

  const handleBookingChange = (event) => {
    const { name, value } = event.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReservationTypeChange = (type) => {
    setReservationType(type);
    setSelectedTable(null);
    setSelectedRoom(null);
    setSelectedArea("all");
  };

  /* =========================================
     SELECT TABLE
  ========================================= */

  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  const handleSelectRoom = (room) => {
    if (selectedRoom?.id === room.id) {
      setSelectedRoom(null);
      return;
    }

    setSelectedRoom(room);
  };
  /* =========================================
     CONTINUE TO CONFIRMATION
  ========================================= */

  const continueToConfirmation = () => {
    if (!bookingComplete) {
      alert("Please complete all required booking details.");
      return;
    }

    if (reservationType === "table" && !selectedTable) {
      alert("Please select a table first.");
      return;
    }

    if (reservationType === "area" && !selectedRoom) {
      alert("Please select an area or room first.");
      return;
    }

    setBookingStep(3);

    window.scrollTo({
      top: document.querySelector(".reservation-steps")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     CONFIRM
  ========================================= */

  const confirmReservation = () => {
    if (!confirmed) {
      alert("Please confirm that all reservation details are correct.");
      return;
    }

    setShowSuccessModal(true);
  };

  const resetReservation = () => {
    setBookingData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      occasion: "",
      outdoor: false,
      notes: "",
    });

    setReservationType("table");
    setSelectedTable(null);
    setSelectedRoom(null);
    setSelectedArea("all");
    setConfirmed(false);

    setShowSuccessModal(false);
    setBookingStep(1);

    window.scrollTo({
      top: document.querySelector(".reservation-steps")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     AREA LABEL
  ========================================= */

  const getAreaLabel = (area) => {
    if (area === "indoor") {
      return "Main Dining Room (Indoor)";
    }

    if (area === "outdoor") {
      return "Garden Area (Outdoor)";
    }

    if (area === "private") {
      return "Private Room";
    }

    return "Lounge Area (Indoor)";
  };

  /* =========================================
     STEP ICON
  ========================================= */

  const renderStepIcon = (step) => {
    const completed =
      (step === 1 && bookingComplete) || (step === 2 && selectedTable);

    if (completed) {
      return <FontAwesomeIcon icon={faCheck} />;
    }

    return step;
  };

  return (
    <>
      <Header />

      <div className="reservation-page">
        <main>
          {/* =========================================
              HERO
          ========================================= */}

          <section className="reservation-hero">
            <div className="reservation-hero__overlay" />

            <div className="reservation-hero__content">
              <span className="reservation-hero__eyebrow">RESERVATIONS</span>

              <h1>Book Your Table</h1>

              <div className="reservation-hero__line" />

              <p>
                We can't wait to welcome you! Please fill in the details below
                to reserve your perfect table.
              </p>

              <div className="reservation-hero__features">
                <div>
                  <span>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </span>

                  <div>
                    <strong>Easy Booking</strong>
                    <small>Simple & fast reservation</small>
                  </div>
                </div>

                <div>
                  <span>
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>

                  <div>
                    <strong>Best Experience</strong>
                    <small>Carefully prepared for you</small>
                  </div>
                </div>

                <div>
                  <span>
                    <FontAwesomeIcon icon={faGift} />
                  </span>

                  <div>
                    <strong>Fresh & Delicious</strong>
                    <small>Enjoy our seasonal dishes</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              BOOKING STEPS
          ========================================= */}

          <section className="reservation-steps">
            <div className="reservation-container">
              <div className="reservation-steps__inner">
                {/* STEP 1 */}
                <div
                  className={`reservation-step ${
                    bookingStep >= 1 ? "active" : ""
                  } ${bookingComplete ? "completed" : ""}`}
                >
                  <span className="reservation-step__number">
                    {renderStepIcon(1)}
                  </span>

                  <div>
                    <strong>Details</strong>
                    <small>Fill in your booking details</small>
                  </div>
                </div>

                <div className="reservation-step__line" />

                {/* STEP 2 */}
                <div
                  className={`reservation-step ${
                    bookingStep >= 2 ? "active" : ""
                  } ${selectedTable ? "completed" : ""}`}
                >
                  <span className="reservation-step__number">
                    {renderStepIcon(2)}
                  </span>

                  <div>
                    <strong>Select Table</strong>
                    <small>Choose your preferred table</small>
                  </div>
                </div>

                <div className="reservation-step__line" />

                {/* STEP 3 */}
                <div
                  className={`reservation-step ${
                    bookingStep >= 3 ? "active" : ""
                  }`}
                >
                  <span className="reservation-step__number">3</span>

                  <div>
                    <strong>Confirmation</strong>
                    <small>Review and confirm</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              STEP 1 + STEP 2
          ========================================= */}

          {bookingStep < 3 && (
            <section className="reservation-content">
              <div className="reservation-container">
                <div className="reservation-grid">
                  {/* BOOKING DETAILS */}

                  <div className="reservation-left">
                    <div className="reservation-card booking-details-card">
                      <div className="reservation-card__heading">
                        <h2>1. Booking Details</h2>
                      </div>

                      <div className="reservation-form">
                        {/* RESERVATION TYPE */}
                        <div className="reservation-field reservation-type-field">
                          <span>
                            Reservation Type
                            <FontAwesomeIcon
                              className="reservation-info-icon"
                              icon={faCircleInfo}
                            />
                          </span>

                          <div className="reservation-type-options">
                            <button
                              type="button"
                              className={`reservation-type-option ${
                                reservationType === "table" ? "active" : ""
                              }`}
                              onClick={() =>
                                handleReservationTypeChange("table")
                              }
                            >
                              <FontAwesomeIcon icon={faChair} />
                              <div>
                                <strong>Table Booking</strong>
                                <small>Individual tables</small>
                              </div>
                            </button>

                            <button
                              type="button"
                              className={`reservation-type-option ${
                                reservationType === "area" ? "active" : ""
                              }`}
                              onClick={() =>
                                handleReservationTypeChange("area")
                              }
                            >
                              <FontAwesomeIcon icon={faBuilding} />
                              <div>
                                <strong>Reserve an Area</strong>
                                <small>Entire area/room</small>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* NAME */}
                        <label className="reservation-field">
                          <span>
                            Name <b>*</b>
                          </span>

                          <div className="reservation-input">
                            <FontAwesomeIcon
                              className="reservation-input__icon"
                              icon={faUserAlt}
                            />
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter your name"
                              value={bookingData.name}
                              onChange={handleBookingChange}
                            />
                          </div>
                        </label>

                        {/* PHONE */}
                        <label className="reservation-field">
                          <span>
                            Phone Number <b>*</b>
                          </span>

                          <div className="reservation-input">
                            <FontAwesomeIcon
                              className="reservation-input__icon"
                              icon={faPhone}
                            />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={bookingData.phone}
                              onChange={handleBookingChange}
                            />
                          </div>
                        </label>

                        <div className="reservation-date-time-row">
                          {/* DATE */}
                          <label className="reservation-field">
                            <span>
                              Date <b>*</b>
                            </span>

                            <div className="reservation-input">
                              <FontAwesomeIcon
                                className="reservation-input__icon"
                                icon={faCalendarDays}
                              />

                              <input
                                type="date"
                                name="date"
                                value={bookingData.date}
                                min={getTodayDate()}
                                onChange={handleBookingChange}
                              />
                            </div>
                          </label>

                          {/* TIME */}
                          <label className="reservation-field">
                            <span>
                              Time <b>*</b>
                            </span>

                            <div className="reservation-input">
                              <FontAwesomeIcon
                                className="reservation-input__icon"
                                icon={faClock}
                              />

                              <input
                                type="time"
                                name="time"
                                value={bookingData.time}
                                onChange={handleBookingChange}
                              />

                              <FontAwesomeIcon
                                className="reservation-input__chevron"
                                icon={faChevronDown}
                              />
                            </div>
                          </label>
                        </div>

                        {/* NUMBER OF GUESTS */}
                        <label className="reservation-field">
                          <span>
                            Number of Guests <b>*</b>
                          </span>

                          <div className="reservation-input">
                            <FontAwesomeIcon
                              className="reservation-input__icon"
                              icon={faUsers}
                            />
                            <select
                              name="guests"
                              value={bookingData.guests}
                              onChange={handleBookingChange}
                            >
                              <option value="">Select number of guests</option>
                              {Array.from(
                                { length: 30 },
                                (_, index) => index + 1,
                              ).map((guest) => (
                                <option key={guest} value={guest}>
                                  {guest} Guest{guest > 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                            <FontAwesomeIcon
                              className="reservation-input__chevron"
                              icon={faChevronDown}
                            />
                          </div>
                        </label>

                        {/* OCCASION */}
                        <label className="reservation-field">
                          <span>
                            Occasion <small>(Optional)</small>
                          </span>

                          <div className="reservation-input">
                            <FontAwesomeIcon
                              className="reservation-input__icon"
                              icon={faGift}
                            />
                            <select
                              name="occasion"
                              value={bookingData.occasion}
                              onChange={handleBookingChange}
                            >
                              <option value="">Select occasion</option>
                              <option value="Birthday">Birthday</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Business">Business Meeting</option>
                              <option value="Date Night">Date Night</option>
                              <option value="Other">Other</option>
                            </select>
                            <FontAwesomeIcon
                              className="reservation-input__chevron"
                              icon={faChevronDown}
                            />
                          </div>
                        </label>

                        {/* SPECIAL REQUESTS */}
                        <label className="reservation-field reservation-textarea-field">
                          <span>
                            Special Requests
                            <small>(Optional)</small>
                          </span>

                          <div className="reservation-textarea">
                            <FontAwesomeIcon
                              className="reservation-textarea__icon"
                              icon={faClipboardList}
                            />

                            <textarea
                              name="notes"
                              placeholder="Any special requests or additional notes?"
                              value={bookingData.notes || ""}
                              onChange={handleBookingChange}
                              rows="4"
                            />
                          </div>
                        </label>
                      </div>

                      {/* NOTE */}
                      <div className="reservation-note">
                        <div className="reservation-note__main">
                          <div className="reservation-note__icon">
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </div>

                          <div>
                            <strong>Please Note</strong>
                            <p>
                              We recommend booking in advance, especially on
                              weekends and holidays.
                            </p>
                          </div>
                        </div>

                        <div className="reservation-note__time">
                          <FontAwesomeIcon icon={faClock} />
                          <span>
                            Estimated Dining Time:
                            <br />
                            <strong> 2 hours</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =====================================
                      SELECT TABLE
                  ===================================== */}

                  <div className="reservation-table-card">
                    <div className="reservation-card__heading reservation-selection-heading">
                      <div>
                        <h2>
                          2.{" "}
                          {reservationType === "table"
                            ? "Select Your Table"
                            : "Select Your Area"}
                        </h2>
                        <p>
                          {reservationType === "table"
                            ? "Choose your preferred table from the floor plan."
                            : "Choose an entire area or private room for your event."}
                        </p>
                      </div>

                      <span
                        className={`reservation-mode-badge ${reservationType}`}
                      >
                        <FontAwesomeIcon
                          icon={
                            reservationType === "table" ? faChair : faBuilding
                          }
                        />
                        {reservationType === "table"
                          ? "Table Booking"
                          : "Reserve an Area"}
                      </span>
                    </div>

                    {reservationType === "table" && (
                      <>
                        {/* AREA TABS */}

                        <div className="reservation-area-tabs">
                          <button
                            type="button"
                            className={selectedArea === "all" ? "active" : ""}
                            onClick={() => setSelectedArea("all")}
                          >
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                            All Areas
                          </button>

                          <button
                            type="button"
                            className={
                              selectedArea === "indoor" ? "active" : ""
                            }
                            onClick={() => setSelectedArea("indoor")}
                          >
                            <FontAwesomeIcon icon={faDoorOpen} />
                            Indoor
                          </button>

                          <button
                            type="button"
                            className={
                              selectedArea === "outdoor" ? "active" : ""
                            }
                            onClick={() => setSelectedArea("outdoor")}
                          >
                            <FontAwesomeIcon icon={faSeedling} />
                            Outdoor
                          </button>

                          <button
                            type="button"
                            className={
                              selectedArea === "private" ? "active" : ""
                            }
                            onClick={() => setSelectedArea("private")}
                          >
                            <FontAwesomeIcon icon={faChair} />
                            Private Room
                          </button>
                        </div>

                        {!bookingData.guests && (
                          <div className="guest-selection-notice">
                            <FontAwesomeIcon icon={faCircleInfo} />

                            <span>
                              Select the number of guests first to unlock
                              available tables.
                            </span>
                          </div>
                        )}

                        <div
                          className="table-selection-scroll"
                          ref={tableScrollRef}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="table-selection-layout">
                            {/* MAIN FLOOR PLAN */}

                            <div className="table-map-wrapper">
                              <div className="table-map">
                                {/* GARDEN */}

                                <div className="map-room map-garden">
                                  <span>GARDEN AREA (OUTDOOR)</span>

                                  <div className="map-tree tree-1">
                                    <FontAwesomeIcon icon={faTree} />
                                  </div>

                                  <div className="map-tree tree-2">
                                    <FontAwesomeIcon icon={faTree} />
                                    <FontAwesomeIcon icon={faTree} />
                                  </div>

                                  <div className="map-plant-row plant-row-1">
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                  </div>

                                  <div className="map-plant-row plant-row-2">
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                  </div>
                                </div>

                                {/* MAIN DINING */}

                                <div className="map-room map-main-dining">
                                  <span>MAIN DINING ROOM (INDOOR)</span>

                                  <div className="map-divider divider-left" />
                                  <div className="map-divider divider-right" />

                                  <div className="map-center-decoration">
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                  </div>
                                </div>

                                {/* LOUNGE */}

                                <div className="map-room map-lounge">
                                  <span>LOUNGE AREA (INDOOR)</span>

                                  <div className="lounge-plant-row">
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCanadianMapleLeaf}
                                    />
                                  </div>
                                </div>

                                {/* WAITING */}

                                <div className="map-waiting">
                                  <FontAwesomeIcon icon={faChair} />
                                  <small>WAITING</small>
                                  <small>AREA</small>
                                </div>

                                {/* RESTROOM */}

                                <div className="map-restroom">
                                  <FontAwesomeIcon icon={faUsers} />
                                  <span>RESTROOMS</span>
                                </div>

                                {/* CASHIER */}

                                <div className="map-cashier">
                                  <span>
                                    CASHIER /
                                    <br />
                                    PAYMENT
                                  </span>

                                  <FontAwesomeIcon icon={faClipboardList} />
                                </div>

                                {/* KITCHEN */}

                                <div className="map-kitchen">
                                  <FontAwesomeIcon icon={faUtensils} />
                                  <span>KITCHEN</span>
                                </div>

                                {/* ENTRANCE */}

                                <div className="table-map__entrance">
                                  <strong>↑</strong>
                                  <span>ENTRANCE</span>
                                </div>

                                {/* TABLES */}

                                {visibleTables.map((table) => {
                                  const tableStatus = getTableStatus(table);

                                  const available = tableStatus === "available";
                                  const locked = tableStatus === "locked";

                                  return (
                                    <button
                                      key={`${table.area}-${table.id}`}
                                      type="button"
                                      disabled={!available}
                                      className={`restaurant-table ${
                                        table.type === "round"
                                          ? "round"
                                          : "square"
                                      } table-${table.area} ${
                                        selectedTable?.id === table.id &&
                                        selectedTable?.area === table.area
                                          ? "selected"
                                          : ""
                                      } ${available ? "available" : ""} ${
                                        locked ? "table-locked" : ""
                                      } ${
                                        tableStatus === "unavailable"
                                          ? "table-disabled"
                                          : ""
                                      }`}
                                      style={{
                                        left: table.x,
                                        top: table.y,
                                      }}
                                      onClick={() => {
                                        if (available) {
                                          handleSelectTable(table);
                                        }
                                      }}
                                    >
                                      <span className="table-number">
                                        {table.id}
                                      </span>

                                      {renderTableChairs(
                                        table.seats,
                                        table.type,
                                        table.area,
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* PRIVATE ROOMS */}

                            <div className="private-rooms-panel">
                              <h3>PRIVATE ROOM</h3>

                              <div className="private-rooms-list">
                                {privateRooms.map((room) => {
                                  const roomStatus = getRoomStatus(room);

                                  const available = roomStatus === "available";
                                  const locked = roomStatus === "locked";

                                  return (
                                    <button
                                      type="button"
                                      key={room.id}
                                      disabled={!available}
                                      className={`private-room-card ${
                                        selectedTable?.id === room.id
                                          ? "selected"
                                          : ""
                                      } ${available ? "available" : ""} ${
                                        locked ? "table-locked" : ""
                                      } ${
                                        roomStatus === "unavailable"
                                          ? "table-disabled"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (available) {
                                          handleSelectTable({
                                            id: room.id,
                                            area: "private",
                                            seats: room.seats,
                                            type: "private",
                                          });
                                        }
                                      }}
                                    >
                                      <div className="private-room-table">
                                        {renderPrivateChairs(room.seats)}

                                        <strong>{room.id}</strong>

                                        <span>({room.seats} Seats)</span>
                                      </div>

                                      <FontAwesomeIcon
                                        className="private-room-plant"
                                        icon={faCanadianMapleLeaf}
                                      />
                                    </button>
                                  );
                                })}
                              </div>

                              <p>
                                Private rooms are perfect for intimate
                                gatherings and special events.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* LEGEND */}

                        <div className="table-map__legend">
                          <span>
                            <i className="available" />
                            Available
                          </span>

                          <span>
                            <i className="selected" />
                            Selected
                          </span>

                          <span>
                            <i className="unavailable" />
                            Unavailable
                          </span>
                        </div>

                        {/* SELECTED TABLE */}

                        <div className="selected-table-info">
                          {selectedTable ? (
                            <>
                              <div>
                                <span>Selected Table</span>

                                <strong>
                                  Table {selectedTable.id} ·{" "}
                                  {getAreaLabel(selectedTable.area)}
                                </strong>

                                <div>
                                  <span>
                                    <FontAwesomeIcon icon={faUsers} />
                                    {selectedTable.seats} Seats
                                  </span>

                                  <span>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    {selectedTable.area}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedTable(null)}
                              >
                                Clear Selection
                              </button>
                            </>
                          ) : (
                            <div className="selected-table-empty">
                              <FontAwesomeIcon icon={faChair} />

                              <span>
                                {!bookingData.guests
                                  ? "Select number of guests first."
                                  : "Select an available table to continue your reservation."}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {reservationType === "area" && (
                      <>
                        <div className="room-selection-intro">
                          <div>
                            <span className="room-selection-kicker">
                              Entire Space Reservation
                            </span>
                            <h3>Choose the perfect space for your event</h3>
                            <p>
                              Select an entire dining area or private room based
                              on your number of guests.
                            </p>
                          </div>

                          {bookingData.guests && (
                            <div className="room-guest-indicator">
                              <FontAwesomeIcon icon={faUsers} />
                              <span>
                                {bookingData.guests} Guest
                                {Number(bookingData.guests) > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="room-selection-grid">
                          {rooms.map((room) => {
                            const roomStatus = getRoomStatus(room);
                            const available = roomStatus === "available";
                            const selected = selectedRoom?.id === room.id;

                            return (
                              <button
                                key={room.id}
                                type="button"
                                disabled={!available}
                                className={`room-selection-card ${
                                  selected ? "selected" : ""
                                } ${
                                  roomStatus === "locked" ? "room-locked" : ""
                                } ${
                                  roomStatus === "unavailable"
                                    ? "room-disabled"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (available) {
                                    setSelectedRoom(room);
                                  }
                                }}
                              >
                                <div className="room-selection-image">
                                  <img src={room.image} alt={room.name} />

                                  <span className="room-type-tag">
                                    <FontAwesomeIcon
                                      icon={
                                        room.type === "Outdoor"
                                          ? faSeedling
                                          : faBuilding
                                      }
                                    />
                                    {room.type}
                                  </span>

                                  {selected && (
                                    <span className="room-selected-check">
                                      <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                  )}

                                  {!available && (
                                    <span className="room-unavailable-overlay">
                                      Not available for your booking time
                                    </span>
                                  )}
                                </div>

                                <div className="room-selection-content">
                                  <h3>{room.name}</h3>

                                  <div className="room-capacity">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <span>Capacity: {room.capacity}</span>
                                  </div>

                                  <p>{room.description}</p>

                                  <div className="room-features">
                                    {room.features.map((feature) => (
                                      <span key={feature.label}>
                                        <FontAwesomeIcon icon={feature.icon} />
                                        {feature.label}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="room-selection-action">
                                  {selected ? (
                                    <>
                                      <FontAwesomeIcon icon={faCheck} />
                                      Selected
                                    </>
                                  ) : available ? (
                                    <>
                                      Select Room
                                      <FontAwesomeIcon icon={faArrowRight} />
                                    </>
                                  ) : roomStatus === "locked" ? (
                                    "Select Guests First"
                                  ) : (
                                    "Not Available"
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="room-help-box">
                          <div className="room-help-icon">
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </div>

                          <div>
                            <strong>Can't find the right space?</strong>
                            <p>
                              Contact our team and we'll help you find the best
                              arrangement for your event.
                            </p>
                          </div>

                          <button type="button">
                            <FontAwesomeIcon icon={faPhone} />
                            Contact Us
                          </button>
                        </div>

                        <div className="selected-room-info">
                          {selectedRoom ? (
                            <>
                              <div className="selected-room-preview">
                                <img
                                  src={selectedRoom.image}
                                  alt={selectedRoom.name}
                                />

                                <div>
                                  <span>Selected Area</span>
                                  <strong>{selectedRoom.name}</strong>

                                  <div>
                                    <span>
                                      <FontAwesomeIcon icon={faUsers} />
                                      Capacity: {selectedRoom.capacity}
                                    </span>

                                    <span>
                                      <FontAwesomeIcon
                                        icon={
                                          selectedRoom.type === "Outdoor"
                                            ? faSeedling
                                            : faDoorOpen
                                        }
                                      />
                                      {selectedRoom.type}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedRoom(null)}
                              >
                                Clear Selection
                              </button>
                            </>
                          ) : (
                            <div className="selected-table-empty">
                              <FontAwesomeIcon icon={faBuilding} />
                              <span>
                                {!bookingData.guests
                                  ? "Select number of guests first."
                                  : "Select an available area for your event."}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <button
                      type="button"
                      className="reservation-continue"
                      onClick={continueToConfirmation}
                    >
                      Continue to Confirmation
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================
              STEP 4
              CONFIRMATION
          ========================================= */}

          {bookingStep === 3 && (
            <section className="reservation-content">
              <div className="reservation-container">
                <div className="confirmation-card">
                  <div className="confirmation-heading">
                    <h2>3. Confirmation</h2>

                    <p>
                      Please review your reservation details below and confirm
                      your booking.
                    </p>
                  </div>

                  <div className="confirmation-grid">
                    {/* RESERVATION SUMMARY */}

                    <div className="confirmation-summary">
                      <h3>
                        <FontAwesomeIcon icon={faClipboardList} />
                        Reservation Summary
                      </h3>

                      <div className="summary-list">
                        <div>
                          <span>
                            <FontAwesomeIcon icon={faUser} />
                            Name
                          </span>

                          <strong>{bookingData.name || "-"}</strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faPhone} />
                            Phone Number
                          </span>

                          <strong>{bookingData.phone || "-"}</strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            Date
                          </span>

                          <strong>{bookingData.date || "-"}</strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faClock} />
                            Time
                          </span>

                          <strong>{bookingData.time || "-"}</strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faUsers} />
                            Number of Guests
                          </span>

                          <strong>{bookingData.guests || "-"} Guests</strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faGift} />
                            Occasion
                          </span>

                          <strong>
                            {bookingData.occasion || "No Preference"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={
                                reservationType === "table"
                                  ? faChair
                                  : faBuilding
                              }
                            />
                            {reservationType === "table"
                              ? "Selected Table"
                              : "Selected Area"}
                          </span>

                          <strong>
                            {reservationType === "table"
                              ? `Table ${selectedTable?.id || "-"}`
                              : selectedRoom?.name || "-"}
                            <small>
                              {reservationType === "table"
                                ? getAreaLabel(selectedTable?.area)
                                : `Capacity: ${selectedRoom?.capacity || "-"}`}
                            </small>
                          </strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faLocationDot} />
                            Reservation Type
                          </span>

                          <strong>
                            {reservationType === "table"
                              ? "Table Booking"
                              : "Entire Area Reservation"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            <FontAwesomeIcon icon={faDoorOpen} />
                            Special Requests
                          </span>

                          <strong>
                            {bookingData.notes ? bookingData.notes : "-"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* NOTE */}

                    <div className="confirmation-side">
                      <div className="confirmation-note">
                        <div className="confirmation-note__icon">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </div>

                        <div>
                          <h3>Please Note</h3>

                          <p>
                            Your table will be held for 15 minutes from the
                            reserved time.
                          </p>

                          <p>
                            If you need to make changes, please contact us as
                            soon as possible.
                          </p>
                        </div>
                      </div>

                      <div className="customer-summary">
                        <h3>
                          <FontAwesomeIcon icon={faUser} />
                          Booking Contact
                        </h3>

                        <div>
                          <span>Full Name</span>
                          <strong>{bookingData.name}</strong>
                        </div>

                        <div>
                          <span>Phone Number</span>
                          <strong>{bookingData.phone}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONFIRM CHECK */}

                  <label className="confirmation-checkbox">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(event) => setConfirmed(event.target.checked)}
                    />

                    <span className="confirmation-check-icon">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span>
                      I have reviewed and confirm that all the details above are
                      correct.
                      <small>
                        By confirming, you agree to our{" "}
                        <button type="button">Terms & Conditions</button>.
                      </small>
                    </span>
                  </label>

                  {/* ACTIONS */}

                  <div className="confirmation-actions">
                    <button
                      type="button"
                      className="reservation-back"
                      onClick={() => {
                        setBookingStep(1);
                        window.scrollTo({
                          top:
                            document.querySelector(".reservation-steps")
                              ?.offsetTop || 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back to Reservation
                    </button>

                    <button
                      type="button"
                      className="reservation-continue reservation-continue--large"
                      onClick={confirmReservation}
                    >
                      Confirm Reservation
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================
              HELP CTA
          ========================================= */}

          <section className="reservation-help">
            <div className="reservation-container">
              <div className="reservation-help__content">
                <div className="reservation-help__contact">
                  <div className="reservation-help__icon">
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>

                  <div>
                    <h3>Need Help with Your Booking?</h3>

                    <p>
                      Call us at (312) 555-1234 or email info@littlelemon.com
                    </p>
                  </div>
                </div>

                <div className="reservation-help__food" />

                <div className="reservation-help__message">
                  <span>We look forward to</span>

                  <strong>serving you!</strong>

                  <div />
                </div>
              </div>
            </div>
          </section>
        </main>

        {showSuccessModal && (
          <div className="reservation-success-overlay">
            <div className="reservation-success-modal">
              <div className="reservation-success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>

              <span className="reservation-success-label">
                RESERVATION CONFIRMED
              </span>

              <h2>Your Reservation is Complete!</h2>

              <p>
                Thank you, <strong>{bookingData.name}</strong>! Your reservation
                has been successfully submitted.
              </p>

              <div className="reservation-success-message">
                <FontAwesomeIcon icon={faCircleInfo} />

                <span>
                  A confirmation message with your reservation details will be
                  sent to your contact number shortly.
                </span>
              </div>

              <button
                type="button"
                className="reservation-success-button"
                onClick={resetReservation}
              >
                Done
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

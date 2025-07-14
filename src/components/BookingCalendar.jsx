import React, { useState, useEffect } from "react";
import { unautorizedAlert } from "../functions/myAlertFunct";

import {
  Button,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const estadoColorFondo = {
  confirmed: "#cce5ff",
  pending: "#fff3cd",
  cancelled: "#f8d7da",
};

const estadoColorBorde = {
  confirmed: "#339af0",
  pending: "#ffec99",
  cancelled: "#f03e3e",
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [showModal, setShowModal] = useState(false);

  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      unautorizedAlert();
      return;
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [accommodationsRes, bookingsRes] = await Promise.all([
            fetch(
              "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            fetch(
              "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

          const accommodationsData = await accommodationsRes.json();
          const bookingsData = await bookingsRes.json();

          setAccommodations(accommodationsData);
          setBookings(bookingsData);
        } catch (error) {
          console.error("Error al cargar datos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [token]);

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (currentView === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (currentView === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());

  const getWeekRange = (date) => {
    const day = date.getDay() === 0 ? 7 : date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
  };

  const reservaStyle = (status) => {
    const key = status.toLowerCase();
    return {
      backgroundColor: estadoColorFondo[key] || "#e2e3e5",
      border: `1.5px solid ${estadoColorBorde[key] || "#adb5bd"}`,
      borderRadius: 6,
      padding: "0 4px",
      marginBottom: 2,
      fontWeight: 600,
      color: estadoColorBorde[key] || "#495057",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "0.5rem",
      lineHeight: "1rem",
    };
  };

  const filterBooking = (b, current) => {
    const checkIn = new Date(b.check_in_date);
    const checkOut = new Date(b.check_out_date);
    const matchesAccommodation =
      selectedAccommodationId === "" ||
      String(b.accomodation_id) === selectedAccommodationId;
    const matchesStatus =
      selectedStatus === "" ||
      b.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesUser =
      searchUser.trim() === "" ||
      b.user.toLowerCase().includes(searchUser.trim().toLowerCase());

    return (
      current >= checkIn &&
      current <= checkOut &&
      matchesAccommodation &&
      matchesStatus &&
      matchesUser
    );
  };

  const renderDaysOfWeek = () => (
    <div
      className="d-grid"
      style={{
        gridTemplateColumns: "repeat(7, 1fr)",
        marginBottom: 6,
      }}
    >
      {diasSemana.map((dia) => (
        <div
          key={dia}
          className="border border-secondary p-1 text-center fw-bold bg-light"
          style={{ userSelect: "none", fontSize: "0.75rem" }}
        >
          {dia}
        </div>
      ))}
    </div>
  );

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayIndex = (firstDay.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startDayIndex; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="border border-secondary p-0"
          style={{ minHeight: 40, backgroundColor: "#f8f9fa" }}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const current = new Date(dateStr);

      const bookingsForDay = bookings.filter((b) => filterBooking(b, current));

      days.push(
        <div
          key={day}
          className="border border-secondary p-1 d-flex flex-column"
          style={{ minHeight: 40, backgroundColor: "#fff" }}
        >
          <div
            className="fw-bold mb-1"
            style={{ fontSize: "0.65rem", lineHeight: "1rem" }}
          >
            {day}
          </div>
          <div style={{ overflowY: "auto", maxHeight: 25 }}>
            {bookingsForDay.map((b, idx) => (
              <div
                key={idx}
                style={reservaStyle(b.status)}
                title={`${b.user} (${b.status})`}
              >
                {b.user} <small>({b.status})</small>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        {renderDaysOfWeek()}
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            overflow: "auto",
          }}
        >
          {days}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const { monday } = getWeekRange(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(monday);
      current.setDate(monday.getDate() + i);

      const bookingsForDay = bookings.filter((b) => filterBooking(b, current));

      days.push(
        <div
          key={i}
          className="border border-secondary p-2 d-flex flex-column"
          style={{ minWidth: 110, minHeight: 100, backgroundColor: "#fff" }}
        >
          <div className="fw-bold mb-1" style={{ fontSize: "0.75rem" }}>
            {diasSemana[i]} {current.getDate()}/{current.getMonth() + 1}
          </div>
          <div style={{ overflowY: "auto", flexGrow: 1 }}>
            {bookingsForDay.map((b, idx) => (
              <div
                key={idx}
                style={reservaStyle(b.status)}
                title={`${b.user} (${b.status})`}
              >
                {b.user} <small>({b.status})</small>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: 4,
          border: "1px solid #ddd",
          borderRadius: 4,
        }}
      >
        {days}
      </div>
    );
  };

  const renderDayView = () => {
    const day = currentDate;
    const bookingsForDay = bookings.filter((b) => filterBooking(b, day));

    return (
      <Card className="p-3" style={{ minHeight: 200 }}>
        <h5 className="mb-3" style={{ fontSize: "1rem" }}>
          {diasSemana[(day.getDay() + 6) % 7]}, {day.getDate()} de{" "}
          {meses[day.getMonth()]} de {day.getFullYear()}
        </h5>
        {bookingsForDay.length === 0 ? (
          <p className="text-muted">No hay reservaciones para este día.</p>
        ) : (
          bookingsForDay.map((b, idx) => (
            <div
              key={idx}
              className="mb-2 p-2 border rounded"
              style={{
                backgroundColor:
                  estadoColorFondo[b.status.toLowerCase()] || "#e2e3e5",
                borderColor:
                  estadoColorBorde[b.status.toLowerCase()] || "#adb5bd",
                fontSize: "0.8rem",
              }}
              title={`${b.user} - Estado: ${b.status}`}
            >
              <strong>{b.user}</strong> <small>({b.status})</small>
              <br />
              <small>
                {new Date(b.check_in_date).toLocaleDateString()} &rarr;{" "}
                {new Date(b.check_out_date).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </Card>
    );
  };

  const TitleWithNavigation = () => (
    <div
      className="d-flex align-items-center mb-3"
      style={{ userSelect: "none", gap: "10px" }}
    >
      <Button
        variant="secondary"
        onClick={goToPrevious}
        style={{ minWidth: 35 }}
      >
        &#8592;
      </Button>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          color:
            currentView === "month"
              ? "#0d6efd"
              : currentView === "week"
              ? "#ffc107"
              : "#dc3545",
        }}
      >
        {`${meses[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
      </div>
      <Button variant="secondary" onClick={goToNext} style={{ minWidth: 35 }}>
        &#8594;
      </Button>
      <Button variant="outline-secondary" onClick={goToToday} className="ms-3">
        Hoy
      </Button>
    </div>
  );

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4">Calendario de Reservas</h3>

        <Row className="align-items-center mb-3">
          <Col md={3} className="mb-2 mb-md-0">
            <Form.Select
              value={selectedAccommodationId}
              onChange={(e) => setSelectedAccommodationId(e.target.value)}
            >
              <option value="">Todos los alojamientos</option>
              {accommodations.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3} className="mb-2 mb-md-0">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="confirmed">Confirmado</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelado</option>
            </Form.Select>
          </Col>

          <Col md={3} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Buscar por nombre"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </Col>

          <Col md={3} className="text-center mb-2 mb-md-0">
            <ToggleButtonGroup
              type="radio"
              name="view"
              value={currentView}
              onChange={(val) => setCurrentView(val)}
              size="sm"
              className="gap-2"
            >
              <ToggleButton
                id="month"
                value="month"
                variant={
                  currentView === "month" ? "primary" : "outline-primary"
                }
              >
                Mes
              </ToggleButton>
              <ToggleButton
                id="week"
                value="week"
                variant={currentView === "week" ? "warning" : "outline-warning"}
              >
                Semana
              </ToggleButton>
              <ToggleButton
                id="day"
                value="day"
                variant={currentView === "day" ? "danger" : "outline-danger"}
              >
                Día
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>

        <TitleWithNavigation />

        {loading ? (
          <div className="text-center mb-3">
            <Spinner animation="border" />
          </div>
        ) : currentView === "month" ? (
          renderMonthView()
        ) : currentView === "week" ? (
          renderWeekView()
        ) : currentView === "day" ? (
          renderDayView()
        ) : (
          <div className="text-center text-muted">Vista no implementada</div>
        )}

        <div className="mt-4" style={{ fontSize: "0.9rem" }}>
          <strong>Estado: </strong>
          <span
            style={{
              backgroundColor: estadoColorFondo.confirmed,
              padding: "6px 14px",
              borderRadius: 6,
              border: `1.5px solid ${estadoColorBorde.confirmed}`,
              fontWeight: 600,
              color: estadoColorBorde.confirmed,
              marginRight: 10,
              display: "inline-block",
            }}
          >
            Confirmada
          </span>
          <span
            style={{
              backgroundColor: estadoColorFondo.pending,
              padding: "6px 14px",
              borderRadius: 6,
              border: `1.5px solid ${estadoColorBorde.pending}`,
              fontWeight: 600,
              color: estadoColorBorde.pending,
              marginRight: 10,
              display: "inline-block",
            }}
          >
            Pendiente
          </span>
          <span
            style={{
              backgroundColor: estadoColorFondo.cancelled,
              padding: "6px 14px",
              borderRadius: 6,
              border: `1.5px solid ${estadoColorBorde.cancelled}`,
              fontWeight: 600,
              color: estadoColorBorde.cancelled,
              display: "inline-block",
            }}
          >
            Cancelada
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CalendarPage;

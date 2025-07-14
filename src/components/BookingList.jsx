import { useEffect, useState } from "react";
import { patchStatusBooking } from "../services/bookingServices";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BOOKINGS_API_URL =
    "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings";
  const ACCOMMODATIONS_API_URL =
    "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations";
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Usted no está autorizado para ver esta información.");
        setLoading(false);
        return;
      }

      try {
        const [bookingsRes, accommodationsRes] = await Promise.all([
          fetch(BOOKINGS_API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          fetch(ACCOMMODATIONS_API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
        ]);

        if (!bookingsRes.ok || !accommodationsRes.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        const bookingsData = await bookingsRes.json();
        const accommodationsData = await accommodationsRes.json();

        setBookings(bookingsData);
        setAccommodations(accommodationsData);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  // Filtrar las reservaciones según alojamiento seleccionado
  const filteredBookings = selectedAccommodationId
    ? bookings.filter(
        (b) => String(b.accomodation_id) === selectedAccommodationId
      )
    : bookings; // si no hay filtro, mostrar todas

  return (
    <div className="container">
      {/* Select para elegir alojamiento */}
      <div className="mb-3">
        <label htmlFor="accommodationSelect" className="form-label">
          Filtrar por alojamiento:
        </label>
        <select
          id="accommodationSelect"
          className="form-select"
          value={selectedAccommodationId}
          onChange={(e) => setSelectedAccommodationId(e.target.value)}
        >
          <option value="">-- Todos los alojamientos --</option>
          {accommodations.map((acc) => (
            <option key={acc.id} value={String(acc.id)}>
              {acc.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando reservaciones...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && filteredBookings.length === 0 && (
        <p>No hay reservaciones para este filtro.</p>
      )}

      {!loading && !error && (
        <div className="row">
          {filteredBookings.map((b) => (
            <div key={b.id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Reserva: {b.booking}</h5>
                  <p>
                    <strong>Cliente:</strong> {b.user}
                  </p>
                  <p>
                    <strong>Alojamiento:</strong> {b.accomodation}
                  </p>
                  <p>
                    <strong>Entrada:</strong> {b.check_in_date}
                  </p>
                  <p>
                    <strong>Salida:</strong> {b.check_out_date}
                  </p>
                  <p>
                    <strong>Total:</strong> ${b.total_amount}
                  </p>
                  <p>
                    <strong>Estado:</strong> {b.status}
                  </p>
                  <button
                    className={
                      b.status == "CONFIRMED"
                        ? "btn bg-danger"
                        : "btn bg-success"
                    }
                    onClick={async () => {
                      let statusChanged =
                        b.status == "CONFIRMED" ? "CANCELLED" : "CONFIRMED";
                      await patchStatusBooking(b.id, statusChanged);
                      window.location.reload();
                    }}
                  >
                    Cambiar estado
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

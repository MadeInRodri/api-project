import { useEffect, useState } from "react";
import { BsGeoAltFill, BsInfoCircle, BsPencilFill } from "react-icons/bs";

export default function BookingList({
  setDisplayPopupEdit,
  setIdAccomodation,
}) {
  const [bookings, setBookings] = useState([]);
  const [accomodations, setAccomodations] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setError("Usted no está autorizado para ver esta información");
        setLoading(false);
        return;
      }

      try {
        const [bookingsRes, accomodationsRes] = await Promise.all([
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

        if (!bookingsRes.ok) {
          const err = await bookingsRes.json();
          throw new Error(err.message || "Error al obtener reservaciones");
        }

        if (!accomodationsRes.ok) {
          const err = await accomodationsRes.json();
          throw new Error(err.message || "Error al obtener alojamientos");
        }

        const bookingsData = await bookingsRes.json();
        const accomodationsData = await accomodationsRes.json();

        setBookings(bookingsData);
        setAccomodations(accomodationsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!bookings.length) return <p>No hay reservaciones disponibles.</p>;

  const getAccomodationDetails = (accomodationName) => {
    return accomodations.find((a) => a.name === accomodationName) || {};
  };

  return (
    <>
      {bookings.map(({ id, accomodation }) => {
        //Solo muestra lugares con una reservación
        const details = getAccomodationDetails(accomodation);

        return (
          <div key={id} className="card mb-3 shadow-sm mt-4">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title mb-2">
                  {details.name || accomodation || "Nombre no disponible"}
                </h5>
                <p className="card-text mb-1">
                  <BsGeoAltFill className="text-secondary me-2" />
                  {details.address || "Ubicación no disponible"}
                </p>
                <p className="card-text">
                  <BsInfoCircle className="text-secondary me-2" />
                  {details.description || "Descripción no disponible"}
                </p>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm text-primary p-0 bg-transparent"
                  title="Editar"
                  onClick={() => {
                    console.log("Editar reservación", id);
                    setDisplayPopupEdit("flex");
                    setIdAccomodation(details.id);
                  }}
                >
                  <BsPencilFill />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

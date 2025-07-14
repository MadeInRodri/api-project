import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import BookingList from "./BookingList";
import NewBooking from "./NewBooking";

export default function Bookings() {
  const [displayPopup, setDisplayPopup] = useState("none");
  return (
    <>
      <div className="accomodation" style={{ display: `${displayPopup}` }}>
        <NewBooking setDisplayPopup={setDisplayPopup}></NewBooking>
      </div>
      <header>
        <h2>Reservas</h2>
        <button
          onClick={() => {
            setDisplayPopup("flex");
          }}
        >
          <FaPlusCircle className="circle-plus-icon" />
          Nueva Reserva
        </button>
      </header>
      <section>
        <BookingList />
      </section>
    </>
  );
}

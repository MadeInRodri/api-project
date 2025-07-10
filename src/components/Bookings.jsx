import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import BookingList from "./BookingList";

export default function Bookings() {
  return (
    <>
      <header>
        <h2>Reservas</h2>
        <button>
          <FaPlusCircle className="circle-plus-icon" />
          Nueva Reserva
        </button>
      </header>
      <section>
        <BookingList/>
      </section>
    </>
  );
}

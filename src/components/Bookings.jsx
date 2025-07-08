import React from "react";
import { FaPlusCircle } from "react-icons/fa";

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
      <section>{/* Reservas aquí */}</section>
    </>
  );
}

import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./styles/MainScreen.css";

export default function Accomodations() {
  return (
    <>
      <header>
        <h2>Alojamientos</h2>
        <button>
          <FaPlusCircle className="circle-plus-icon" />
          Nuevo Alojamiento
        </button>
      </header>
      <section>{/* Alojamientos aquí */}</section>
    </>
  );
}

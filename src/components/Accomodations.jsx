import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./styles/MainScreen.css";
import AccomodationCard from "./AccomodationCard";
import NewAccomodation from "./NewAccomodation";
import EditAccomodation from "./EditAccomodation";

export default function Accomodations() {
  const [displayPopupNew, setDisplayPopupNew] = useState("none");
  const [displayPopupEdit, setDisplayPopupEdit] = useState("none");
  const [idAccomodation, setIdAccomodation] = useState(1);
  return (
    <>
      <div className="accomodation" style={{ display: `${displayPopupNew}` }}>
        <NewAccomodation
          setDisplayPopupNew={setDisplayPopupNew}
        ></NewAccomodation>
      </div>
      <div className="accomodation" style={{ display: `${displayPopupEdit}` }}>
        <EditAccomodation
          setDisplayPopupEdit={setDisplayPopupEdit}
          idAccomodation={idAccomodation}
        ></EditAccomodation>
      </div>
      <header>
        <h2>Alojamientos</h2>
        <button
          onClick={() => {
            setDisplayPopupNew("flex");
          }}
        >
          <FaPlusCircle className="circle-plus-icon" />
          Nuevo Alojamiento
        </button>
      </header>

      <section>
        {/* Alojamientos aquí */}
        <AccomodationCard
          setDisplayPopupEdit={setDisplayPopupEdit}
          setIdAccomodation={setIdAccomodation}
        />
      </section>
    </>
  );
}

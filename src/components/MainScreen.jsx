//Icons
import { CgMenuGridR } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

//Style
import "./styles/MainScreen.css";

export default function MainScreen() {
  return (
    <div className="main-container">
      <aside className="aside-nav">
        <header>
          <CgMenuGridR />
          <h3>Panel de control</h3>
        </header>
        <nav className="container-buttons">
          <section>
            <button className="nav-buttons">
              <FaHouse />
              Alojamientos
            </button>
            <button className="nav-buttons">
              <FaCalendar />
              Reservaciones
            </button>
          </section>
          <footer>
            <button className="exit-button">
              <RxExit />
              Cerrar Sesión
            </button>
          </footer>
        </nav>
      </aside>
      <main className="main-view">
        <header>
          <h2>Alojamientos</h2>
          <button>
            <FaPlusCircle className="circle-plus-icon" />
            Nuevo Alojamiento
          </button>
        </header>
        <section></section>
      </main>
    </div>
  );
}

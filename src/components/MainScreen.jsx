//Icons
import { CgMenuGridR } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

//Style
import "./styles/MainScreen.css";

//RouterDom
import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainScreen() {
  return (
    //Contenedor principal
    <div className="main-container">
      {/*Barra lateral*/}
      <aside className="aside-nav">
        <header>
          <CgMenuGridR />
          <h3>Panel de control</h3>
        </header>
        <nav className="container-buttons">
          <section>
            <NavLink to="accomodations">
              <button className="nav-buttons">
                <FaHouse />
                Alojamientos
              </button>
            </NavLink>
            <NavLink to="bookings">
              <button className="nav-buttons">
                <FaCalendar />
                Reservaciones
              </button>
            </NavLink>
          </section>
          <footer>
            <Link to="/">
              <button className="exit-button">
                <RxExit />
                Cerrar Sesión
              </button>
            </Link>
          </footer>
        </nav>
      </aside>
      {/* Vista principal */}
      <main className="main-view">
        {/* Aquí se renderizan las rutas */}
        <Outlet></Outlet>
      </main>
    </div>
  );
}

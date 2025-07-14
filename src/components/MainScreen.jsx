//Icons
import { CgMenuGridR } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

//Style
import "./styles/MainScreen.css";

//RouterDom
import { Link, Outlet, useNavigate } from "react-router-dom";
import { unautorizedAlert } from "../functions/myAlertFunct";

export default function MainScreen() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    if (localStorage.getItem("token")) {
      navigate(`${route}`);
    } else {
      unautorizedAlert();
      navigate("/");
    }
  };
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
            <button
              className="nav-buttons"
              onClick={() => {
                handleNavigate("accomodations");
              }}
            >
              <FaHouse />
              Alojamientos
            </button>
            <button
              className="nav-buttons"
              onClick={() => {
                handleNavigate("bookings");
              }}
            >
              <FaCalendar />
              Reservaciones
            </button>

            <button
              className="nav-buttons"
              onClick={() => {
                handleNavigate("calendar");
              }}
            >
              <FaCalendar />
              Calendario
            </button>
          </section>
          <footer>
            <Link to="/">
              <button
                className="exit-button"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <RxExit />
                Cerrar Sesión
              </button>
            </Link>
          </footer>
        </nav>
      </aside>

      {/* Vista principal */}
      <main className="main-view">
        <Outlet />
      </main>
    </div>
  );
}

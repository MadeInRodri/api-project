import MainScreen from "./components/MainScreen";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Accomodations from "./components/Accomodations";
import Bookings from "./components/Bookings";
import BookingCalendar from "./components/BookingCalendar";  // ✅ Importar el calendario

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* MainScreen engloba las vistas después de login */}
      <Route path="/home" element={<MainScreen />}>
        <Route path="accomodations" element={<Accomodations />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="calendar" element={<BookingCalendar />} />  {/* ✅ Nueva ruta */}
      </Route>
    </Routes>
  );
}

export default App;

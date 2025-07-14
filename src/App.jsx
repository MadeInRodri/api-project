import MainScreen from "./components/MainScreen";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Accomodations from "./components/Accomodations";
import Bookings from "./components/Bookings";
import BookingCalendar from "./components/BookingCalendar"; // ✅ Importar el calendario
import Welcome from "./components/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* MainScreen engloba las vistas después de login */}
      <Route path="/home" element={<MainScreen />}>
        <Route index element={<Welcome />} />
        <Route path="accomodations" element={<Accomodations />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="calendar" element={<BookingCalendar />} />{" "}
      </Route>
    </Routes>
  );
}

export default App;

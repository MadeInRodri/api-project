import MainScreen from "./components/MainScreen";

import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Accomodations from "./components/Accomodations";
import Bookings from "./components/Bookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Home redirige a las reservas y alojamientos */}
      <Route path="/home" element={<MainScreen />}>
        {/* Rutas hijas */}
        <Route path="accomodations" element={<Accomodations />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>
    </Routes>
  );
}

export default App;

import axios from "axios";
const API_URL = "https://apibookingsaccomodations-production.up.railway.app";

export const setBooking = async (myBooking) => {
  try {
    const response = await axios.post(`${API_URL}/api/V1/booking`, myBooking, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Error en setBooking", error);
  }
};

export const patchStatusBooking = async (id, myStatus) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/V1/status_booking/${id}`,
      { status: myStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error("Error en patch", error);
  }
};

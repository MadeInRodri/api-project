import axios from "axios";
const API_URL = "https://apibookingsaccomodations-production.up.railway.app";

export const getAccomodations = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/V1/accomodations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error de getAccomodation", error);
  }
};

export const getAccomodationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/V1/accomodation/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getAccomodationById", error);
  }
};

export const setAccomodation = async (myAccomodation) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/V1/accomodation`,
      myAccomodation,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error en setAccomodation", error);
  }
};

export const putAccomodation = async (myAccomodation, id) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/V1/accomodation/${id}`,
      myAccomodation,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error en putAccomodation", error);
  }
};

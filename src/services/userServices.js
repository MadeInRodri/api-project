import axios from "axios";
const API_URL = "https://apibookingsaccomodations-production.up.railway.app";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/V1/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getUser", error);
  }
};

export const getUserIdByName = async (name) => {
  const users = await getUsers();
  const myUser = users.find((user) => user.email == name);
  return myUser;
};

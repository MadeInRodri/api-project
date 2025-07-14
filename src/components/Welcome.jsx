import React, { useEffect, useState } from "react";
import { FcGlobe } from "react-icons/fc";
import { getUserIdByName } from "../services/userServices";

export default function Welcome() {
  if (!localStorage.getItem("token")) {
    return (
      <div className="welcome-div">
        <h2 className="alert">No estás autorizado, regístrate</h2>
      </div>
    );
  } else {
    const [user, setUser] = useState({});
    const getUser = async () => {
      const myUser = await getUserIdByName(localStorage.getItem("user"));
      setUser(myUser);
    };

    useEffect(() => {
      getUser();
    }, []);

    return (
      <div className="welcome-div">
        <FcGlobe className="icon-globe" />
        <h2>{`Bienvenido `}</h2>
        <h3>{user.name}</h3>
      </div>
    );
  }
}

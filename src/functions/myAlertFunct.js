import Swal from "sweetalert2";

export const unautorizedAlert = () => {
  Swal.fire({
    title: "Sin autorización",
    text: "Usted no se ha identificado, por favor inicie sesión",
    icon: "error",
  });
};

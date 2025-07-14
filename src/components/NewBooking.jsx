import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { getAccomodations } from "../services/accomodationServices";
import { useForm } from "react-hook-form";
import { getUserIdByName, getUsers } from "../services/userServices";
import { setBooking } from "../services/bookingServices";
import { unautorizedAlert } from "../functions/myAlertFunct";

export default function NewBooking({ setDisplayPopup }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const [accomodations, setAccomodations] = useState([]);

  const fetchAccomodations = async () => {
    const myAccomodations = await getAccomodations();
    setAccomodations(myAccomodations);
  };

  const onSubmit = async (data) => {
    if (!localStorage.getItem("token")) {
      unautorizedAlert();
      return;
    } else {
      try {
        data["booking"] = "BK123456";
        const user = await getUserIdByName(localStorage.getItem("user"));
        data["user_id"] = user.id;
        const response = await setBooking(data);
        reset();
        window.location.reload();
      } catch (error) {
        console.log("Error al enviar", error);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      unautorizedAlert();
      return;
    } else {
      fetchAccomodations();
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <header>
          <h3>Nueva reservación</h3>
          <button
            className="close-button"
            type="button"
            onClick={() => {
              setDisplayPopup("none");
            }}
          >
            <IoMdCloseCircleOutline className="close-icon text-danger" />
          </button>
        </header>
        <div>
          <article>
            <label>Alojamiento</label>
            <select
              {...register("accomodation_id", {
                required: {
                  value: true,
                  message: "Debe Elegir un alojamiento",
                },
              })}
            >
              {accomodations.map((myAccomodation) => {
                return (
                  <option key={myAccomodation.id} value={myAccomodation.id}>
                    {myAccomodation.name}
                  </option>
                );
              })}
            </select>
            {errors.accomodation_id?.message && (
              <span>{errors.accomodation_id.message}</span>
            )}
          </article>
          <article>
            <label>Fecha de entrada</label>
            <input
              type="date"
              {...register("check_in_date", {
                required: {
                  value: true,
                  message: "Debe asignar una fecha de entrada",
                },
                validate: (value) => {
                  const fechaEntrada = new Date(value);
                  const fechaActual = new Date();

                  if (fechaEntrada < fechaActual) {
                    return "No se permite asignar una fecha menor a la actual";
                  }
                },
              })}
            ></input>
            {errors.check_in_date?.message && (
              <span>{errors.check_in_date.message}</span>
            )}
          </article>
          <article>
            <label>Fecha de salida</label>
            <input
              type="date"
              {...register("check_out_date", {
                required: {
                  value: true,
                  message: "Debe asignar una fecha de salida",
                },
                validate: (value) => {
                  const fechaEntrada = new Date(getValues("check_in_date"));
                  const fechaSalida = new Date(value);
                  const fechaActual = new Date();

                  if (fechaSalida < fechaActual) {
                    return "No se permite asignar una fecha menor a la actual";
                  }

                  if (fechaSalida < fechaEntrada) {
                    return "La fecha de salida debe ser menor a la de la entrada";
                  }
                },
              })}
            ></input>
            {errors.check_out_date?.message && (
              <span>{errors.check_out_date.message}</span>
            )}
          </article>
          <article>
            <label>Precio</label>
            <input
              type="number"
              {...register("total_amount", {
                required: {
                  value: true,
                  message: "Debe asignar un monto total",
                },
                validate: (value) => {
                  if (value < 0) {
                    return "No se permiten montos negativos";
                  }
                },
              })}
            ></input>
            {errors.total_amount?.message && (
              <span>{errors.total_amount.message}</span>
            )}
          </article>
          <article className="form-buttons">
            <button
              className="bg-danger"
              type="button"
              onClick={() => {
                setDisplayPopup("none");
              }}
            >
              Cancelar
            </button>
            <button type="submit">Guardar Cambios</button>
          </article>
        </div>
      </form>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import {
  getAccomodationById,
  putAccomodation,
} from "../services/accomodationServices";
import { unautorizedAlert } from "../functions/myAlertFunct";

export default function EditAccomodation({
  setDisplayPopupEdit,
  idAccomodation,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [myAccomodation, setMyAccomodation] = useState({});

  useEffect(() => {
    reset();

    if (!localStorage.getItem("token")) {
      unautorizedAlert();
      return;
    } else {
      async function accomodationData() {
        const myAccomodation = await getAccomodationById(idAccomodation);
        setMyAccomodation(myAccomodation);
      }
      accomodationData();
    }
  }, [idAccomodation]);
  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (!localStorage.getItem("token")) {
            unautorizedAlert();
            return;
          } else {
            try {
              console.log(data);
              const response = await putAccomodation(data, myAccomodation.id);
              console.log(response);
              reset();
              window.location.reload();
            } catch (error) {
              console.log("Error al enviar", error);
            }
          }
        })}
      >
        <header>
          <h3>Editar alojamiento</h3>
          <button
            className="close-button"
            type="button"
            onClick={() => {
              setDisplayPopupEdit("none");
            }}
          >
            <IoMdCloseCircleOutline className="close-icon text-danger" />
          </button>
        </header>
        <div>
          <article>
            <label>Nombre</label>
            <input
              placeholder={myAccomodation.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "Debe asignar un nombre al alojamiento",
                },
              })}
            ></input>
            {errors.name?.message && <span>{errors.name.message}</span>}
          </article>
          <article>
            <label>Dirección</label>
            <input
              placeholder={myAccomodation.address}
              {...register("address", {
                required: {
                  value: true,
                  message: "Debe asignar una dirección al alojamiento",
                },
              })}
            ></input>
            {errors.address?.message && <span>{errors.address.message}</span>}
          </article>
          <article>
            <label>Descripción</label>
            <textarea
              placeholder={myAccomodation.description}
              {...register("description", {
                required: {
                  value: true,
                  message: "Debe asignar una descripción al alojamiento",
                },
              })}
            ></textarea>
            {errors.description?.message && (
              <span>{errors.description.message}</span>
            )}
          </article>
          <article className="form-buttons">
            <button
              className="bg-danger"
              type="button"
              onClick={() => {
                setDisplayPopupEdit("none");
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

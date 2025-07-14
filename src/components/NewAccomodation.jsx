import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { setAccomodation } from "../services/accomodationServices";

export default function NewAccomodation({ setDisplayPopupNew }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
            const response = await setAccomodation(data);
            reset();
            window.location.reload();
          } catch (error) {
            console.log("Error al enviar", error);
          }
        })}
      >
        <header>
          <h3>Nuevo alojamiento</h3>
          <button
            className="close-button"
            type="button"
            onClick={() => {
              setDisplayPopupNew("none");
            }}
          >
            <IoMdCloseCircleOutline className="close-icon text-danger" />
          </button>
        </header>
        <div>
          <article>
            <label>Nombre</label>
            <input
              placeholder="Nombre del alojamiento"
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
              placeholder="Dirección de alojamiento"
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
                setDisplayPopupNew("none");
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

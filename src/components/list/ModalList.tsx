import { useMovieContext } from "@/context/MovieContext";
import { useState } from "react";

const ModalList = () => {
  const { movie } = useMovieContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={toggleModal}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Ver detalles
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              Detalles de la película
            </h2>
            <p className="text-black dark:text-neutral-200">
              <strong>Título:</strong> {movie?._id.title}
            </p>
            <p className="text-black dark:text-neutral-200">
              <strong>Descripción:</strong> {movie?._id.overview || "Sin descripción"}
            </p>
            <p className="text-black dark:text-neutral-200">
              <strong>Año:</strong> {movie?._id.release_date?.split("T")[0] || "Desconocido"}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalList;
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { IoIosArrowBack } from "react-icons/io";

const MiniCardViewer = () => {
  const { movie } = useMovieContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const url = `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
    console.log("Image URL:", url); // Verifica la URL generada
    return url;
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Abre el modal al hacer clic en la imagen
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  if (movie && movie._id) {
    const imagePath = movie._id.poster_path?.startsWith("/")
      ? movie._id.poster_path
      : `/${movie._id.poster_path}`;

    return (
      <>
        {/* Imagen que abre el modal */}
        <div
          className="relative h-full aspect-3-4 overflow-hidden"
          onClick={handleImageClick}
        >
          <Image
            loader={myLoader}
            src={imagePath || "/images/default-backdrop.jpg"}
            fill
            style={{ objectFit: "cover" }}
            alt={movie._id.title || "Movie Poster"}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                {movie._id.title}
              </h2>

              <p className="text-black dark:text-neutral-200 mb-2">
                {movie._id.overview || "Sin descripción"}
              </p>
              <p className="text-black dark:text-neutral-200 mb-2">
                {movie._id.release_date?.split("T")[0] || "Desconocido"}
              </p>
              <p className="text-black dark:text-neutral-200">
                <strong>Formats:</strong>{" "}
                <span
                  className={`${
                    movie.formats.vhs
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  VHS
                </span>{" "}
                <span
                  className={`${
                    movie.formats.dvd
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  DVD
                </span>{" "}
                <span
                  className={`${
                    movie.formats.bluray
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  BLU-RAY
                </span>
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-blue-500 dark:text-yellow-500 text-4xl"
                >
                  <IoIosArrowBack></IoIosArrowBack>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <h1 className="text-neutral-900 dark:text-neutral-100">No hay película</h1>;
  }
};

export default MiniCardViewer;
"use client";
import { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import SvgVhs from "@/utils/svgs/SvgVhs";
import SvgDvd from "@/utils/svgs/SvgDvd";
import SvgBluRay from "@/utils/svgs/SvgBluRay";

const FilterFormatsButtons = () => {
  const { movieList, setMovieList } = useMovieContext();
  const [originalMovieList, setOriginalMovieList] = useState<MovieDB[]>([]); // Inicializa como un array vacío
  const [activeFilters, setActiveFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  useEffect(() => {
    if (movieList.length > 0 && originalMovieList.length === 0) {
      setOriginalMovieList(movieList);
    }
  }, [movieList]);

  // Función para filtrar películas según los filtros activos
  const filtrarPeliculas = () => {
    const listaFiltrada = originalMovieList.filter((movie) => {
      return (
        (activeFilters.vhs && movie.formats.vhs) ||
        (activeFilters.dvd && movie.formats.dvd) ||
        (activeFilters.bluray && movie.formats.bluray)
      );
    });
    setMovieList(listaFiltrada); // Actualiza la lista global con la lista filtrada
  };

  // Función para alternar el estado de un filtro
  const toggleFilter = (formato: "vhs" | "dvd" | "bluray") => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [formato]: !prevFilters[formato],
      };
      return updatedFilters;
    });
  };

  // Actualizar la lista filtrada cada vez que cambian los filtros
  useEffect(() => {
    filtrarPeliculas();
  }, [activeFilters]); // Escucha cambios en los filtros

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between bg-neutral-100 dark:bg-transparent lg:dark:bg-neutral-800 lg:rounded-lg px-4 p-3 2xl:py-4">
        <button
          className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.vhs ? "font-bold" : "opacity-20"
          }`}
          onClick={() => toggleFilter("vhs")}
        >
          <SvgVhs className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
        </button>
        <button
          className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.dvd ? "font-bold" : "opacity-20"
          }`}
          onClick={() => toggleFilter("dvd")}
        >
          <SvgDvd className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
        </button>
        <button
          className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.bluray ? "font-bold" : "opacity-20"
          }`}
          onClick={() => toggleFilter("bluray")}
        >
          <SvgBluRay className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
        </button>
      </div>
    </div>
  );
};

export default FilterFormatsButtons;

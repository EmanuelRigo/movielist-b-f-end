"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";

interface YearSearchProps {
  onSearch: (year: string) => void;
}

const YearSearch: React.FC<YearSearchProps> = ({ onSearch }) => {
  const { movieList, updateCardMovie } = useMovieContext()
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(selectedYear);

    // Filtrar las películas por el año seleccionado
    const matchedMovie = movieList.find((movie: MovieDB) =>
      new Date(movie._id.release_date).getFullYear().toString() === selectedYear
    );

    // Establecer la primera película que cumpla con el año seleccionado
    if (matchedMovie) {
      updateCardMovie(matchedMovie);
    }
  };

  // Generar un array de años únicos a partir de las fechas de lanzamiento de las películas
  const years = Array.from(new Set(movieList.map((movie: MovieDB) => new Date(movie._id.release_date).getFullYear()))).sort((a, b) => b - a);

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg  p-2 2xl:p-4">
      <form onSubmit={handleSubmit} className="flex items-center justify-between w-full">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="w-32 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-l-full outline-none"
        >
          <option value="">Todos los años</option>
          {years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex items-center justify-center w-12 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-orange-500 me-2"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default YearSearch;
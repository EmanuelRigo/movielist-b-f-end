"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "@/context/interfaces/movieTypes";


interface CustomContextProps {
  updateCardMovie: (movie: Movie) => void;
  movieList: Movie[];
  setMovieList: (movies: Movie[]) => void;
}

export const contexto = createContext<CustomContextProps | undefined>(undefined);

export const useCart = () => {
  const valorDelContexto = useContext(contexto);

  if (!valorDelContexto) {
    throw new Error("useCart debe ser usado dentro de un CustomProvider");
  }

  return valorDelContexto;
};

interface CustomProviderProps {
  children: ReactNode;
}

const CustomProvider = ({ children }: CustomProviderProps) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const updateCardMovie = (movie: Movie) => {
    setMovieList((prevMovies) => [...prevMovies, movie]);
    console.log(movie);
  };

  const valorDelContexto = { updateCardMovie, movieList, setMovieList };

  return (
    <contexto.Provider value={valorDelContexto}>{children}</contexto.Provider>
  );
};

export default CustomProvider;
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MovieDB, UserData } from "./interfaces/movieTypes";

interface MovieContextProps {
  movie: MovieDB | null;
  setMovie: React.Dispatch<React.SetStateAction<MovieDB | null>>;
  updateCardMovie: (movie: MovieDB) => void;
  movieList: MovieDB[];
  setMovieList: React.Dispatch<React.SetStateAction<MovieDB[]>>;
  userData: UserData | null; // Cambia 'any' por el tipo adecuado
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>; // Cambia 'any' por el tipo adecuado
}

export const movieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const contextValue = useContext(movieContext);
  if (!contextValue) {
    throw new Error("useMovieContext debe usarse dentro de MovieProvider");
  }
  return contextValue;
};

interface MovieProviderProps {
  children: ReactNode;
}

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movie, setMovie] = useState<MovieDB | null>(null);
  const [movieList, setMovieList] = useState<MovieDB[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null); 

  const updateCardMovie = (movie: MovieDB) => {
    setMovie(movie);
  };

  useEffect(()=>{
    setMovie(null)
  },[movieList])

  const value = {
    userData,
    setUserData,
    movie,
    setMovie,
    updateCardMovie,
    movieList,
    setMovieList,
  };

  return <movieContext.Provider value={value}>{children}</movieContext.Provider>;
};

export default MovieProvider;
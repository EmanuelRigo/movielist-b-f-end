"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { BiCameraMovie } from "react-icons/bi";
import { LuSearchX, LuSearch } from "react-icons/lu";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface AddMovieProps {
  apiKey: string;
}

export const AddMovie: React.FC<AddMovieProps> = ({ apiKey }) => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = apiKey;

  const [busqueda, setBusqueda] = useState<string>("");
  const [peliculas, setPeliculas] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Nuevo estado para controlar si se ha buscado

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
      setHasSearched(true); // Marca que se ha realizado una búsqueda
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  const myLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <div className="h-[calc(100vh-56px)] overflow-auto  md:h-screen w-screen flex items-center">
      <div className="container rounded-lg bg-neutral-300 dark:bg-neutral-950 p-4 mx-auto h-full lg:h-5/6 flex flex-col items-start lg:items-center justify-center">
        <div className="flex justify-between items-center w-full pb-6">
          {/* Barra de búsqueda */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-grow items-center bg-neutral-100 dark:bg-neutral-950 rounded-md border-2 border-neutral-400"
          >
            <input
              type="text"
              placeholder="Busca la película a agregar"
              className="flex-grow px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-950 rounded-l-full outline-none"
              value={busqueda}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 rounded-full dark:hover:text-orange-500 focus:ring-2 focus:ring-orange-700"
            >
              <LuSearch />
            </button>
          </form>

          {/* Botón de volver */}
          <Link
            className="flex items-center justify-center w-2/12 h-12 text-blue-500 dark:text-yellow-500 hover:text-blue-600 dark:hover:text-orange-500 text-3xl ps-2"
            href="/"
          >
            <IoIosArrowBack />
          </Link>
        </div>

        {/* Lista de películas */}
        <div className="relative flex-grow w-full overflow-auto scrollbar-hidden ">
          {!hasSearched ? (
            <div className="h-full flex flex-col items-center justify-center ">
              <BiCameraMovie className="text-8xl mb-4 text-blue-500 dark:text-yellow-500" />
              <p className="text-center text-lg text-neutral-700 dark:text-neutral-100">
                Busca tu película para agregarla.
              </p>
            </div>
          ) : peliculas.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center ">
                   <LuSearchX className="text-8xl mb-4 text-blue-500 dark:text-yellow-500" />
                        <p className="text-center text-neutral-900 dark:text-neutral-100 text-lg">
                No hay películas con ese nombre.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 absolute w-full p-1">
              {peliculas.map((pelicula) => (
                <Link
                  key={pelicula.id}
                  href={`/add-movie/${pelicula.id}`}
                  className="h-80 pt-0 rounded-md overflow-hidden outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer"
                >
                  <div className="h-full w-full flex relative">
                    <div className="absolute bottom-0 bg-black bg-opacity-45 w-full text-white">
                      <p>{pelicula.title}</p>
                      <p>{pelicula.release_date}</p>
                    </div>
                    {pelicula.poster_path && (
                      <Image
                        loader={myLoader}
                        src={pelicula.poster_path}
                        alt={pelicula.title}
                        width={500}
                        height={750}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

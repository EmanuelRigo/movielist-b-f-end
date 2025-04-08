"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import SearchBar from "../widgets/SearchBar";
import CardMenuMovie from "./CardMenuMovie";
import OrderListButtons from "./OrderListButtons";

import { BsPlusCircle } from "react-icons/bs";
import YearSearch from "../widgets/YearSearch";

import { logoutUser } from "../widgets/users.api";
import { useMovieContext } from "@/context/MovieContext";
import FilterFormatsButtons from "./FilterFormatsButtons";
import RandomButton from "./RandomButton";
import { getUserMovies } from "../widgets/movies.api";
import { BsListUl } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

export const FooterMainMenu = () => {
  const router = useRouter();
  const { movieList, setMovieList } = useMovieContext(); // Accede a setMovieList desde el contexto
  const [username] = useState<string | null>(null);

  // Función para cargar las películas al montar el componente
  const fetchMovies = async () => {
    try {
      const movies = await getUserMovies(); // Llama a la API para obtener las películas
      console.log("🚀 ~ fetchMovies ~ movies:", movies);
      setMovieList(movies.response.movies); // Actualiza la lista global de películas
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // Llama a fetchMovies cuando el componente se monta
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Borra todas las cookies
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
      }
      router.push("/login"); // Redirige a la página de inicio de sesión después del logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearchByYear = (year: string) => {
    console.log("Searching movies from year:", year);
  };

  return (

      <div
        className={
          "w-full flex flex-col gap-4 justify-between h-full  text-black dark:text-neutral-200 "
        }
      >
        <div className="flex justify-between bg-neutral-100 dark:bg-neutral-900 rounded-lg items-center p-2 2xl:p-4">
          <span className="text-md 2xl:text-xl ms-2">{username || "Guest"}</span> 
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center text-blue-500 dark:text-yellow-500 hover:text-blue-700 dark:hover:text-orange-700 transition-colors duration-300 text-3xl rotate-180"
            >
              <IoIosLogOut />
            </button>
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-4">
          <CardMenuMovie />
          <Link
            className="rounded-lg w-full flex justify-between items-center bg-gray-100 dark:bg-neutral-900
              dark:lg:bg-neutral-800 text-black dark:text-gray-200 p-2 2xl:p-4"
            href="/add-movie"
          >
            <span className="ms-2 2xl:ms-0 text-lg">Movies: {movieList.length}</span>
            <BsPlusCircle className="text-2xl text-black dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500" />
          </Link>

          <div className="hidden lg:block">
            <YearSearch onSearch={handleSearchByYear} />
          </div>
          <div className="hidden lg:block">
            <OrderListButtons />
          </div>
          <div className="hidden lg:block">
            <FilterFormatsButtons></FilterFormatsButtons>
          </div>
          <div className="">
            <RandomButton className="w-full lg:hidden bg-neutral-100 dark:bg-neutral-900 p-4 rounded-md flex items-center gap-2 text-black text-3xl dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400" />
          </div>
          <div className="lg:hidden text-lg bg-neutral-100 dark:bg-neutral-900 hover:text-blue-500 dark:hover:text-orange-500 p-4 rounded-md">
            <Link className="flex items-center gap-2" href="/list">
              <BsListUl className="text-3xl" /> <span>List</span>
            </Link>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>

  );
};
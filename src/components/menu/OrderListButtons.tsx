"use client";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import RandomButton from "./RandomButton";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { PiCalendarLight } from "react-icons/pi";

const OrderListButtons = () => {
  const { setMovieList, movieList} = useMovieContext();

  function ordenarPorTitulo() {
    const sortedList = [...movieList].sort((a, b) => {
      return a._id.title.localeCompare(b._id.title);
    });
    setMovieList(sortedList);
  }

  function ordenarPorFecha() {
    const sortedList = [...movieList].sort(
      (a, b) =>
        new Date(a._id.release_date).getTime() -
        new Date(b._id.release_date).getTime()
    );
    setMovieList(sortedList);
  }

  return (
    <div className="flex justify-between bg-neutral-100 dark:bg-transparent lg:dark:bg-neutral-800 rounded-lg  text-black  dark:text-neutral-200 text-3xl lg:text-xl 2xl:text-3xl p-3 2xl:p-4">
      <button
        className=" hover:text-blue-500 dark:hover:text-orange-400"
        onClick={ordenarPorFecha}
      >
        <PiCalendarLight />
      </button>
      <button
        className=" hover:text-blue-500 dark:hover:text-orange-400 "
        onClick={ordenarPorTitulo}
      >
        <RiSortAlphabetAsc />
      </button>
      <RandomButton className=" hover:text-blue-500 dark:hover:text-orange-400"></RandomButton>
    </div>
  );
};

export default OrderListButtons;

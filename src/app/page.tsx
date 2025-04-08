"use client";

import MovieList from "@/components/list/MovieList";
import { useEffect, useState } from "react";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import CardMovieViewer from "@/components/movie-viewer/CardMovieViewer";
import { useMovieContext } from "@/context/MovieContext";


console.log("procceess:::", process.argv)

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);


  const {setMovie} = useMovieContext()
  console.log("holaaa apps");

  useEffect(()=>{
    setMovie(null)
  },[])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 1023);
    };

    handleResize(); // Verifica el tamaño inicial
    window.addEventListener("resize", handleResize); // Escucha cambios de tamaño

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el listener
    };
  }, []);


  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen overflow-auto w-screen flex items-center">
      <div
        className="container h-full 1-5xl:max-h-[956px] 1-5xl:h-5/6 rounded-xl bg-neutral-300 dark:lg:bg-neutral-900 dark:bg-transparent mx-auto grid grid-cols-1 overflow-auto md-grid-template gap-4 p-4"
      >
        <div className="h-full w-full flex flex-col justify-between mb-8 lg:mb-auto">
          <FooterMainMenu />
        </div>
        {isMobile && (
          <div className="block h-full">
            <MovieList />
          </div>
        )}
        {isMobile && (
          <div className="h-full">
            <CardMovieViewer />
          </div>
        )}
      </div>
    </div>
  );
}
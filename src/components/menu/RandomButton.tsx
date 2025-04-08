import { useMovieContext } from "@/context/MovieContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiCardRandom } from "react-icons/gi";

type RandomButtonProps = {
  className?: string; // Prop opcional para estilos personalizados
};

const RandomButton = ({ className }: RandomButtonProps) => {
  const pathname = usePathname();
  const { movieList, setMovie } = useMovieContext();
  const [hasExecuted, setHasExecuted] = useState(false); // Estado para rastrear si el efecto ya se ejecutó
  const [isList, setIsList] = useState(false); // Estado para rastrear si estamos en la lista

  function obtenerObjetoAleatorio() {
    if (movieList.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * movieList.length);
      const objetoAleatorio = movieList[indiceAleatorio];

      setMovie(objetoAleatorio);
    }
  }

  useEffect(() => {
    if (pathname === "/list") {
      setIsList(true); // Cambia el estado a true si estamos en la lista
    }
  },[])

  useEffect(() => {
    if (!hasExecuted && pathname === "/" && movieList.length > 0) {
      obtenerObjetoAleatorio();
      setHasExecuted(true); // Marca que el efecto ya se ejecutó
    }
  }, [pathname, movieList, hasExecuted]); // Dependencias necesarias

  return (
    <button
      onClick={obtenerObjetoAleatorio}
      className={className} // Aplica la clase pasada como prop
    >
      <GiCardRandom />
      <span className={`text-xl lg:hidden ${isList ? "hidden" : ""}`}>Random</span>
         </button>
  );
};

export default RandomButton;